import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import { Box, Button, InputAdornment, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Breadcrumb from "../../../../components/breadcumb/BreadCumb";
import { loginAdmin, selectUserKeyword } from "../../../../store/users/selector";
import { getKeyword } from "../../../../store/users/usersSlice";
import { TextFieldCustom } from "../../../../styles/styled_components/styledComponent";
import { UserList } from "./UserList";

const user__search = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginTop: "2rem",
  marginBottom: "2rem",
};

function UserManagement() {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.user.loading);
  const user = useSelector(loginAdmin);
  const keyword = useSelector(selectUserKeyword);
  const handleChange = (event) => dispatch(getKeyword(event.target.value));

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

  const handleClearSeach = () => (
    (document.querySelector(".search__input").value = null), dispatch(getKeyword(null))
  );

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
              label="Search by Email..."
              size="small"
              sx={{ minWidth: "10%" }}
              onChange={handleChange}
            />
            <Link to="add">
              <Button
                variant="contained"
                color="secondary"
                sx={{ width: "100px" }}
                startIcon={<AddIcon />}
              >
                Add
              </Button>
            </Link>
          </Box>

          <Box>
            <UserList keyword={keyword} />
          </Box>
        </>
      )}
    </>
  );
}

export default UserManagement;
