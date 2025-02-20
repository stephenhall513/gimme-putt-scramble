import { createTheme, ThemeOptions, ThemeProvider } from "@mui/material";
import type {} from "@mui/x-date-pickers/themeAugmentation";
import type {} from "@mui/x-data-grid/themeAugmentation";

export const themeOptions: ThemeOptions = {
  palette: {
    mode: "light",
    primary: {
      main: "#2E4706",
      contrastText: "#FFFFFF",
      light: "#4C760A",
      dark: "#0e1502",
    },
    secondary: {
      main: "#7DB534",
      dark: "#4b6d1f",
      light: "#b1d385",
    },
    info: {
      main: "#FFFFFF",
    },
    background: {
      default: "#000000",
      paper: "#000000",
    },
    text: {
      primary: "#000000",
      secondary: "#a2a2a2",
      disabled: "#414141",
    },
  },
  typography: {
    h1: {
      fontFamily: "Russo One",
      fontSize: "32pt",
    },
    h2: {
      fontFamily: "Russo One",
      fontSize: "28pt",
    },
  },
  components: {
    MuiDateCalendar: {
      styleOverrides: {
        root: {
          color: "#000000",
          borderRadius: "2px",
          borderWidth: "1px",
          borderColor: "#7DB534",
          border: "1px solid",
          backgroundColor: "#FFFFFF",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: "#FFFFFF", // Set dropdown background color
        },
      },
    },
  },
};

// Create a theme instance.
const theme = createTheme(themeOptions);

export default theme;
