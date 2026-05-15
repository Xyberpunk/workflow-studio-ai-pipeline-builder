import { usePipelineValidation } from "./hooks/usePipelineValidation";

export const usePipelineSubmit = () => {
  const { isSubmitting, validatePipeline } = usePipelineValidation();
  return { isSubmitting, submitPipeline: validatePipeline };
};
