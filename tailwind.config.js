module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: 'class',
  theme: {
    container: {
      center: true,
    },
    screens: {
      sm: "576px",
      md: "768px",
      lg: "992px",
      xl: "1280px",
    },
    fontFamily: {
      sans: [
        "Jost",
        "ui-sans-serif",
        "system-ui",
        "-apple-system",
        "BlinkMacSystemFont",
        '"Segoe UI"',
        "Roboto",
        '"Helvetica Neue"',
        "Arial",
        '"Noto Sans"',
        "sans-serif",
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
        '"Noto Color Emoji"',
      ],
    },
    colors: {
      transparent: "transparent",
      current: "currentColor",

      white: "#FFFFFF",

      gray100: "#EEEEEE",
      gray200: "#ECECEC",
      gray300: "#C1C1C1",
      gray400: "#686868",
      gray500: "#282828",

      red: "#F05454",
      yellow: "#F5B461",
      green: "#9BDEAC",
      blue: "#66BFBF",
      lightgreen: "#F2FDFB",
    },
    extend: {},
  },
  plugins: [],
};