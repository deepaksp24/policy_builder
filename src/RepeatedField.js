// import React, { useState, useEffect } from "react";
// import {
//   Box,
//   FormLabel,
//   Chip,
//   IconButton,
//   Menu,
//   MenuItem,
//   Typography,
// } from "@mui/material";
// import AddIcon from "@mui/icons-material/Add";

// const RepeatedField = ({
//   fieldLabel,
//   knownValueDescriptions,
//   fieldValues,
//   onFieldChange,
//   defaultValue = [], // Default values passed as prop
// }) => {
//   const [anchorEl, setAnchorEl] = useState(null); // For the add options menu
//   const [selectedOptions, setSelectedOptions] = useState(defaultValue); // Initialize with defaultValue

//   // Sync selectedOptions with fieldValues when defaultValue changes
//   useEffect(() => {
//     if (fieldValues[fieldLabel]) {
//       setSelectedOptions(fieldValues[fieldLabel]);
//     } else {
//       setSelectedOptions(defaultValue);
//     }
//   }, [fieldValues, fieldLabel, defaultValue]);

//   const handleAddClick = (event) => {
//     setAnchorEl(event.currentTarget); // Open the menu
//   };

//   const handleAddOption = (value) => {
//     if (!selectedOptions.includes(value)) {
//       const newSelectedOptions = [...selectedOptions, value];
//       setSelectedOptions(newSelectedOptions);
//       onFieldChange(fieldLabel, newSelectedOptions); // Update parent component
//     }
//     setAnchorEl(null); // Close the menu
//   };

//   const handleRemoveOption = (value) => {
//     const newSelectedOptions = selectedOptions.filter((v) => v !== value);
//     setSelectedOptions(newSelectedOptions);
//     onFieldChange(fieldLabel, newSelectedOptions); // Update parent component
//   };

//   return (
//     <Box>
//       <FormLabel>{fieldLabel}</FormLabel>
//       <Box display="flex" alignItems="center" flexWrap="wrap">
//         {/* Display selected options with remove button */}
//         {selectedOptions.length > 0 ? (
//           selectedOptions.map((value) => {
//             const option = knownValueDescriptions.find(
//               (item) => item.value === value
//             );
//             return (
//               <Chip
//                 key={value}
//                 label={option ? option.description : value}
//                 onDelete={() => handleRemoveOption(value)}
//                 style={{ margin: "4px" }}
//               />
//             );
//           })
//         ) : (
//           // Default placeholder when no items are selected
//           <Typography
//             variant="body2"
//             color="textSecondary"
//             style={{ margin: "4px" }}
//           >
//             Add an item
//           </Typography>
//         )}
//         {/* Add button to open the menu */}
//         <IconButton onClick={handleAddClick}>
//           <AddIcon />
//         </IconButton>
//       </Box>

//       {/* Menu for adding options */}
//       <Menu
//         anchorEl={anchorEl}
//         open={Boolean(anchorEl)}
//         onClose={() => setAnchorEl(null)}
//       >
//         {knownValueDescriptions
//           .filter((item) => !selectedOptions.includes(item.value))
//           .map((item) => (
//             <MenuItem
//               key={item.value}
//               onClick={() => handleAddOption(item.value)}
//             >
//               {item.description}
//             </MenuItem>
//           ))}
//       </Menu>
//     </Box>
//   );
// };

// export default RepeatedField;

import React, { useState, useEffect } from "react";
import PropTypes from "prop-types"; // Import prop-types
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
  knownValueDescriptions = [], // Default to an empty array
  fieldValues,
  onFieldChange,
  defaultValue = [], // Default to an empty array
}) => {
  const [anchorEl, setAnchorEl] = useState(null); // For the add options menu
  const [selectedOptions, setSelectedOptions] = useState([]);

  // Sync selectedOptions with fieldValues or defaultValue
  useEffect(() => {
    const currentValues = fieldValues[fieldLabel] || defaultValue;
    setSelectedOptions(Array.isArray(currentValues) ? currentValues : []);
  }, [fieldValues, fieldLabel, defaultValue]);

  // Handle opening the add options menu
  const handleAddClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // Handle adding a new option
  const handleAddOption = (value) => {
    if (!selectedOptions.includes(value)) {
      const newSelectedOptions = [...selectedOptions, value];
      setSelectedOptions(newSelectedOptions);
      onFieldChange(fieldLabel, newSelectedOptions); // Update parent component
    }
    setAnchorEl(null); // Close the menu
  };

  // Handle removing an option
  const handleRemoveOption = (value) => {
    const newSelectedOptions = selectedOptions.filter((v) => v !== value);
    setSelectedOptions(newSelectedOptions);
    onFieldChange(fieldLabel, newSelectedOptions); // Update parent component
  };

  // Filter out already selected options
  const availableOptions = knownValueDescriptions.filter(
    (item) => !selectedOptions.includes(item.value)
  );

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
            No items selected
          </Typography>
        )}
        {/* Add button to open the menu */}
        <IconButton
          onClick={handleAddClick}
          aria-label="Add option"
          aria-controls="add-option-menu"
          aria-haspopup="true"
        >
          <AddIcon />
        </IconButton>
      </Box>

      {/* Menu for adding options */}
      <Menu
        id="add-option-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        {availableOptions.length > 0 ? (
          availableOptions.map((item) => (
            <MenuItem
              key={item.value}
              onClick={() => handleAddOption(item.value)}
            >
              {item.description}
            </MenuItem>
          ))
        ) : (
          <MenuItem disabled>No more options available</MenuItem>
        )}
      </Menu>
    </Box>
  );
};

// Define prop types
RepeatedField.propTypes = {
  fieldLabel: PropTypes.string.isRequired,
  knownValueDescriptions: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
    })
  ),
  fieldValues: PropTypes.object.isRequired,
  onFieldChange: PropTypes.func.isRequired,
  defaultValue: PropTypes.arrayOf(PropTypes.string),
};

// Set default props
RepeatedField.defaultProps = {
  knownValueDescriptions: [],
  defaultValue: [],
};

export default React.memo(RepeatedField);
