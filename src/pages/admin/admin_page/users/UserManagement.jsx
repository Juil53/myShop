import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import Breadcrumb from "../../../../components/breadcumb/BreadCumb";
import { Box, Button, InputAdornment, Typography } from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { loginAdmin } from "../../../../store/users/selector";
import { TextFieldCustom } from "../../../../styles/styled_components/styledComponent";
import UserDataList from "./UserDataList";

const user__search = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginTop: "2rem",
  marginBottom: "2rem",
};

function UserManagement() {
  const [keyword, setKeyword] = useState("");
  const user = useSelector(loginAdmin);
  const handleChange = (event) => {
    setKeyword(event.target.value);
  };

  const pages = [
    {
      name: "Admin",
      url: "/admin",
    },
    {
      name: "Users",
      url: "/admin/users",
    },
  ];

  return (
    <>
      {user?.data?.role === "Admin" && (
        <>
          <Breadcrumb pages={pages} />

          <Typography variant="h4" fontWeight={400}>
            User Management
          </Typography>

          <Box className="user__search" sx={user__search}>
            <TextFieldCustom
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              label="Search"
              size="small"
              sx={{ minWidth: "10%" }}
              placeholder="name, email, address, identify,..."
              onChange={handleChange}
            />
            <Link to="add">
              <Button variant="contained" sx={{ width: "100px" }} startIcon={<AddIcon />}>
                Add
              </Button>
            </Link>
          </Box>

          <Box>
            {/* <UserList keyword={keyword} /> */}
            <UserDataList keyword={keyword} />
          </Box>
        </>
      )}
    </>
  );
}

export default UserManagement;
