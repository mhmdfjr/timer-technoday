import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      screens: {
        '2xl': {'max': '1536px'},
        // => @media (max-width: 1535px) { ... }
        'xl': {'max': '1280px'},
        // => @media (max-width: 1279px) { ... }
        'lg': {'max': '1024px'},
        // => @media (max-width: 1023px) { ... }
        'md': {'max': '768px'},
        // => @media (max-width: 767px) { ... }
        'sm': {'max': '640px'},
        // => @media (max-width: 639px) { ... }
      },
    },
  },
  plugins: [],
};
export default config;
