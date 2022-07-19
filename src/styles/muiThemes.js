import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  typography: {
    htmlFontSize: 10,
  },
  palette: {
    primary: {
      main: "#051e34",
      light: "#052b41c2",
      dark: "#133f63",
      contrastText: "#fff",
    },
    secondary: {
      main: "#35c0c5",
      light: "#5dccd0",
      dark: "#258689",
      contrastText: "#fff",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        text: {
          "&:hover": {
            backgroundColor: "rgba(2, 136, 209, 0.1)",
          },
        },
      },
    },
  },
});
