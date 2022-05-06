import "./App.css";
import ProductInfoPopup from "./components/Popup/child/ProductInfoPopup";
import ProductCard from "./components/ProductCard/ProductCard";
import ProductSection from "./components/ProductSection/ProductSection";
import HomePage from "./pages/User/HomePage/HomePage";

//import AdminPage from "./Pages/Admin/AdminPage";
function App() {
  let att = [
    {
      name: "Thương hiệu",
      value: "Giày da cao cấp",
    },
    {
      name: "Bảo hành",
      value: "12 tháng",
    },
    {
      name: "Chất liệu",
      value: "Da",
    },
  ];

  return <HomePage />;
}

export default App;
