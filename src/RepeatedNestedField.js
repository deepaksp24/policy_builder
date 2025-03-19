import React, { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import FieldRenderer from "./FieldRenderer";

const RepeatedNestedField = ({
  fieldLabel,
  nestedFields,
  fieldValues,
  onFieldChange,
}) => {
  // Robust initial state handling
  const [fields, setFields] = useState(() => {
    const initial = fieldValues[fieldLabel];
    return Array.isArray(initial) && initial.length > 0
      ? initial
      : [{ start: {}, end: {} }];
  });

  const handleAddField = () => {
    const newFields = [...fields, { start: {}, end: {} }];
    setFields(newFields);
    onFieldChange(fieldLabel, newFields);
  };

  const handleRemoveField = (index) => {
    const newFields = fields.filter((_, i) => i !== index);
    setFields(newFields);
    onFieldChange(fieldLabel, newFields);
  };

  // Clean value (remove { undefined: "..." } wrapping)
  const sanitizeValue = (val) => {
    if (val && typeof val === "object" && "undefined" in val) {
      return val.undefined;
    }
    return val || ""; // Default to empty string if null/undefined
  };

  const handleNestedFieldChange = (index, fieldPath, value) => {
    const sanitizedValue = sanitizeValue(value);
    const updatedFields = [...fields];
    const updatedField = { ...updatedFields[index] };

    // Handle multi-level nesting by splitting the path
    const pathParts = fieldPath.split(".");
    let currentObj = updatedField;

    // Navigate to the correct nesting level
    for (let i = 0; i < pathParts.length - 1; i++) {
      const part = pathParts[i];
      if (!currentObj[part]) currentObj[part] = {};
      currentObj[part] = { ...currentObj[part] };
      currentObj = currentObj[part];
    }

    // Set the value at the final level
    currentObj[pathParts[pathParts.length - 1]] = sanitizedValue;

    updatedFields[index] = updatedField;
    setFields(updatedFields);
    onFieldChange(fieldLabel, updatedFields);
  };

  // Recursive function to render nested fields with clearer labels
  const renderNestedField = (
    field,
    parentPath = "",
    fieldValue = {},
    index
  ) => {
    if (
      field.knownValueDescriptions &&
      field.knownValueDescriptions.length > 0
    ) {
      return (
        <Box sx={{ ml: 3, mt: 1.5 }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 500, mb: 1 }}>
            {field.description || field.field}{" "}
            {/* Use description for clarity */}
          </Typography>
          <FieldRenderer
            field={field}
            fieldValues={fieldValue}
            onFieldChange={(fieldName, value) =>
              handleNestedFieldChange(
                index,
                parentPath ? `${parentPath}.${fieldName}` : fieldName,
                value
              )
            }
          />
        </Box>
      );
    }

    return (
      <Box sx={{ ml: 3, mt: 1.5 }}>
        <Typography variant="subtitle2" sx={{ fontWeight: 500, mb: 1 }}>
          {field.field === "start"
            ? "Start Time"
            : field.field === "end"
            ? "End Time"
            : field.field}
        </Typography>
        {field.nestedFields.map((subField, subIndex) => {
          const newParentPath = parentPath
            ? `${parentPath}.${field.field}`
            : field.field;
          const subFieldValue = fieldValue[field.field] || {};

          return (
            <Box key={subIndex} sx={{ ml: 3, mt: 1 }}>
              {renderNestedField(subField, newParentPath, subFieldValue, index)}
            </Box>
          );
        })}
      </Box>
    );
  };

  return (
    <Box sx={{ mb: 3 }}>
      <Typography variant="subtitle1" sx={{ fontWeight: 500, mb: 1 }}>
        {fieldLabel}
      </Typography>

      {fields.map((fieldValue, index) => (
        <Box
          key={index}
          sx={{ mb: 2, border: "1px solid #ccc", p: 2, borderRadius: 1 }}
        >
          <Typography variant="subtitle2" sx={{ fontWeight: 500, mb: 2 }}>
            Time Restriction #{index + 1}
          </Typography>
          {nestedFields.map((nestedField, nestedIndex) => (
            <Box key={nestedIndex}>
              {renderNestedField(nestedField, "", fieldValue, index)}
            </Box>
          ))}
          {fields.length > 1 && (
            <Button
              variant="outlined"
              color="error"
              onClick={() => handleRemoveField(index)}
              sx={{ mt: 2 }}
            >
              Remove
            </Button>
          )}
        </Box>
      ))}

      <Button variant="contained" onClick={handleAddField} sx={{ mt: 1 }}>
        Add {fieldLabel}
      </Button>
    </Box>
  );
};

export default RepeatedNestedField;
