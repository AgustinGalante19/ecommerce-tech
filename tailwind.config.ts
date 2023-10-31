import type { Config } from "tailwindcss"
/* const { blackA, violet, mauve } = require('@radix-ui/colors'); */
import { blackA, violet, mauve } from "@radix-ui/colors"
const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ...blackA,
        ...mauve,
        ...violet,
        primary: "#008ECC",
        secondary: "#F3F9FB",
        offwhite: "#f5f5f5",
      },
    },
  },
  plugins: [],
}
export default config
