import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import { Button, InputAdornment, Typography } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectUserKeyword } from "../../../../store/users/selector";
import { getKeyword } from "../../../../store/users/usersSlice";
import { TextFieldCustom } from "../../../../styles/styled_components/styledComponent";
import UserModal from "./UserModal";
import { UserTable } from "./UserTable";

// import "../../../../scss/App.scss";

function UserManagement() {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.user.loading);
  const keyword = useSelector(selectUserKeyword);
  const handleChange = (event) => dispatch(getKeyword(event.target.value));

  const handleClearSeach = () => (
    (document.querySelector(".search__input").value = null), dispatch(getKeyword(null))
  );

  return (
    <>
      <Typography variant="h4" fontWeight={700}>
        User Management
      </Typography>
      <div className="container usermanagement">
        <TextFieldCustom
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
        <Link to="add">
          <Button variant="contained" color="secondary" size="small" startIcon={<AddIcon />}>
            Add
          </Button>
        </Link>
      </div>

      <div className="table">
        <UserTable keyword={keyword} />
      </div>

      {/* <UserModal /> */}
    </>
  );
}

export default UserManagement;
