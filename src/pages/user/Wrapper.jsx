import { Outlet } from "react-router-dom";

import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";

const Wrapper = (props) => {
  return (
    <div id="page">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Wrapper;
