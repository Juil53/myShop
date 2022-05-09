import AdminPage from "./pages/Admin/AdminPage";
import { theme } from "./styles/muiStyles";
import { ThemeProvider } from "@mui/material/styles";
import "./App.css";
import { CssBaseline, Typography } from "@mui/material";
// import Product from "./components/product";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline/>
      <AdminPage />
    </ThemeProvider>
  );
}

export default App;
