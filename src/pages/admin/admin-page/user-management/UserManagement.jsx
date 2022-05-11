import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { getKeyword } from "../../../../store/users/usersSlice";
import { selectUserKeyword } from "../../../../store/users/selector";
import { UserTable } from "./UserTable";
import { Button } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AddBoxRoundedIcon from "@mui/icons-material/AddBoxRounded";
import CloseIcon from "@mui/icons-material/Close";
import UserModal from "./UserModal";
import AddUserModal from "./AddUserModal";
import "../../../../scss/App.scss";

function UserManagement() {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = React.useState(false);
  const keyword = useSelector(selectUserKeyword);
  const handleChange = (event) => dispatch(getKeyword(event.target.value));
  const handleClearSeach = () => (
    (document.querySelector(".search__input").value = null),
    dispatch(getKeyword(null))
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
            startIcon={<AddBoxRoundedIcon />}
            onClick={() => {
              setShowModal(true);
            }}
          >
            Add
          </Button>
        </div>
      </div>

      {/* DataTable */}
      <div className="table">
        <UserTable keyword={keyword} />
      </div>

      {/* Modal */}
      <UserModal />
      <AddUserModal
        show={showModal}
        close={() => {
          setShowModal(false);
        }}
      />
    </>
  );
}

export default UserManagement;
