import "./App.css";
import ProductInfoPopup from "./components/Popup/child/ProductInfoPopup";
import ProductCard from "./components/ProductCard/ProductCard";
import ProductSection from "./components/ProductSection/ProductSection";

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

  return (
    // <ProductCard
    //   carDirection="vertical"
    //   name="Giày da cá sấu cao cấp thương hiệu Nhật Bản Anh Mỹ Pháp đình"
    //   price_after_discount="500000"
    //   price_before_discount="700000"
    //   img="./img/sp1.png"
    //   attributes={att}
    //   quantity="10"
    // />
    <ProductSection title="Hot product" />
  );
}

export default App;
