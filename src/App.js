import { BrowserRouter, Routes, Route } from "react-router-dom";
import { theme } from "./styles/muiThemes";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import SessionCheck from "./components/session_check/SessionCheck";
import UserRoutes from "./routes/UserRoute";
import AdminContainer from "./pages/admin/AdminContainer";
import "./scss/App.scss";

function App() {
  return (
    // For Date Picker
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <SessionCheck />
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <Routes>
            <Route path="/*" element={<UserRoutes />} />
            <Route path="/admin/*" element={<AdminContainer />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </LocalizationProvider>
  );
}

export default App;
