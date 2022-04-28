import React from "react";
import "../../../../scss/App.scss";
import SearchIcon from "@mui/icons-material/Search";
import { UserTable } from "./UserTable";

function UserManagement() {
  return (
    <>
      <div className="container usermanagement">
        <div className="search">
          <SearchIcon />
          <input placeholder="Search..." type="text" className="search__input"/>
        </div>

        <div className="add-btn">
          <button className="btn btn--success">Thêm</button>
        </div>
      </div>
      <div className="table">
        <UserTable />
      </div>
      {/* <UserModal/> */}
    </>
  );
}

export default UserManagement;
