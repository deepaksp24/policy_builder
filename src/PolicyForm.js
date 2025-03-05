import React from "react";
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
} from "@mui/material";

const PolicyForm = ({ storedData }) => {
  // Recursive component to render fields and nested fields
  const FieldRenderer = ({ field }) => {
    // Check if `field` is defined and has the required properties
    if (!field || !field.type) {
      console.error("Invalid field data:", field);
      return null; // Return null or a fallback UI if the field is invalid
    }

    const {
      type,
      knownValueDescriptions = [],
      defaultValue,
      field: fieldLabel,
      description,
      nestedFields = [],
    } = field;

    // If there are nested fields, recursively render them
    if (nestedFields && nestedFields.length > 0) {
      return (
        <Box>
          <FormLabel>{fieldLabel}</FormLabel>
          {nestedFields.map((nestedField, index) => (
            <Box key={index} style={{ marginLeft: "20px", marginTop: "10px" }}>
              <FieldRenderer field={nestedField} />
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
            <Select defaultValue={defaultValue}>
              {knownValueDescriptions.map((item, index) => (
                <MenuItem key={index} value={item.value}>
                  {item.description}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        );

      case "TYPE_BOOL":
        return (
          <FormControl component="fieldset" style={{ marginBottom: "10px" }}>
            <FormLabel>{fieldLabel}</FormLabel>
            <RadioGroup row defaultValue={defaultValue.toString()}>
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

      case "TYPE_INT64":
        return (
          <TextField
            label={fieldLabel}
            type="number"
            fullWidth
            defaultValue={defaultValue}
            style={{ marginBottom: "10px" }}
          />
        );

      case "TYPE_STRING":
        return (
          <TextField
            label={fieldLabel}
            type="text"
            fullWidth
            defaultValue={defaultValue}
            style={{ marginBottom: "10px" }}
          />
        );

      default:
        return null;
    }
  };

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
            <FieldRenderer field={policy.fieldDescriptions[0]} />
          ) : (
            policy.fieldDescriptions.map((field, fieldIndex) => (
              <FieldRenderer key={fieldIndex} field={field} />
            ))
          )}
        </div>
      ))}
    </div>
  );
};

export default PolicyForm;


