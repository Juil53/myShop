import React from "react";
import "../../../../scss/App.scss"
import SearchIcon from '@mui/icons-material/Search';
import UserTable from "./UserTable";


function UserManagement() {
  return (
    <div className="content">
      <button className="btn btn--success">Thêm</button>
      <div className="search__box">
        <SearchIcon/>
        <input className="search__box--input" type="text" placeholder="search"/>
      </div>
      <div>
        <UserTable/>
      </div>
    </div>
  );
}

export default UserManagement;
