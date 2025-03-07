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
  Typography,
} from "@mui/material";
import RepeatedField from "./RepeatedField"

const PolicyForm = ({ storedData }) => {
  const [fieldValues, setFieldValues] = useState({});

  const handleFieldChange = useCallback((fieldName, value) => {
    setFieldValues((prevValues) => ({
      ...prevValues,
      [fieldName]: value,
    }));
  }, []);

  const evaluateDependencies = useCallback(
    (fieldDependencies, currentFieldValues) => {
      if (!fieldDependencies || fieldDependencies.length === 0) return true;

      return fieldDependencies.every((dependency) => {
        const fieldValue = currentFieldValues[dependency.sourceField];
        const expectedValue = dependency.sourceFieldValue;
        return String(fieldValue) === String(expectedValue);
      });
    },
    []
  );

  const FieldRenderer = React.memo(({ field, fieldValues, onFieldChange }) => {
    const {
      type,
      label,
      knownValueDescriptions = [],
      defaultValue,
      field: fieldLabel,
      fieldDependencies = [],
      nestedFields = [],
    } = field;

    // Calculate isActive unconditionally
    const isActive = useMemo(
      () => evaluateDependencies(fieldDependencies, fieldValues),
      [fieldDependencies, fieldValues]
    );

    if (!isActive) {
      return null; // Hide the field if dependencies are not met
    }

    if (nestedFields && nestedFields.length > 0) {
      return (
        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 500, mb: 1 }}>
            {fieldLabel}
          </Typography>
          {nestedFields.map((nestedField, index) => (
            <Box key={index} sx={{ ml: 3, mt: 1.5 }}>
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

    switch (type) {
      case "TYPE_ENUM":
        if (label === "LABEL_REPEATED") {
          return (
            <RepeatedField
              fieldLabel={fieldLabel}
              knownValueDescriptions={knownValueDescriptions}
              fieldValues={fieldValues}
              onFieldChange={onFieldChange}
              defaultValue={defaultValue}
            />
          );
        } else{
        return (
          <FormControl 
            fullWidth 
            sx={{ 
              mb: 2.5,
              mt: 2.5, // Added top margin to create space for the label
              position: "relative",
              "& .MuiOutlinedInput-root": {
                borderRadius: 1,
              },
              "& .MuiInputLabel-root": {
                fontSize: "0.9rem",
                color: "rgba(0, 0, 0, 0.6)",
                transform: "translate(14px, 14px) scale(1)",
                backgroundColor: "white",
                padding: "0 4px",
              },
              "& .MuiInputLabel-shrink": {
                transform: "translate(14px, -6px) scale(0.75)",
              }
            }}
          >
            {/* Custom label rendering for all dropdown fields */}
            <Typography
              component="span"
              sx={{
                position: "absolute",
                top: "-20px",
                left: "0px",
                fontSize: "0.75rem",
                color: "rgba(0, 0, 0, 0.6)",
              }}
            >
              {fieldLabel}
            </Typography>
            
            {/* Hide the standard label since we're using custom label */}
            <InputLabel 
              id={`${fieldLabel}-label`}
              sx={{ 
                display: "none" 
              }}
            >
              {fieldLabel}
            </InputLabel>
            
            <Select
              labelId={`${fieldLabel}-label`}
              value={fieldValues[fieldLabel] ?? defaultValue}
              onChange={(e) => onFieldChange(fieldLabel, e.target.value)}
              label=""
              sx={{ 
                height: "48px",
                ".MuiSelect-select": {
                  pt: 1.5,
                  pb: 1.5,
                  pl: 2,
                }
              }}
            >
              {knownValueDescriptions.map((item, index) => (
                <MenuItem key={index} value={item.value}>
                  {item.description}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        );}

      case "TYPE_BOOL":
        if (!knownValueDescriptions[0]?.description) {
          return (
            <FormControl 
              component="fieldset" 
              sx={{ 
                mb: 2.5,
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between"
              }}
            >
              <FormLabel 
                sx={{ 
                  fontSize: "0.9rem",
                  color: "rgba(0, 0, 0, 0.87)",
                  "&.Mui-focused": {
                    color: "rgba(0, 0, 0, 0.87)"
                  }
                }}
              >
                {fieldLabel}
              </FormLabel>
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
                    color="success"
                    sx={{
                      ".MuiSwitch-track": {
                        backgroundColor: "#ccc"
                      },
                      "&.Mui-checked": {
                        "& + .MuiSwitch-track": {
                          backgroundColor: "#4caf50 !important"
                        },
                        "& .MuiSwitch-thumb": {
                          backgroundColor: "#2e7d32"
                        }
                      }
                    }}
                  />
                }
                label={
                  knownValueDescriptions.length > 0
                    ? knownValueDescriptions[0].description
                    : ""
                }
                labelPlacement="start"
                sx={{
                  m: 0,
                  "& .MuiFormControlLabel-label": {
                    fontSize: "0.9rem",
                  }
                }}
              />
            </FormControl>
          );
        } else {
          return (
            <FormControl 
              component="fieldset" 
              sx={{ 
                mb: 2.5,
                display: "block"
              }}
            >
              <FormLabel 
                sx={{ 
                  fontSize: "0.9rem",
                  color: "rgba(0, 0, 0, 0.87)",
                  mb: 1,
                  "&.Mui-focused": {
                    color: "rgba(0, 0, 0, 0.87)"
                  }
                }}
              >
                {fieldLabel}
              </FormLabel>
              <RadioGroup
                row
                value={fieldValues[fieldLabel] ?? defaultValue?.toString()}
                onChange={(e) => onFieldChange(fieldLabel, e.target.value)}
                sx={{
                  ".MuiFormControlLabel-root": {
                    marginRight: 4
                  }
                }}
              >
                {knownValueDescriptions.map((item, index) => (
                  <FormControlLabel
                    key={index}
                    value={item.value}
                    control={
                      <Radio 
                        sx={{
                          color: "rgba(0, 0, 0, 0.54)",
                          "&.Mui-checked": {
                            color: "#4caf50"
                          }
                        }}
                      />
                    }
                    label={item.description}
                    sx={{
                      "& .MuiFormControlLabel-label": {
                        fontSize: "0.9rem"
                      }
                    }}
                  />
                ))}
              </RadioGroup>
            </FormControl>
          );
        }

      case "TYPE_INT64":
      case "TYPE_INT32":
        return (
          <TextField
            label=""
            type="number"
            fullWidth
            value={fieldValues[fieldLabel] ?? defaultValue}
            onChange={(e) => onFieldChange(fieldLabel, e.target.value)}
            variant="outlined"
            sx={{
              mb: 2.5,
              mt: 2.5, // Added top margin for spacing
              position: "relative",
              "& .MuiOutlinedInput-root": {
                height: "48px",
                borderRadius: 1,
              },
              "& .MuiInputLabel-root": {
                display: "none",
              }
            }}
            InputLabelProps={{
              shrink: true,
            }}
            InputProps={{
              // Custom label for text fields
              startAdornment: (
                <Typography
                  component="span"
                  sx={{
                    position: "absolute",
                    top: "-20px",
                    left: "0px",
                    fontSize: "0.75rem",
                    color: "rgba(0, 0, 0, 0.6)",
                  }}
                >
                  {fieldLabel}
                </Typography>
              ),
            }}
          />
        );

      case "TYPE_STRING":
        return (
          <TextField
            label=""
            type="text"
            fullWidth
            value={fieldValues[fieldLabel] ?? defaultValue}
            onChange={(e) => onFieldChange(fieldLabel, e.target.value)}
            variant="outlined"
            sx={{
              mb: 2.5,
              mt: 2.5, // Added top margin for spacing
              position: "relative",
              "& .MuiOutlinedInput-root": {
                height: "48px",
                borderRadius: 1,
              },
              "& .MuiInputLabel-root": {
                display: "none",
              }
            }}
            InputLabelProps={{
              shrink: true,
            }}
            InputProps={{
              // Custom label for text fields
              startAdornment: (
                <Typography
                  component="span"
                  sx={{
                    position: "absolute",
                    top: "-20px",
                    left: "0px",
                    fontSize: "0.75rem",
                    color: "rgba(0, 0, 0, 0.6)",
                  }}
                >
                  {fieldLabel}
                </Typography>
              ),
            }}
          />
        );

      case "TYPE_MESSAGE":
        if (!nestedFields || nestedFields.length === 0) {
          return (
            <TextField
              label=""
              type="text"
              fullWidth
              multiline
              minRows={3}
              value={fieldValues[fieldLabel] ?? defaultValue}
              onChange={(e) => onFieldChange(fieldLabel, e.target.value)}
              variant="outlined"
              sx={{
                mb: 2.5,
                mt: 2.5, // Added top margin for spacing
                position: "relative",
                "& .MuiOutlinedInput-root": {
                  borderRadius: 1,
                },
                "& .MuiInputLabel-root": {
                  display: "none",
                }
              }}
              InputLabelProps={{
                shrink: true,
              }}
              InputProps={{
                // Custom label for multiline text fields
                startAdornment: (
                  <Typography
                    component="span"
                    sx={{
                      position: "absolute",
                      top: "-20px",
                      left: "0px",
                      fontSize: "0.75rem",
                      color: "rgba(0, 0, 0, 0.6)",
                    }}
                  >
                    {fieldLabel}
                  </Typography>
                ),
              }}
            />
          );
        } else {
          return (
            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 500, mb: 1 }}>
                {fieldLabel}
              </Typography>
              {nestedFields.map((nestedField, index) => (
                <Box key={index} sx={{ ml: 3, mt: 1.5 }}>
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

      default:
        return null;
    }
  });

  return (
    <Box sx={{ p: 2.5, backgroundColor: "#f5f5f5" }}>
      {storedData.map((policy, policyIndex) => (
        <Box
          key={policyIndex}
          sx={{
            mb: 4,
            pb: 3,
            borderBottom: "1px solid #e0e0e0",
            backgroundColor: "#ffffff",
            p: 3,
            borderRadius: 1,
            boxShadow: "0 1px 3px rgba(0,0,0,0.08)"
          }}
        >
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 500 }}>
            {policy.policyDescription}
          </Typography>

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
        </Box>
      ))}
    </Box>
  );
};

export default PolicyForm;
