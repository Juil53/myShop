import { Outlet } from "react-router-dom";

import Header from "../../components/user/header/Header";
import Footer from "../../components/user/footer/Footer";
import Popup from "../../components/popup/Popup";

const Wrapper = (props) => {
  return (
    <div id="page-container">
      <Header />
      <Outlet />
      <Footer />
      <Popup />
    </div>
  );
};

export default Wrapper;
