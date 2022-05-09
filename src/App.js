import { theme } from "./styles/muiStyles";
import { ThemeProvider } from "@mui/material/styles";
import HomePage from "./pages/User/HomePage/HomePage";
import { Routes, Route } from "react-router-dom";
import routeAdmin from "./routes/AdminRoute";
import { CssBaseline, Typography } from "@mui/material";
import "./scss/App.scss";
const routesAdmin = routeAdmin.map((route, index) => (
  <Route key={index} path={route.path} element={route.element} />
));

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Routes>
        <Route path="/" element={<HomePage />} />
        {routesAdmin}
      </Routes>
    </ThemeProvider>
  );
}

export default App;
