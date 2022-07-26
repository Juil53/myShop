import { useDispatch, useSelector } from "react-redux";
import { useLocation, Link } from "react-router-dom";

import ChangePassword from "./ChangePassword";
import UserInformation from "./UserInformation";
import BreadCumb from "../../../components/breadcumb/BreadCumb";
import AddressBook from "./address_book/AddressBook";
import { clientData } from "../../../store/clients/selector";
import { useEffect } from "react";
import { LOADING_STATUS, USER_ACTIONS } from "../../../constants";
import Loading from "../../../components/loading/Loading";
import localStorage from "../../../service/localStorage";
import Orders from "./orders/Orders";
import OrderDetail from "./orders/OrderDetail";
import Image from "../../../components/image/Image";

const UserPage = () => {
  const token = localStorage.get("token");
  const providerID = localStorage.get("providerID");

  const client = useSelector(clientData);
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

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [pathname]);

  const createContentRight = (data) => {
    switch (pathname) {
      case "/user/orders":
        return <Orders />;
      case "/user/information":
        return <UserInformation data={data?.info} status={data?.status} />;
      case "/user/password":
        return <ChangePassword />;
      case "/user/address":
        return <AddressBook data={data?.info} status={data?.status} />;
      case "/user/orders/view-detail":
        return <OrderDetail />;
      default:
        return <UserInformation data={data?.info} status={data?.status} />;
    }
  };

  const handleSignout = () => {
    dispatch({ type: USER_ACTIONS.SIGNOUT_USER });
  };

  return (
    <div className="user_page-container">
      <div className="breadcums">
        <BreadCumb pages={array} />
      </div>
      {token ? (
        <div className="user_page-content row">
          <div className="user_page-content-left">
            <div className="title row">
              <div className="img">
                <Image src={client?.info?.image} showLoading />
              </div>
              <div className="name">
                Welcome back <br />
                <span className="bottom">{client?.info?.displayName}</span>
              </div>
            </div>
            <div className="navigation">
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
              {!providerID && (
                <div
                  className={
                    "content-btn " +
                    (pathname === "/user/password" ? "active" : "")
                  }
                >
                  <Link to="/user/password">Change password</Link>
                </div>
              )}
              <div
                className={
                  "content-btn " +
                  (pathname === "/user/address" ? "active" : "")
                }
              >
                <Link to="/user/address">Address book</Link>
              </div>
              <div className="content-btn" onClick={handleSignout}>
                Sign out
              </div>
            </div>
          </div>
          <div className="user_page-content-right">
            {client.status === LOADING_STATUS.LOADING ||
            client.status === LOADING_STATUS.IDLE ? (
              <Loading />
            ) : (
              createContentRight(client)
            )}
          </div>
        </div>
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
