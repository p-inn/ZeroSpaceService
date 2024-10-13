import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        notoSansKr: ["var(--noto-sans-kr)"],
        roboto: ["var(--roboto)"],
      },
    },
  },
  plugins: [require('daisyui'),],
};
export default config;
