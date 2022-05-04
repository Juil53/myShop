import React from "react";
import { useSelector, useDispatch } from "react-redux";
import "../../../../scss/App.scss";
import { UserTable } from "./UserTable";
import { actGetUserInfo } from "../../../../store/actions/user";
import { Button } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AddBoxRoundedIcon from "@mui/icons-material/AddBoxRounded";
import CloseIcon from "@mui/icons-material/Close";
import UserModal from "./UserModal";

function UserManagement() {
  const dispatch = useDispatch();
  const handleOpen = () => dispatch({ type: "OPEN_MODAL" });
  const handleResetModal = () => dispatch(actGetUserInfo(null));
  const handleClearSeach = () => {
    document.querySelector(".search__input").value = "";
  };

  return (
    <>
      <div className="container usermanagement">
        <div className="search">
          <SearchIcon className="search__icon" />
          <input
            placeholder="Search..."
            type="text"
            className="search__input"
          />
          <CloseIcon
            className="search__icon"
            onClick={() => {
              handleClearSeach();
            }}
          />
        </div>

        <div className="add-btn">
          <Button
            variant="contained"
            color="success"
            startIcon={<AddBoxRoundedIcon />}
            onClick={() => {
              handleResetModal();
              handleOpen();
            }}
          >
            Add
          </Button>
        </div>
      </div>
      <div className="table">
        <UserTable />
      </div>
      <UserModal />
    </>
  );
}

export default UserManagement;
