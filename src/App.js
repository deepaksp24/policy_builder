import { useState, useEffect } from "react";
import sample from "./data/sample.json";
import { extractFieldData } from "./extractFieldData";

function App() {
  const [storedData, setStoredData] = useState([]);

  useEffect(() => {
    const jsonFile = sample[0]; // Get the first JSON object
    const extractedData = extractFieldData(jsonFile); // ✅ Use the utility function
    setStoredData(extractedData);
  }, []);

  return (
    <div>
      <h1>Extracted JSON Data</h1>
      <pre>{JSON.stringify(storedData, null, 2)}</pre> {/* Display JSON */}
    </div>
  );
}

export default App;
