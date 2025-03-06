import React, { useState, useCallback, useMemo } from "react";
import {
  TextField,
  Select,
  MenuItem,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  InputLabel,
  Box,
  Switch,
} from "@mui/material";

const PolicyForm = ({ storedData }) => {
  // State to manage field values for dependency evaluation
  const [fieldValues, setFieldValues] = useState({});

  // Memoized handler to update field values
  const handleFieldChange = useCallback((fieldName, value) => {
    setFieldValues((prevValues) => {
      // Create a new object to trigger re-render
      const updatedValues = {
        ...prevValues,
        [fieldName]: value,
      };
      return updatedValues;
    });
  }, []);

  // Function to evaluate field dependencies
  const evaluateDependencies = useCallback(
    (fieldDependencies, currentFieldValues) => {
      if (!fieldDependencies || fieldDependencies.length === 0) return true;

      return fieldDependencies.some((dependency) => {
        const fieldValue = currentFieldValues[dependency.sourceField];
        return fieldValue === dependency.sourceFieldValue;
      });
    },
    []
  );

  // Recursive component to render fields and nested fields
  const FieldRenderer = React.memo(({ field, fieldValues, onFieldChange }) => {
    // Check if `field` is defined and has the required properties
    if (!field || !field.type) {
      console.error("Invalid field data:", field);
      return null;
    }

    const {
      type,
      knownValueDescriptions = [],
      defaultValue,
      field: fieldLabel,
      fieldDependencies = [],
      nestedFields = [],
    } = field;

    // Memoized dependency evaluation
    const isActive = useMemo(
      () => evaluateDependencies(fieldDependencies, fieldValues),
      [fieldDependencies, fieldValues]
    );

    // If the field is not active, return null
    if (!isActive) return null;

    // If there are nested fields, recursively render them
    if (nestedFields && nestedFields.length > 0) {
      return (
        <Box>
          <FormLabel>{fieldLabel}</FormLabel>
          {nestedFields.map((nestedField, index) => (
            <Box key={index} style={{ marginLeft: "20px", marginTop: "10px" }}>
              <FieldRenderer
                field={nestedField}
                fieldValues={fieldValues}
                onFieldChange={onFieldChange}
              />
            </Box>
          ))}
        </Box>
      );
    }

    // Render fields based on their type
    switch (type) {
      case "TYPE_ENUM":
        return (
          <FormControl fullWidth style={{ marginBottom: "10px" }}>
            <InputLabel>{fieldLabel}</InputLabel>
            <Select
              value={fieldValues[fieldLabel] ?? defaultValue}
              onChange={(e) => onFieldChange(fieldLabel, e.target.value)}
            >
              {knownValueDescriptions.map((item, index) => (
                <MenuItem key={index} value={item.value}>
                  {item.description}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        );

        case "TYPE_BOOL":
          if (!knownValueDescriptions[0]?.description) {
            return (
              <FormControl component="fieldset" style={{ marginBottom: "10px" }}>
                <FormLabel>{fieldLabel}</FormLabel>
                <FormControlLabel
                  control={
                    <Switch
                      checked={
                        fieldValues[fieldLabel] === "true" ||
                        fieldValues[fieldLabel] === true
                      }
                      onChange={(e) =>
                        onFieldChange(fieldLabel, e.target.checked.toString())
                      }
                      color="primary"
                    />
                  }
                  label={
                    knownValueDescriptions.length > 0
                      ? knownValueDescriptions[0].description
                      : fieldLabel
                  }
                />
              </FormControl>
            );
          } else {
            return (
              <FormControl component="fieldset" style={{ marginBottom: "10px" }}>
                <FormLabel>{fieldLabel}</FormLabel>
                <RadioGroup
                  row
                  value={fieldValues[fieldLabel] ?? defaultValue.toString()}
                  onChange={(e) => onFieldChange(fieldLabel, e.target.value)}
                >
                  {knownValueDescriptions.map((item, index) => (
                    <FormControlLabel
                      key={index}
                      value={item.value}
                      control={<Radio />}
                      label={item.description}
                    />
                  ))}
                </RadioGroup>
              </FormControl>
            );
          }

      case "TYPE_INT64":
        return (
          <TextField
            label={fieldLabel}
            type="number"
            fullWidth
            value={fieldValues[fieldLabel] ?? defaultValue}
            style={{ marginBottom: "10px" }}
            onChange={(e) => onFieldChange(fieldLabel, e.target.value)}
          />
        );

      case "TYPE_STRING":
        return (
          <TextField
            label={fieldLabel}
            type="text"
            fullWidth
            value={fieldValues[fieldLabel] ?? defaultValue}
            style={{ marginBottom: "10px" }}
            onChange={(e) => onFieldChange(fieldLabel, e.target.value)}
          />
        );

      default:
        return null;
    }
  });

  return (
    <div style={{ padding: "20px" }}>
      {storedData.map((policy, policyIndex) => (
        <div
          key={policyIndex}
          style={{
            marginBottom: "30px",
            borderBottom: "1px solid #ddd",
            paddingBottom: "20px",
          }}
        >
          <h3>{policy.policyDescription}</h3>

          {policy.fieldDescriptions.length === 1 ? (
            <FieldRenderer
              field={policy.fieldDescriptions[0]}
              fieldValues={fieldValues}
              onFieldChange={handleFieldChange}
            />
          ) : (
            policy.fieldDescriptions.map((field, fieldIndex) => (
              <FieldRenderer
                key={fieldIndex}
                field={field}
                fieldValues={fieldValues}
                onFieldChange={handleFieldChange}
              />
            ))
          )}
        </div>
      ))}
    </div>
  );
};

export default PolicyForm;


