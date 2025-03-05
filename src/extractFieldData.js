export function extractFieldData(jsonFile) {
  function getType(index, allField) {
    return allField[index].type;
  }

  if (!jsonFile || !jsonFile.fieldDescriptions) return [];

  const policyDescription =
    jsonFile.policyDescription || "No description available";
  const allField = jsonFile.definition.messageType[0].field;

  const name = jsonFile.name;
  const extractedFields = Object.keys(jsonFile.fieldDescriptions).map(
    (key, index) => {
      const field = jsonFile.fieldDescriptions[key];
      const isEnum = !!field.knownValueDescriptions;

      return {
        section: key, // Store section name
        field: field.name ? field.name : policyDescription,
        type: getType(index, allField),
        defaultValue: field.defaultValue,
        knownValueDescriptions: isEnum ? field.knownValueDescriptions : [],
      };
    }
  );

  return {
    name,
    policyDescription,
    fieldDescriptions: extractedFields,
  };
}
