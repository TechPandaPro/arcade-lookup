import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  safelist: [
    ...Array(101)
      .fill(null)
      .map((_, i) => `w-[${i}%]`),
  ],
  plugins: [
    plugin(function ({ addUtilities }) {
      addUtilities({
        ".color-scheme-normal": {
          "color-scheme": "normal",
        },
        ".color-scheme-dark": {
          "color-scheme": "dark",
        },
        ".color-scheme-light": {
          "color-scheme": "light",
        },
      });
    }),
  ],
};
export default config;
