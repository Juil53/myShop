import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {
  Box,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loading from "../../../../components/loading/Loading";
import {
  selectUserData,
  selectUserDataPagination,
  selectUserInfo,
} from "../../../../store/users/selector";
import {
  getUserInfo,
  getUserPaginationRequest,
  getUserRequest,
  openModal,
} from "../../../../store/users/usersSlice";
import {
  CustomizedTableHead,
  CustomPagination,
} from "../../../../styles/styled_components/styledComponent";

export function UserTable({ keyword }) {
  const navigate = useNavigate()
  const ROWS_PER_PAGE = 10;
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.user.loading);
  const rows = useSelector(selectUserData);
  const count = rows ? Math.ceil(rows?.length / 10) : 0;
  const rowsPagination = useSelector(selectUserDataPagination);
  const userInfo = useSelector(selectUserInfo);
  const [page, setPage] = React.useState(1);
  const paginationData = keyword
    ? rows?.filter((user) => user.email.toLowerCase().indexOf(keyword?.toLowerCase()) !== -1)
    : rowsPagination;

  const handleChangePage = (event, newPage) => setPage(newPage);

  const handleDelete = (userId) => {
    dispatch({ type: "DELETE_USER", payload: userId });
    dispatch(getUserPaginationRequest({ page, ROWS_PER_PAGE }));
  };

  const handleGetUserInfo = (user) => {
    dispatch(openModal());
    dispatch(getUserInfo(user));
  };

  React.useEffect(() => {
    dispatch(getUserPaginationRequest({ page, ROWS_PER_PAGE }));
    dispatch(getUserRequest());
  }, [page, userInfo]);

  // RENDER TABLE HEAD
  const renderTableHead = () => {
    return (
      <CustomizedTableHead>
        <TableRow>
          <TableCell align="center">User ID</TableCell>
          <TableCell align="left">First Name</TableCell>
          <TableCell align="left">Last Name</TableCell>
          <TableCell align="left">Email</TableCell>
          <TableCell align="center">Phone number</TableCell>
          <TableCell align="center">Role</TableCell>
          <TableCell align="center"></TableCell>
        </TableRow>
      </CustomizedTableHead>
    );
  };

  // RENDER TABLE BODY
  const renderTableBody = () => {
    return paginationData?.map((user, index) => {
      return (
        <TableRow
          key={index}
          hover={true}
          sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
        >
          <TableCell align="center">{user.id}</TableCell>
          <TableCell align="left">{user.firstname}</TableCell>
          <TableCell align="left">{user.lastname}</TableCell>
          <TableCell align="left">{user.email}</TableCell>
          <TableCell align="center">{user.phonenumber}</TableCell>
          <TableCell align="center">{user.role}</TableCell>
          <TableCell align="center">
            <IconButton
              size="small"
              color="secondary"
              onClick={() => navigate(`/admin/users/edit/${user.id}`)}
            >
              <EditIcon fontSize="inherit" />
            </IconButton>
            <IconButton
              size="small"
              color="error"
              onClick={() => {
                window.alert("Are you sure?");
                handleDelete(user.id);
              }}
            >
              <DeleteIcon fontSize="inherit" />
            </IconButton>
          </TableCell>
        </TableRow>
      );
    });
  };

  const tablePc = (
    <Box component={Paper} elevation={2} padding={2} sx={{ backgroundColor: "#E7EBF0" }}>
      <TableContainer
        sx={{
          maxHeight: "100vh",
          width: "100%",
        }}
      >
        <Table
          stickyHeader
          aria-label="sticky table"
          size="small"
          sx={{ minWidth: "110%", backgroundColor: "#fff" }}
        >
          {renderTableHead()}
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
