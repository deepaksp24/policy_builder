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
} from "@mui/material";

const PolicyForm = ({ storedData }) => {
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

const FieldRenderer = ({ field }) => {
  const {
    type,
    knownValueDescriptions = [],
    defaultValue,
    field: fieldLabel,
  } = field;

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

export default PolicyForm;
