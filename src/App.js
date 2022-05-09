import AdminPage from "./pages/Admin/AdminPage";
import { theme } from "./styles/muiStyles";
import { ThemeProvider } from "@mui/material/styles";
import HomePage from "./pages/User/HomePage/HomePage";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import { CssBaseline, Typography } from "@mui/material";
// import Product from "./components/product";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Routes>
        <Route path="" element={<HomePage />} />
      </Routes>
      <AdminPage />
    </ThemeProvider>
  );
}

export default App;
