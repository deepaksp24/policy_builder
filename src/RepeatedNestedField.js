import React, { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import FieldRenderer from "./FieldRenderer";

const RepeatedNestedField = ({
  fieldLabel,
  nestedFields,
  fieldValues,
  onFieldChange,
}) => {
  // Initialize state as an array of objects, one for each set of nested fields
  const [fields, setFields] = useState([{}]);

  // Handle adding a new set of nested fields
  const handleAddField = () => {
    setFields([...fields, {}]); // Add a new empty object for the new set
  };

  // Handle removing a set of nested fields
  const handleRemoveField = (index) => {
    const newFields = fields.filter((_, i) => i !== index);
    setFields(newFields);
  };

  // Handle changes in nested fields for a specific set
  const handleNestedFieldChange = (index, fieldName, value) => {
    const updatedFields = [...fields];
    updatedFields[index] = {
      ...updatedFields[index],
      [fieldName]: value,
    };
    setFields(updatedFields);

    // Propagate the change to the parent component if needed
    onFieldChange(fieldLabel, updatedFields);
  };

  return (
    <Box sx={{ mb: 3 }}>
      <Typography variant="subtitle1" sx={{ fontWeight: 500, mb: 1 }}>
        {fieldLabel}
      </Typography>
      {fields.map((fieldValues, index) => (
        <Box key={index} sx={{ mb: 2, border: "1px solid #ccc", p: 2 }}>
          {nestedFields.map((nestedField, nestedIndex) => (
            <Box key={nestedIndex} sx={{ ml: 3, mt: 1.5 }}>
              <FieldRenderer
                field={nestedField}
                fieldValues={fieldValues} // Pass the specific set of values
                onFieldChange={(fieldName, value) =>
                  handleNestedFieldChange(index, fieldName, value)
                }
              />
            </Box>
          ))}
          <Button
            variant="outlined"
            color="error"
            onClick={() => handleRemoveField(index)}
            sx={{ mt: 1 }}
          >
            Remove
          </Button>
        </Box>
      ))}
      <Button variant="contained" onClick={handleAddField} sx={{ mt: 1 }}>
        Add {fieldLabel}
      </Button>
    </Box>
  );
};

export default RepeatedNestedField;
