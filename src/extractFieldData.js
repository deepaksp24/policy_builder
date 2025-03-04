export function extractFieldData(jsonFile) {
  function getType(value) {
    if (typeof value === "boolean") {
      return "TYPE_BOOL";
    } else if (typeof value === "number") {
      return "TYPE_INT64";
    }
    return "TYPE_UNKNOWN"; // Optional: Handle unexpected types
  }

  if (!jsonFile || !jsonFile.fieldDescriptions) return [];

  const policyDescription =
    jsonFile.policyDescription || "No description available";
  const name = jsonFile.name;
  const extractedFields = Object.keys(jsonFile.fieldDescriptions).map((key) => {
    const field = jsonFile.fieldDescriptions[key];
    const isEnum = !!field.knownValueDescriptions;

    return {
      section: key, // Store section name
      field: field.name,
      type: isEnum ? "TYPE_ENUM" : getType(field.defaultValue),
      defaultValue: field.defaultValue,
      knownValueDescriptions: isEnum ? field.knownValueDescriptions : [],
    };
  });

  return {
    name,
    policyDescription,
    fieldDescriptions: extractedFields,
  };
}
