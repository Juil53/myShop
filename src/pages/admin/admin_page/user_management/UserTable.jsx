import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
  Box,
  IconButton,
  Paper,
  Popover,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loading from "../../../../components/loading/Loading";
import {
  selectLoading,
  selectUserData,
  selectUserDataPagination,
  selectUserInfo,
} from "../../../../store/users/selector";
import { getUserPaginationRequest, getUserRequest } from "../../../../store/users/usersSlice";
import {
  CustomizedTableHead,
  CustomPagination,
} from "../../../../styles/styled_components/styledComponent";
import SimpleSnackbar from "../component/MuiSnackbar";

export function UserTable({ keyword }) {
  const navigate = useNavigate();
  const ROWS_PER_PAGE = 10;
  const dispatch = useDispatch();
  const loading = useSelector(selectLoading);
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
    dispatch(getUserPaginationRequest({ page, rowPerPage: ROWS_PER_PAGE }));
  };

  React.useEffect(() => {
    dispatch(getUserPaginationRequest({ page, rowPerPage: ROWS_PER_PAGE }));
    dispatch(getUserRequest());
  }, [page, userInfo]);

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  // RENDER TABLE BODY
  const renderTableBody = () => {
    return paginationData?.map((user, index) => {
      return (
        <TableRow
          key={index}
          hover={true}
          sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
        >
          <TableCell align="left">
            <IconButton aria-describedby={id} variant="contained" onClick={handleClick}>
              <MoreVertIcon />
            </IconButton>
            <Popover
              elevation={1}
              id={id}
              open={open}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
            >
              <Stack spacing={1}>
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
                    handleDelete(user.id);
                  }}
                >
                  <DeleteIcon fontSize="inherit" />
                </IconButton>
              </Stack>
            </Popover>
          </TableCell>

          <TableCell align="left">
            <img
              src={user.avatar ? user.avatar : "/img/default_avatar.png"}
              alt=""
              style={{ width: "30px", height: "30px", borderRadius: "50%" }}
            />
          </TableCell>
          <TableCell align="left">{user.id ? user.id : "_"}</TableCell>
          <TableCell align="left">{user.firstname ? user.firstname : "_"}</TableCell>
          <TableCell align="left">{user.lastname ? user.lastname : "_"}</TableCell>
          <TableCell align="left">{user.identify ? user.identify : "_"}</TableCell>
          <TableCell align="left">{user.gender ? user.gender : "_"}</TableCell>
          <TableCell align="left">{user.email ? user.email : "_"}</TableCell>
          <TableCell align="left">{user.education ? user.education : "_"}</TableCell>
          <TableCell align="left">{user.address ? user.address : "_"}</TableCell>
          <TableCell align="left">{user.phonenumber ? user.phonenumber : "_"}</TableCell>
          <TableCell align="left">{user.role ? user.role : "_"}</TableCell>
        </TableRow>
      );
    });
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <Box component={Paper} elevation={3} p={2}>
          <TableContainer
            sx={{
              maxHeight: "65vh",
            }}
          >
            <Table
              stickyHeader
              aria-label="sticky table"
              size="small"
              sx={{ minWidth: { xs: "130%", md: "150%" }, backgroundColor: "#fff" }}
            >
              <CustomizedTableHead>
                <TableRow>
                  <TableCell align="left"></TableCell>
                  <TableCell align="left">Avatar</TableCell>
                  <TableCell align="left">User ID</TableCell>
                  <TableCell align="left">First Name</TableCell>
                  <TableCell align="left">Last Name</TableCell>
                  <TableCell align="left">Identify</TableCell>
                  <TableCell align="left">Gender</TableCell>
                  <TableCell align="left">Email</TableCell>
                  <TableCell align="left">Education</TableCell>
                  <TableCell align="left">Address</TableCell>
                  <TableCell align="left">Phone number</TableCell>
                  <TableCell align="left">Role</TableCell>
                </TableRow>
              </CustomizedTableHead>
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
          {/* <SimpleSnackbar openSnackbar={open} /> */}
        </Box>
      )}
    </>
  );
}
