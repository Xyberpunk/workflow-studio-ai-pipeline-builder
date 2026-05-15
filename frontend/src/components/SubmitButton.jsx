import { Loader2, Send } from "lucide-react";

export const SubmitButton = ({ isSubmitting, onSubmit }) => {
  return (
    <button
      className="inline-flex items-center gap-2 rounded-xl bg-indigo-500 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-950/40 transition-all duration-200 hover:bg-indigo-400 disabled:cursor-not-allowed disabled:opacity-70"
      disabled={isSubmitting}
      type="button"
      onClick={onSubmit}
    >
      {isSubmitting ? <Loader2 className="animate-spin" size={17} /> : <Send size={17} />}
      {isSubmitting ? "Validating" : "Submit"}
    </button>
  );
};
