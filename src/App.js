// import AdminPage from "./pages/Admin/AdminPage";
import { Routes, Route } from "react-router-dom";
import { theme } from "./styles/muiStyles";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import HomePage from "./pages/User/HomePage/Homepage";
import routeAdmin from "./routes/AdminRoute";
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
        
        {/* <AdminPage/> */}
        
      </Routes>
    </ThemeProvider>
  );
}

export default App;
