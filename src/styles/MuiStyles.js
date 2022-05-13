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
      main: "#adbed2",
      light: "#bdcbdb",
      dark: "#798593",
    },
  },
});
