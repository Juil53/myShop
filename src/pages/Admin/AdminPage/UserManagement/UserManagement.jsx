import React from "react";
import { useSelector, useDispatch } from "react-redux";
import "../../../../scss/App.scss";
import { UserTable } from "./UserTable";
import { actGetKeyword, actGetUserInfo } from "../../../../store/actions/user";
import { Button } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AddBoxRoundedIcon from "@mui/icons-material/AddBoxRounded";
import CloseIcon from "@mui/icons-material/Close";
import UserModal from "./UserModal";

function UserManagement() {
  const dispatch = useDispatch();
  const keyword = useSelector((state) => state.userReducer.keyword);
  const handleOpen = () => dispatch({ type: "OPEN_MODAL" });
  const handleChange = (event) => dispatch(actGetKeyword(event.target.value));
  const handleResetModal = () => dispatch(actGetUserInfo(null));
  const handleClearSeach = () => (
    (document.querySelector(".search__input").value = null),
    dispatch(actGetKeyword(null))
  );

  return (
    <>
      <div className="container usermanagement">
        <div className="search">
          <SearchIcon className="search__icon" />
          <input
            placeholder="Search by Email..."
            type="text"
            className="search__input"
            onChange={handleChange}
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
            color="primary"
            startIcon={<AddBoxRoundedIcon/>}
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
        <UserTable keyword={keyword} />
      </div>
      
      <UserModal />
    </>
  );
}

export default UserManagement;
