import { useDispatch, useSelector } from "react-redux";
import { useLocation, Link } from "react-router-dom";

import ChangePassword from "./child/ChangePassword";
import UserInformation from "./child/UserInformation";
import BreadCumb from "../../../components/breadcumb/BreadCumb";
import AddressManagement from "./child/address_management/AddressManagement";
import { clientSelector } from "../../../store/clients/selector";
import { useEffect } from "react";
import { LOADING_STATUS, USER_ACTIONS } from "../../../constants";
import Loading from "../../../components/loading/Loading";
import localStorage from "../../../service/localStorage";

const UserPage = () => {
  const token = localStorage.get("token");
  const client = useSelector(clientSelector);
  const dispatch = useDispatch();
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

  useEffect(() => {
    if (client.status === LOADING_STATUS.IDLE && token) {
      dispatch({ type: USER_ACTIONS.GET_USER_INFO });
    }
  });

  const createContentRight = (client) => {
    switch (pathname) {
      case "/user/orders":
        return <></>;
      case "/user/information":
        return <UserInformation data={client} />;
      case "/user/password":
        return <ChangePassword />;
      case "/user/address":
        return <AddressManagement data={client} />;
      default:
        return <UserInformation data={client} />;
    }
  };

  return (
    <div className="user_page-container">
      <div className="breadcums">
        <BreadCumb pages={array} />
      </div>
      {token ? (
        client.status === LOADING_STATUS.SUCCESS ? (
          <div className="user_page-content row">
            <div className="user_page-content-left">
              <div className="title row">
                <div className="img">
                  <img src="/img/default_product.jpg" alt="" />
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
                  "content-btn " +
                  (pathname === "/user/password" ? "active" : "")
                }
              >
                <Link to="/user/password">Change password</Link>
              </div>
              <div
                className={
                  "content-btn " +
                  (pathname === "/user/address" ? "active" : "")
                }
              >
                <Link to="/user/address">Address management</Link>
              </div>
            </div>
            <div className="user_page-content-right">
              {createContentRight(client?.data)}
            </div>
          </div>
        ) : (
          <Loading />
        )
      ) : (
        <div className="user_page-content not_signin">
          You are not signed in
          <Link to="/sign" className="button-style signin-btn">
            Sign in
          </Link>
        </div>
      )}
    </div>
  );
};

export default UserPage;
