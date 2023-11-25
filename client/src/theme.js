// mui theme settings
export const themeSettings = {
  palette: {
    primary: {
      light: "#f9f9f9",
      main: "#FCF5EE",
      dark: "#FBD8B4",
    },
    secondary: {
      light: "#FFAA1D",
      main: "#C7511F",
      dark: "#c45500",
    },
    error: {
      light: "#CC0C39",
      main: "#B12704",
      dark: "#710000",
    },
    warning: {
      light: "#FFD814",
      main: "#FFD018",
      dark: "#FCD200",
    },
    info: {
      light: "#37475a",
      main: "#232f3e",
      dark: "#131a22",
    },
    success: {
      light: "#009674",
      main: "#007600",
      dark: "#007185",
    },
    grey: {
      50: "#F0F0F0",
      100: "#F0F2F2",
      200: "#eaeded",
      300: "#e4e4e4",
      400: "#DDD",
      500: "#d5d9d9",
      600: "#BBBFBF",
      700: "#999999",
      800: "#565959",
      900: "#363939",
      1000: "#222",
    },
  },
  shape: {
    borderRadius: 8,
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 425,
      md: 768,
      lg: 1024,
      xl: 1440,
    },
  },
  typography: {
    fontFamily: ["Arial", "sans-serif"].join(","),
    h1: {
      fontFamily: ["Arial", "sans-serif"].join(","),
      fontWeight: 400,
      fontSize: "1.75rem",
      lineHeight: "2.25rem",
    },
    h2: {
      fontFamily: ["Arial", "sans-serif"].join(","),
      fontWeight: 400,
      fontSize: "1.5rem",
      lineHeight: "2rem",
    },
    h3: {
      fontFamily: ["Arial", "sans-serif"].join(","),
      fontWeight: 400,
      fontSize: "1.31rem",
      lineHeight: "1.97rem",
    },
    h4: {
      fontFamily: ["Arial", "sans-serif"].join(","),
      fontWeight: 400,
      fontSize: "1.125rem",
      lineHeight: "1.5rem",
    },
    h5: {
      fontFamily: ["Arial", "sans-serif"].join(","),
      fontWeight: 400,
      fontSize: "1rem",
      lineHeight: "1.5rem",
    },
    h6: {
      fontFamily: ["Arial", "sans-serif"].join(","),
      fontWeight: 400,
      fontSize: "0.937rem",
      lineHeight: 1.57,
    },
  },
};
