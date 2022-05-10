import { theme } from "./styles/MuiStyles";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { renderRouteAdmin } from "./routes/AdminRoute";
import UserRoute from "./routes/UserRoute";
import "./scss/App.scss";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {renderRouteAdmin()}
      <UserRoute />
    </ThemeProvider>
  );
}

export default App;
