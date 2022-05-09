// import AdminPage from "./pages/Admin/AdminPage";
import { theme } from "./styles/muiStyles";
import { ThemeProvider } from "@mui/material/styles";
import "./App.css";
import { CssBaseline } from "@mui/material";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import routeAdmin from "./routes/AdminRoute";
import routeUser from "./routes/UserRoute";

const routesAdmin = routeAdmin.map((route, index) => (
  <Route key={index} path={route.path} element={route.element} />
));
const routesUser = routeUser.map((route, index) => (
  <Route key={index} path={route.path} element={route.element} />
));

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          {routesUser}
          {routesAdmin}
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
