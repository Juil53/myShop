import * as React from "react";
import { useDispatch, useSelector } from "react-redux";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Box, TablePagination } from "@mui/material";
import { actGetUser } from "../../../../store/services/userActions";
import { ThemeProvider, createTheme } from "@mui/material/styles";

import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

export const theme = createTheme({
  breakpoints: {
    values: {
      mobile: 0,
      tablet: 480,
      pc: 700,
    },
  },
});

export function UserTable() {
  const rows = useSelector((state) => state.userReducer.userData);
  console.log(rows);
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(actGetUser());
  }, []);

  // Table config
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const tableHead = [
    "First Name",
    "Last Name",
    "Email",
    "Password",
    "Phone number",
    "Role",
    "Actions",
  ];

  //renderTableHead
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
  const renderTable = () => {
    return rows?.map((user, index) => {
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
            <IconButton color="error">
              <DeleteIcon />
            </IconButton>
            <IconButton color="warning">
              <EditIcon />
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
        <TableBody>{renderTable()}</TableBody>
      </Table>
      <TablePagination
        component="div"
        page={page}
        count={100}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 20]}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </TableContainer>
  );

  return (
    <ThemeProvider theme={theme}>
      <Box>{tablePc}</Box>
    </ThemeProvider>
  );
}
