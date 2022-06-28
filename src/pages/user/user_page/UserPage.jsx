import { useLocation, Link } from "react-router-dom";

import localStorage from "../../../service/localStorage";
import ChangePassword from "./child/ChangePassword";
import UserInformation from "./child/UserInformation";
import BreadCumb from "../../../components/breadcumb/BreadCumb";
import AddressManagement from "./child/address_management/AddressManagement";

const UserPage = () => {
  const user = localStorage.get("user");
  const { pathname } = useLocation();

  const array = [
    {
      name: "Home",
      url: "/",
    },
    {
      name: "User",
      url: "/user",
    },
  ];

  const createContentRight = () => {
    switch (pathname) {
      case "/user/orders":
        return <></>;
      case "/user/information":
        return <UserInformation data={user} />;
      case "/user/password":
        return <ChangePassword />;
      case "/user/address":
        return <AddressManagement />;
      default:
        return <UserInformation data={user} />;
    }
  };

  return (
    <div className="user-page-container">
      <div className="breadcums">
        <BreadCumb pages={array} />
      </div>
      {user ? (
        <div className="user-page__content row">
          <div className="user-page__content-left">
            <div className="title row">
              <div className="img">
                <img src="/img/default_product.jpg" />
              </div>
              <div className="name">
                Welcome back <br />
                <span className="bottom">Lê Ngọc Minh</span>
              </div>
            </div>
            <div
              className={
                "content-btn " +
                (pathname === "/user/information" ? "active" : "")
              }
            >
              <Link to="/user/information">Account information</Link>
            </div>
            <div
              className={
                "content-btn " + (pathname === "/user/orders" ? "active" : "")
              }
            >
              <Link to="/user/orders">Orders</Link>
            </div>
            <div
              className={
                "content-btn " + (pathname === "/user/password" ? "active" : "")
              }
            >
              <Link to="/user/password">Change password</Link>
            </div>
            <div
              className={
                "content-btn " + (pathname === "/user/address" ? "active" : "")
              }
            >
              <Link to="/user/address">Address management</Link>
            </div>
          </div>
          <div className="user-page__content-right">{createContentRight()}</div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default UserPage;
