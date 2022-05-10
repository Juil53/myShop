import { Outlet } from "react-router-dom";

import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";

const Wrapper = (props) => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

export default Wrapper;
