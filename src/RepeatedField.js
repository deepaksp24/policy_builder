import React, { useState, useEffect } from "react";
import {
  Box,
  FormLabel,
  Chip,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const RepeatedField = ({
  fieldLabel,
  knownValueDescriptions,
  fieldValues,
  onFieldChange,
  defaultValue = [], // Default values passed as prop
}) => {
  const [anchorEl, setAnchorEl] = useState(null); // For the add options menu
  const [selectedOptions, setSelectedOptions] = useState(defaultValue); // Initialize with defaultValue

  // Sync selectedOptions with fieldValues when defaultValue changes
  useEffect(() => {
    if (fieldValues[fieldLabel]) {
      setSelectedOptions(fieldValues[fieldLabel]);
    } else {
      setSelectedOptions(defaultValue);
    }
  }, [fieldValues, fieldLabel, defaultValue]);

  const handleAddClick = (event) => {
    setAnchorEl(event.currentTarget); // Open the menu
  };

  const handleAddOption = (value) => {
    if (!selectedOptions.includes(value)) {
      const newSelectedOptions = [...selectedOptions, value];
      setSelectedOptions(newSelectedOptions);
      onFieldChange(fieldLabel, newSelectedOptions); // Update parent component
    }
    setAnchorEl(null); // Close the menu
  };

  const handleRemoveOption = (value) => {
    const newSelectedOptions = selectedOptions.filter((v) => v !== value);
    setSelectedOptions(newSelectedOptions);
    onFieldChange(fieldLabel, newSelectedOptions); // Update parent component
  };

  return (
    <Box>
      <FormLabel>{fieldLabel}</FormLabel>
      <Box display="flex" alignItems="center" flexWrap="wrap">
        {/* Display selected options with remove button */}
        {selectedOptions.length > 0 ? (
          selectedOptions.map((value) => {
            const option = knownValueDescriptions.find(
              (item) => item.value === value
            );
            return (
              <Chip
                key={value}
                label={option ? option.description : value}
                onDelete={() => handleRemoveOption(value)}
                style={{ margin: "4px" }}
              />
            );
          })
        ) : (
          // Default placeholder when no items are selected
          <Typography
            variant="body2"
            color="textSecondary"
            style={{ margin: "4px" }}
          >
            Add an item
          </Typography>
        )}
        {/* Add button to open the menu */}
        <IconButton onClick={handleAddClick}>
          <AddIcon />
        </IconButton>
      </Box>

      {/* Menu for adding options */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
      >
        {knownValueDescriptions
          .filter((item) => !selectedOptions.includes(item.value))
          .map((item) => (
            <MenuItem
              key={item.value}
              onClick={() => handleAddOption(item.value)}
            >
              {item.description}
            </MenuItem>
          ))}
      </Menu>
    </Box>
  );
};

export default RepeatedField;
