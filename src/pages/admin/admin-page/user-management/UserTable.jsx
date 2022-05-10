import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Box, IconButton, Pagination } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  actDeleteUser,
  actGetUser,
  actGetUserInfo,
  actGetUserPagination,
} from "../../../../store/users/actions";
import { styled } from "@mui/material/styles";

const StyledPagination = styled(Pagination)(() => ({
  color: "#fff",
  "&.Mui-active": {
    backgroundColor: "red",
  },
}));

export function UserTable({ keyword }) {
  const dispatch = useDispatch();
  const rows = useSelector((state) => state.userReducer.userData);
  const count = rows ? Math.ceil(rows?.length / 10) : 0;
  const rowsPagination = useSelector(
    (state) => state.userReducer.userDataPagination
  );
  const paginationData = keyword
    ? rows?.filter(
        (user) =>
          user.email.toLowerCase().indexOf(keyword?.toLowerCase()) !== -1
      )
    : rowsPagination;

  //Get All User Data
  React.useEffect(() => {
    dispatch(actGetUser());
  }, []);

  //Handle Delete User
  const handleDelete = (userId) => dispatch(actDeleteUser(userId));

  //Handle Edit User
  const handleGetUserInfo = (user) => {
    dispatch({ type: "OPEN_MODAL" });
    dispatch(actGetUserInfo(user));
  };

  // Table config
  const [page, setPage] = React.useState(1);
  const handleChangePage = (event, newPage) => setPage(newPage);

  // Get User Data Pagination
  const rowsPerPage = 10;
  React.useEffect(() => {
    dispatch(actGetUserPagination(page, rowsPerPage));
  }, [page]);

  //renderTableHead
  const tableHead = [
    "First Name",
    "Last Name",
    "Email",
    "Password",
    "Phone number",
    "Role",
    "Actions",
  ];
  const renderTableHead = () => {
    return tableHead.map((column, index) => {
      return (
        <TableCell key={index} align="center">
          {column}
        </TableCell>
      );
    });
  };

  //renderTableBody
  const renderTableBody = () => {
    return paginationData?.map((user, index) => {
      return (
        <TableRow key={index}>
          <TableCell>{user.id}</TableCell>
          <TableCell align="center">{user.firstname}</TableCell>
          <TableCell align="center">{user.lastname}</TableCell>
          <TableCell align="center">{user.email}</TableCell>
          <TableCell align="center">{user.password}</TableCell>
          <TableCell align="center">{user.phonenumber}</TableCell>
          <TableCell align="center">{user.role}</TableCell>
          <TableCell align="center">
            <IconButton
              size="small"
              sx={{ color: "error.light" }}
              onClick={() => {
                window.alert("Are you sure?");
                handleDelete(user.id);
              }}
            >
              <DeleteIcon fontSize="inherit" />
            </IconButton>
            <IconButton
              size="small"
              sx={{ color: "info.dark" }}
              onClick={() => {
                handleGetUserInfo(user);
              }}
            >
              <EditIcon fontSize="inherit" />
            </IconButton>
          </TableCell>
        </TableRow>
      );
    });
  };

  const tablePc = (
    <TableContainer>
      <Table sx={{ minWidth: 650 }} aria-label="simple table" size="small">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            {renderTableHead()}
          </TableRow>
        </TableHead>
        <TableBody>{renderTableBody()}</TableBody>
      </Table>
      <Box sx={{ textAlign: "center" }}>
        <StyledPagination
          showFirstButton
          showLastButton
          page={page}
          count={count}
          onChange={handleChangePage}
          sx={{ mt: 5 }}
          size="small"
          shape="rounded"
          variant="outlined"
        />
      </Box>
    </TableContainer>
  );

  return <Box>{tablePc}</Box>;
}
