export function extractFieldData(jsonFile) {
  function getType(fieldName, allFields) {
    const field = allFields.find((f) => f.name === fieldName);
    return field ? field.type : "TYPE_UNKNOWN";
  }

  function extractNestedFields(
    nestedFieldDescriptions,
    allFields,
    parentFieldName = ""
  ) {
    if (!nestedFieldDescriptions) return [];

    return nestedFieldDescriptions.map((nestedField) => {
      const fullFieldName = parentFieldName
        ? `${parentFieldName}.${nestedField.field}`
        : nestedField.field;
      const isEnum = !!nestedField.knownValueDescriptions;

      return {
        section: fullFieldName,
        field: nestedField.field,
        description: nestedField.description || "No description available",
        type: getType(nestedField.field, allFields),
        defaultValue: nestedField.defaultValue,
        knownValueDescriptions: isEnum
          ? nestedField.knownValueDescriptions
          : [],
        nestedFields: extractNestedFields(
          nestedField.nestedFieldDescriptions,
          allFields,
          fullFieldName
        ),
      };
    });
  }

  if (!jsonFile || !jsonFile.fieldDescriptions) return [];

  const policyDescription =
    jsonFile.policyDescription || "No description available";
  const allFields = jsonFile.definition.messageType.flatMap(
    (messageType) => messageType.field
  );

  const name = jsonFile.name;
  const extractedFields = jsonFile.fieldDescriptions.map((fieldDescription) => {
    const isEnum = !!fieldDescription.knownValueDescriptions;

    return {
      section: fieldDescription.field,
      field: fieldDescription.field,
      description: fieldDescription.description || "No description available",
      type: getType(fieldDescription.field, allFields),
      defaultValue: fieldDescription.defaultValue,
      knownValueDescriptions: isEnum
        ? fieldDescription.knownValueDescriptions
        : [],
      nestedFields: extractNestedFields(
        fieldDescription.nestedFieldDescriptions,
        allFields,
        fieldDescription.field
      ),
    };
  });

  return {
    name,
    policyDescription,
    fieldDescriptions: extractedFields,
  };
}
