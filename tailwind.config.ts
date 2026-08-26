import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        mata: {
          DEFAULT: "#0F3D2E", // verde escuro (mata atlântica)
          light: "#1B5E44",
        },
        folha: {
          DEFAULT: "#2E8B57", // verde tropical
          light: "#4CAF7D",
        },
        caju: {
          DEFAULT: "#F4772E", // laranja
          dark: "#D65C1B",
        },
        milho: {
          DEFAULT: "#F5B72E", // amarelo dourado
          light: "#FFD873",
        },
        areia: "#FFF8EC", // creme/natural
        casca: "#FBE9CF",
      },
      fontFamily: {
        display: ["var(--font-display)"],
        body: ["var(--font-body)"],
      },
      borderRadius: {
        blob: "42% 58% 63% 37% / 41% 44% 56% 59%",
      },
      boxShadow: {
        soft: "0 12px 30px -12px rgba(15, 61, 46, 0.25)",
        card: "0 8px 24px -8px rgba(15, 61, 46, 0.18)",
      },
      keyframes: {
        floaty: {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "50%": { transform: "translateY(-10px) rotate(2deg)" },
        },
      },
      animation: {
        floaty: "floaty 6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
export default config;
