import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  typography: {
    htmlFontSize: 10,
  },
  palette: {
    primary: {
      main: "#eb8f90",
      light: "#efa5a6",
      dark: "#a46464",
      contrastText: "#fff",
    },
    secondary: {
      main: "#adbed2",
      light: "#bdcbdb",
      dark: "#798593",
    },
  },
  components: {
    MuiToolbar: {
      styleOverrides: {
        root: {
          backgroundColor: "#efa5a6",
        },
      },
    },
  },
});
