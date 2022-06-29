import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { USER_ACTIONS } from "../../../constants";

const User = (props) => {
  const { data = {} } = props;
  const dispatch = useDispatch();

  function handleSignout() {
    dispatch({ type: USER_ACTIONS.SIGNOUT_USER });
    window.location.reload();
  }

  return (
    <>
      <div className="nav-btn user-btn">
        <div className="user">
          <div className="image">
            <img src={data.image} alt="" />
          </div>
          <div className="name">
            <span>Hi,</span>
            <div>{data.displayName}</div>
          </div>
        </div>
        <div className="user-dropdown">
          <Link to="/user/information">Account information</Link>
          <Link to="/user/orders">Orders</Link>
          <Link to="/user/password">Change password</Link>
          <Link to="/user/address">Address manage</Link>
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
