/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      colors: {
        canvas: "#0f172a",
        panel: "#1e293b",
        accent: "#6366f1",
        muted: "#94a3b8",
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(99, 102, 241, 0.35), 0 18px 45px rgba(15, 23, 42, 0.45)",
      },
    },
  },
  plugins: [],
};
