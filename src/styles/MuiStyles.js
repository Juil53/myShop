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

  
  components: {
    MuiToolbar: {
      styleOverrides: {
        root: {
          backgroundColor: theme.palette.secondary.main,
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          "&:hover": {
            color: "primary.main",
            "& .MuiListItemIcon-root": {
              color: "primary.main",
            },
          },
        },
      },
    },

    MuiTableHead: {
      styleOverrides: {
        root: {
          backgroundColor: "#5dccd0",
          border: "1px solid",
        },
      },
    },
    MuiTableBody: {
      styleOverrides: {
        root: {
          border: "1px solid",
        },
      },
    },
    MuiDrawer:{
      styleOverrides:{
        paper:{
          backgroundColor:"#154f51"
        }
      }
    }
  },
});
