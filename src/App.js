import { BrowserRouter, Routes, Route } from "react-router-dom";
import { theme } from "./styles/MuiStyles";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import UserRoutes from "./routes/UserRoute";
import AdminContainer from "./pages/admin/AdminContainer";

import "./scss/App.scss";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<UserRoutes />} />
          <Route path="/admin/*" element={<AdminContainer />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
