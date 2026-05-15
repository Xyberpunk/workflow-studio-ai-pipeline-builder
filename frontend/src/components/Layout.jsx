import { Toaster } from "react-hot-toast";
import { SubmitButton } from "./SubmitButton";

export const Layout = ({ toolbar, canvas, onSubmit, isSubmitting }) => {
  return (
    <div className="flex h-screen flex-col overflow-hidden bg-canvas text-slate-50">
      <header className="border-b border-slate-800 bg-slate-950/70 px-6 py-4 backdrop-blur">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-lg font-semibold tracking-tight text-slate-50">Workflow Studio</h1>
            <p className="text-sm text-slate-400">Design, connect, and validate AI automation pipelines.</p>
          </div>
          <SubmitButton isSubmitting={isSubmitting} onSubmit={onSubmit} />
        </div>
        {toolbar}
      </header>

      <main className="min-h-0 flex-1">{canvas}</main>
      <Toaster
        position="top-right"
        toastOptions={{
          className: "border border-slate-700 bg-slate-900 text-slate-50 shadow-glow",
          duration: 5000,
        }}
      />
    </div>
  );
};
