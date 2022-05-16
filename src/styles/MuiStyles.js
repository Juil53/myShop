import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  typography: {
    htmlFontSize: 10,
  },
  palette: {
    primary: {
      main: "#35c0c5",
      light: "#5dccd0",
      dark: "#258689",
      contrastText: "#fff",
    },
    secondary: {
      main: "#466991",
      light: "#7597c2",
      dark: "#133f63",
      contrastText: "#fff",
    },
  },
});
