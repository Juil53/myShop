import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { USER_ACTIONS } from "../../../../constants";
import localStorage from "../../../../service/localStorage";
import Image from "../../../image/Image";

const User = (props) => {
  const providerID = localStorage.get("providerID");

  const { data = {} } = props;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleSignout() {
    dispatch({ type: USER_ACTIONS.SIGNOUT_USER });
    navigate("/home");
  }

  const handleUser = () => {
    navigate("/user");
  };

  return (
    <>
      <div className="nav-btn user-btn">
        <div className="user" onClick={handleUser}>
          <div className="image">
            <Image src={data.image} showLoading />
          </div>
          <div className="name">
            <span>Hi,</span>
            <div>{data.displayName}</div>
          </div>
        </div>
        <div className="user-dropdown">
          <Link to="/user/information">Account information</Link>
          <Link to="/user/orders">Orders</Link>
          {!providerID && <Link to="/user/password">Change password</Link>}
          <Link to="/user/address">Address book</Link>
          <div className="signout" onClick={handleSignout}>
            Sign out
          </div>
        </div>
      </div>
      <div className="signout-btn">
        <i className="fa-solid fa-arrow-right-from-bracket"></i>
      </div>
    </>
  );
};

export default User;
