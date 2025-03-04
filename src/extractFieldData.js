export function extractFieldData(jsonFile) {
  function getType(value) {
    return typeof value === "boolean" ? "boolean" : "int";
  }

  if (!jsonFile || !jsonFile.fieldDescriptions) return [];

  return Object.keys(jsonFile.fieldDescriptions).map((key) => {
    const field = jsonFile.fieldDescriptions[key];
    const isEnum = !!field.knownValueDescriptions;

    return {
      section: key, // Store section name
      name: field.name,
      type: isEnum ? "enum" : getType(field.defaultValue),
      defaultValue: field.defaultValue,
      option: isEnum ? field.knownValueDescriptions : [],
    };
  });
}
