import { Toaster } from "react-hot-toast";

export const Layout = ({ sidebar, topbar, canvas }) => {
  return (
    <div className="flex h-screen overflow-hidden bg-canvas text-slate-50">
      {sidebar}
      <div className="flex min-w-0 flex-1 flex-col">
        {topbar}
        <main className="relative min-h-0 flex-1">{canvas}</main>
      </div>
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
