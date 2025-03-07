import { useState, useEffect } from "react";
import sample from "./data/user_device_reporting.json";
import { extractFieldData } from "./extractFieldData";
import PolicyForm from "./PolicyForm";
import Box from "@mui/material/Box";

function App() {
  const [storedData, setStoredData] = useState([]); // Store extracted data for all policies

  useEffect(() => {
    const extractedData = sample.map((policy) => extractFieldData(policy)); // Process each policy
    setStoredData(extractedData); // Store the result in state
  }, []);

  return (
    <div>
      {/* <pre>{JSON.stringify(storedData, null, 2)}</pre> */}
      <Box
        component="section"
        sx={{ p: 2,  width: 700, heigh: 100 }}
      >
        <PolicyForm storedData={storedData} />
      </Box>
    </div>
  );
}

export default App;
