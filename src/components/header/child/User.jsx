import { useDispatch } from "react-redux";

import { signout } from "../../../store/users/usersSlice";

const User = (props) => {
  const { data = {} } = props;
  const dispatch = useDispatch();

  function handleSignout() {
    dispatch(signout());
    window.location.reload();
  }

  return (
    <div className="nav-btn user-btn">
      <i className="fa-solid fa-user" />
      <span>User</span>
      <div className="user-dropdown">
        <div className="title">
          Hi, <span>{data.displayName}</span>
        </div>
        <a href="#">Orders</a>
        <a href="#">Account information</a>
        <a href="#">Change password</a>
        <a href="#">Address manage</a>
        <a onClick={handleSignout}>
          Sign out <i className="fa-solid fa-arrow-right-from-bracket"></i>
        </a>
      </div>
    </div>
  );
};

export default User;
