import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getKeyword } from "../../../../store/users/usersSlice";
import { selectUserKeyword } from "../../../../store/users/selector";
import { UserTable } from "./UserTable";
import { Button, InputAdornment, Typography } from "@mui/material";
import { SearchField } from "../../../../styles/styled_components/styledComponent";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import UserModal from "./UserModal";

import "../../../../scss/App.scss";

function UserManagement() {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.user.loading);
  console.log(loading)
  const keyword = useSelector(selectUserKeyword);
  const handleChange = (event) => dispatch(getKeyword(event.target.value));

  const handleClearSeach = () => (
    (document.querySelector(".search__input").value = null),
    dispatch(getKeyword(null))
  );

  return (
    <>
      <Typography variant="h4" fontWeight={700}>
        User Management
      </Typography>
      <div className="container usermanagement">
        <SearchField
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          label="Search by Email..."
          size="small"
          sx={{ minWidth: "10%" }}
          onChange={handleChange}
        />
        <Link to="add-user">
          <Button
            variant="contained"
            color="secondary"
            size="small"
            startIcon={<AddIcon />}
          >
            Add User
          </Button>
        </Link>
      </div>

      {/* DataTable */}
      <div className="table">
        <UserTable keyword={keyword} />
      </div>

      {/* Modal */}
      <UserModal />
    </>
  );
}

export default UserManagement;
