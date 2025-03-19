import React from "react";
import PropTypes from "prop-types";
import { Box, Typography } from "@mui/material";
import FieldRenderer from "./FieldRenderer";

const PolicySection = ({ policy, fieldValues, onFieldChange }) => {
  return (
    <Box
      sx={{
        mb: 4,
        pb: 3,
        borderBottom: "1px solid #e0e0e0",
        backgroundColor: "#ffffff",
        p: 3,
        borderRadius: 1,
        boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
      }}
    >
      <Typography variant="h6" sx={{ mb: 2, fontWeight: 500 }}>
        {policy.policyDescription}
      </Typography>

      {policy.fieldDescriptions.length === 1 ? (
        <FieldRenderer
          field={policy.fieldDescriptions[0]}
          fieldValues={fieldValues}
          onFieldChange={onFieldChange}
        />
      ) : (
        policy.fieldDescriptions.map((field, fieldIndex) => (
          <FieldRenderer
            key={fieldIndex}
            field={field}
            fieldValues={fieldValues}
            onFieldChange={onFieldChange}
          />
        ))
      )}
    </Box>
  );
};

PolicySection.propTypes = {
  policy: PropTypes.shape({
    policyDescription: PropTypes.string.isRequired,
    fieldDescriptions: PropTypes.arrayOf(
      PropTypes.shape({
        field: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
        label: PropTypes.string,
        knownValueDescriptions: PropTypes.arrayOf(
          PropTypes.shape({
            value: PropTypes.string.isRequired,
            description: PropTypes.string.isRequired,
          })
        ),
        defaultValue: PropTypes.oneOfType([
          PropTypes.string,
          PropTypes.number,
          PropTypes.bool,
        ]),
        fieldDependencies: PropTypes.arrayOf(
          PropTypes.shape({
            sourceField: PropTypes.string.isRequired,
            sourceFieldValue: PropTypes.oneOfType([
              PropTypes.string,
              PropTypes.number,
              PropTypes.bool,
            ]).isRequired,
          })
        ),
        nestedFields: PropTypes.arrayOf(PropTypes.object),
      })
    ).isRequired,
  }).isRequired,
  fieldValues: PropTypes.object.isRequired,
  onFieldChange: PropTypes.func.isRequired,
};

export default PolicySection;