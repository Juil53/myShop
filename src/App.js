import "./App.css";
import HomePage from "./pages/User/HomePage/HomePage";
import { Routes, Route } from "react-router-dom";
//import AdminPage from "./Pages/Admin/AdminPage";
function App() {
  return (
    <Routes>
      <Route path="" element={<HomePage />} />
    </Routes>
  );
}

export default App;
