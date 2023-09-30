import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "bg-feed": "#f7f7f7",
        secondery: "#dfe3ee",
        sidebar: "#D4D7DC",
        "light-1": "#f7f7f7",
        "light-2": "#ADB9C1",
        "light-3": "#859CA2",
        "light-4": "#608180",
        "light-5": "#43655A",
      },
      gridTemplateColumns: {
        gallery: "repeat(auto-fit, minmax(250px, 1fr))",
      },
    },
    container: {
      center: true,
      padding: "1rem",
      screens: {
        "2xl": "1500px",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
}
export default config
