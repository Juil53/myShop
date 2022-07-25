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
import { style } from "./logic";

function UserManagement() {
  const [keyword, setKeyword] = useState("");
  const user = useSelector(loginAdmin);
  const handleChange = (event) => {
    setKeyword(event.target.value);
  };

  //Pages
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

          <Box className="user__search" sx={style.user__search}>
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
            <UserDataList keyword={keyword} />
          </Box>
        </>
      )}
    </>
  );
}

export default UserManagement;
