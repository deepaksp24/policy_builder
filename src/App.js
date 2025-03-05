import { useState, useEffect } from "react";
import sample from "./data/device_update.json";
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
      <h1>Extracted JSON Data</h1>
      <pre>{JSON.stringify(storedData, null, 2)}</pre>
      <Box
        component="section"
        sx={{ p: 2, border: "1px dashed grey", width: 1000, heigh: 100 }}
      >
        <PolicyForm storedData={storedData} />
      </Box>
    </div>
  );
}

export default App;
