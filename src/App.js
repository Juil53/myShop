// import AdminPage from "./pages/Admin/AdminPage";
import { Routes, Route } from "react-router-dom";
import { theme } from "./styles/muiStyles";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import HomePage from "./pages/User/HomePage/HomePage";
import routeAdmin from "./routes/AdminRoute";
// import "./App.css";
import "./scss/App.scss";
import AdminPage from "./pages/Admin/AdminPage";

const routesAdmin = routeAdmin.map((route, index) => (
  <Route key={index} path={route.path} element={route.element} />
));

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        
        {/* <AdminPage/> */}
        
      </Routes>
    </ThemeProvider>
  );
}

export default App;
