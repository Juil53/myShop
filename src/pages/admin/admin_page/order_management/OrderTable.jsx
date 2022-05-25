import React from "react";
import {
  Box,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { CustomPagination } from "../../../../styles/styled_components/styledComponent";
import { actGetOrder } from "../../../../store/orders/action";
import { useSelector, useDispatch } from "react-redux";
import DoneIcon from "@mui/icons-material/Done";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import ErrorIcon from "@mui/icons-material/Error";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import MoreVertIcon from "@mui/icons-material/MoreVert";

function OrderTable() {
  const dispatch = useDispatch();
  const listOrder = useSelector((state) => state.order.orderData);

  //NumberFormatter
  const formatter = new Intl.NumberFormat('vn-VN',{
    style:'currency',
    currency:'VND'
  })

  //StatusColor
  const statusColors = {
    Successed: "#689f38",
    Pending: "#0288d1",
    Failed: "#c2185b",
  };

  //StatusIcon
  const statusIcon = (status) => {
    switch (status) {
      case "Successed":
        return (
          <DoneIcon
            fontSize="small"
            sx={{ verticalAlign: "middle",marginRight:1 }}
          />
        );
      case "Pending":
        return (
          <AutorenewIcon
            fontSize="small"
            sx={{ verticalAlign: "middle",marginRight:1 }}
          />
        );
      case "Failed":
        return (
          <ErrorIcon
            fontSize="small"
            sx={{ verticalAlign: "middle",marginRight:1 }}
          />
        );
      default:
        break;
    }
  };

  // Table config
  const [page, setPage] = React.useState(1);
  const handleChangePage = (event, newPage) => setPage(newPage);

  // Get Order Data
  const rowsPerPage = 10;
  React.useEffect(() => {
    dispatch(actGetOrder());
  }, []);

  //renderTableHead
  const tableHead = ["ID","Delivery place", "Date", "Price", "Status", ""];

  //renderTableBody
  const renderTableHead = () => {
    return tableHead.map((column, index) => {
      return (
        <TableCell key={index} align="left">
          {column}
        </TableCell>
      );
    });
  };

  const renderTableBody = () => {
    return listOrder?.map((order, index) => {
      return (
        <TableRow
          key={index}
          hover={true}
          sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
        >
          <TableCell align="left">{order.id}</TableCell>
          <TableCell sx={{ fontWeight: 500 }}>
            <LocationOnIcon
              fontSize="small"
              color="secondary"
              sx={{ verticalAlign: "middle" }}
            />
            {order.address.location}
          </TableCell>
          <TableCell align="left">{order.date}</TableCell>
          <TableCell align="left">{formatter.format(order.totalAfterDiscount)}</TableCell>

          <TableCell
            align="left"
            sx={{
              color: statusColors[order.status] ?? "#000",
              fontWeight: 700,
            }}
          >
            {statusIcon(order.status)}
            {order.status}
          </TableCell>

          <TableCell align="right">
            <IconButton color="secondary">
              <MoreVertIcon fontSize="inherit" />
            </IconButton>
          </TableCell>
        </TableRow>
      );
    });
  };

  return (
    <Box>
      <TableContainer>
        <Table sx={{ minWidth: 650 }} aria-label="simple table" size="small">
          <TableHead>
            <TableRow hover={true}>{renderTableHead()}</TableRow>
          </TableHead>
          <TableBody>{renderTableBody()}</TableBody>
        </Table>
        <Box sx={{ textAlign: "center" }}>
          <CustomPagination
            showFirstButton
            showLastButton
            page={page}
            count={100}
            onChange={handleChangePage}
            sx={{ mt: 5 }}
            size="small"
            shape="rounded"
            variant="outlined"
          />
        </Box>
      </TableContainer>
    </Box>
  );
}

export default OrderTable;
