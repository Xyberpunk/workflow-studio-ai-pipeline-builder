export const validateJsonValue = (value) => {
  try {
    JSON.parse(value);
    return { valid: true, message: "Valid JSON" };
  } catch (error) {
    return { valid: false, message: error.message };
  }
};

export const getValidationTone = (validation) => {
  if (!validation) {
    return "idle";
  }

  if (!validation.is_dag || validation.validation_errors?.length) {
    return "danger";
  }

  if (validation.isolated_nodes?.length || validation.warnings?.length) {
    return "warning";
  }

  return "success";
};
