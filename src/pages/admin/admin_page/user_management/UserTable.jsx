import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserInfo, openModal } from "../../../../store/users/usersSlice";
import {
  Box,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import {
  actDeleteUser,
  actGetUser,
  actGetUserPagination,
} from "../../../../store/users/actions";
import {
  selectUserData,
  selectUserDataPagination,
} from "../../../../store/users/selector";
import { CustomPagination } from "../../../../styles/styled_components/styledComponent";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Loading from "../../../../components/loading/Loading";

export function UserTable({ keyword }) {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.user.loading);
  const rows = useSelector(selectUserData);
  const count = rows ? Math.ceil(rows?.length / 10) : 0;
  const rowsPagination = useSelector(selectUserDataPagination);
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
    dispatch(openModal());
    dispatch(getUserInfo(user));
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
    "Phone number",
    "Role",
    "",
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
        <TableRow
          key={index}
          hover={true}
          sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
        >
          <TableCell>{user.id}</TableCell>
          <TableCell align="center">{user.firstname}</TableCell>
          <TableCell align="center">{user.lastname}</TableCell>
          <TableCell align="center">{user.email}</TableCell>
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
    <Box
      component={Paper}
      elevation={2}
      padding={2}
      sx={{ backgroundColor: "#E7EBF0" }}
    >
      <TableContainer
        style={{ width: "100%" }}
        sx={{
          maxHeight: 450,
        }}
      >
        <Table
          stickyHeader
          aria-label="sticky table"
          size="small"
          sx={{ minWidth: "110%", backgroundColor: "#fff" }}
        >
          <TableHead>
            <TableRow hover={true}>
              <TableCell>ID</TableCell>
              {renderTableHead()}
            </TableRow>
          </TableHead>
          <TableBody>{renderTableBody()}</TableBody>
        </Table>
      </TableContainer>
      <CustomPagination
        showFirstButton
        showLastButton
        page={page}
        count={count}
        onChange={handleChangePage}
        sx={{ mt: 2 }}
        size="small"
        shape="rounded"
        variant="outlined"
      />
    </Box>
  );

  return <Box>{loading ? <Loading /> : tablePc}</Box>;
}
