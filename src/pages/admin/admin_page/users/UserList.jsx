import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import {
  Box,
  IconButton,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow
} from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Loading from "../../../../components/loading/Loading";
import {
  selectLoading,
  selectUserData,
  selectUserDataPagination,
  selectUserInfo
} from "../../../../store/users/selector";
import {
  getUserPaginationRequest,
  getUserRequest,
  resetStatus
} from "../../../../store/users/usersSlice";
import {
  CustomizedTableHead,
  CustomPagination
} from "../../../../styles/styled_components/styledComponent";
import UserDelete from "./UserDelete";

const style = {
  tableContainer: { maxHeight: "65vh" },
  table: { minWidth: { xs: "1400px", md: "150%" }, backgroundColor: "#fff" },
  tableRow: { "&:last-child td, &:last-child th": { border: 0 } },
  img: { width: "30px", height: "30px", borderRadius: "50%" },
};

export function UserList({ keyword }) {
  const ROWS_PER_PAGE = 10;
  const dispatch = useDispatch();
  const loading = useSelector(selectLoading);
  const rows = useSelector(selectUserData);
  const count = rows ? Math.ceil(rows?.length / 10) : 0;
  const rowsPagination = useSelector(selectUserDataPagination);
  const userInfo = useSelector(selectUserInfo);
  const [page, setPage] = useState(1);
  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleResetStatus = () => dispatch(resetStatus());

  const paginationData = keyword
    ? rows?.filter((user) => user.email.toLowerCase().indexOf(keyword?.toLowerCase()) !== -1)
    : rowsPagination;

  useEffect(() => {
    dispatch(getUserPaginationRequest({ page, rowPerPage: ROWS_PER_PAGE }));
    dispatch(getUserRequest());
  }, [page, userInfo]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <Box component={Paper} elevation={3} p={2}>
          <TableContainer sx={style.tableContainer}>
            <Table stickyHeader aria-label="sticky table" size="small" sx={style.table}>
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
              <TableBody>
                {paginationData?.map((user, index) => {
                  return (
                    <TableRow key={index} hover={true} sx={style.tableRow}>
                      <TableCell align="left">
                        <Stack direction="row">
                          <UserDelete userId={user.id} user={user} page={page} />
                          <IconButton size="small" color="secondary">
                            <Link to={`/admin/users/edit/${user.id}`}>
                              <EditOutlinedIcon fontSize="inherit" />
                            </Link>
                          </IconButton>
                        </Stack>
                      </TableCell>
                      <TableCell align="left">
                        <img
                          src={user.avatar ? user.avatar : "/img/default_avatar.png"}
                          alt=""
                          style={style.img}
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
                      <TableCell align="left">
                        {user.phonenumber ? user.phonenumber : "_"}
                      </TableCell>
                      <TableCell align="left">{user.role ? user.role : "_"}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
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
            onClick={() => handleResetStatus()}
          />
        </Box>
      )}
    </>
  );
}
