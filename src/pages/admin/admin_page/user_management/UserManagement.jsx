import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { getKeyword } from "../../../../store/users/usersSlice";
import { selectUserKeyword } from "../../../../store/users/selector";
import { UserTable } from "./UserTable";
import { Button, InputAdornment } from "@mui/material";
import { SearchField } from "../../../../styles/styled_components/styledComponent";

import AddBoxRoundedIcon from "@mui/icons-material/AddBoxRounded";
import SearchIcon from "@mui/icons-material/Search";
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
        <SearchField
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          label="Search..."
          size="small"
          sx={{ minWidth: "30%" }}
          onChange={handleChange}
        />
        <Button
          variant="contained"
          color="success"
          size="small"
          startIcon={<AddBoxRoundedIcon />}
          onClick={() => {
            setShowModal(true);
          }}
        >
          Add
        </Button>
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
