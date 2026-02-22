/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./hooks/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#111827",
        mist: "#e6eef9",
        ocean: "#1b4b82",
        glow: "#7dd3fc",
        ember: "#f97316",
        "pokemon-red": "#e4002b",
        "pokemon-white": "#ffffff",
      },
      boxShadow: {
        halo: "0 0 0 1px rgba(125, 211, 252, 0.6), 0 10px 30px rgba(27, 75, 130, 0.35)",
      },
      fontFamily: {
        display: ["'Space Grotesk'", "system-ui", "sans-serif"],
        body: ["'Inter'", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "radial-spot": "radial-gradient(600px circle at 20% 20%, rgba(125,211,252,0.35), transparent 60%)",
      },
    },
  },
  plugins: [],
};
