import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/app/**/*.{ts,tsx}", "./src/components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        mata: {
          DEFAULT: "#173E35", // verde escuro (mata atlântica)
          light: "#28594B",
        },
        folha: {
          DEFAULT: "#286347", // verde tropical
          light: "#39744D",
        },
        caju: {
          DEFAULT: "#607B2D", // laranja
          dark: "#4D6423",
        },
        milho: {
          DEFAULT: "#DCE98D", // amarelo dourado
          light: "#E8F0BA",
        },
        areia: "#F8FAF5", // creme/natural
        casca: "#EAF0DC",
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
