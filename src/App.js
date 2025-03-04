import { useState, useEffect } from "react";
import sample from "./data/enroll.json";
import { extractFieldData } from "./extractFieldData";

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
      
    </div>
  );
}

export default App;
