import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserInfo, openModal } from "../../../../store/users/usersSlice";
import { actDeleteUser, actGetUser, actGetUserPagination } from "../../../../store/users/actions";
import { selectUserData, selectUserDataPagination } from "../../../../store/users/selector";
import { CustomPagination } from "../../../../styles/styled_components/styledComponent";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Loading from "../../../../components/loading/Loading";
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

export function UserTable({ keyword }) {
  const ROWS_PER_PAGE = 10;
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.user.loading);
  const rows = useSelector(selectUserData);
  const count = rows ? Math.ceil(rows?.length / 10) : 0;
  const rowsPagination = useSelector(selectUserDataPagination);
  const [page, setPage] = React.useState(1);
  const paginationData = keyword
    ? rows?.filter((user) => user.email.toLowerCase().indexOf(keyword?.toLowerCase()) !== -1)
    : rowsPagination;

  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleDelete = (userId) => dispatch(actDeleteUser(userId));

  const handleGetUserInfo = (user) => {
    dispatch(openModal());
    dispatch(getUserInfo(user));
  };

  React.useEffect(() => {
    dispatch(actGetUser());
    dispatch(actGetUserPagination(page, ROWS_PER_PAGE));
  }, [page]);

  // RENDER TABLE HEAD
  const tableHead = ["First Name", "Last Name", "Email", "Phone number", "Role", ""];
  const renderTableHead = () => {
    return tableHead.map((column, index) => {
      return (
        <TableCell key={index} align="center">
          {column}
        </TableCell>
      );
    });
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
          <TableCell>{user.id}</TableCell>
          <TableCell align="center">{user.firstname}</TableCell>
          <TableCell align="center">{user.lastname}</TableCell>
          <TableCell align="center">{user.email}</TableCell>
          <TableCell align="center">{user.phonenumber}</TableCell>
          <TableCell align="center">{user.role}</TableCell>
          <TableCell align="center">
            <IconButton
              size="small"
              color="secondary"
              onClick={() => {
                handleGetUserInfo(user);
              }}
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
