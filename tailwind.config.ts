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
      keyframes: { sortRotateIn: { "0%": { transform: "rotate(-90deg)" } } },
      animation: {
        sortRotateIn: "sortRotateIn 0.1s",
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
        ".color-scheme-inherit": {
          "color-scheme": "inherit",
        },
      });
    }),
  ],
};
export default config;
