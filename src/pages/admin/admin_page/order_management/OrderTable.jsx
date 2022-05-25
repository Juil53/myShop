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
  Popover,
  Stack,
} from "@mui/material";

import {
  selectLoading,
  selectOrderData,
  selectOrderPagination,
} from "../../../../store/orders/selector";

import { CustomPagination } from "../../../../styles/styled_components/styledComponent";
import {
  actGetOrder,
  actGetOrderPagination,
} from "../../../../store/orders/action";
import { useSelector, useDispatch } from "react-redux";

import DoneIcon from "@mui/icons-material/Done";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import ErrorIcon from "@mui/icons-material/Error";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";
import ArticleIcon from '@mui/icons-material/Article';
import Loading from "../../../../components/loading/Loading";

function OrderTable() {
  const dispatch = useDispatch();
  const listOrder = useSelector(selectOrderData);
  const orderDataPagination = useSelector(selectOrderPagination);
  const loading = useSelector(selectLoading);
  const [anchorEl, setAnchorEl] = React.useState(null);

  // OPEN POPOVER
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // CLOSE POPOVER
  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  //NumberFormatter
  const formatter = new Intl.NumberFormat("vn-VN", {
    style: "currency",
    currency: "VND",
  });

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
            sx={{ verticalAlign: "middle", marginRight: 1 }}
          />
        );
      case "Pending":
        return (
          <AutorenewIcon
            fontSize="small"
            sx={{ verticalAlign: "middle", marginRight: 1 }}
          />
        );
      case "Failed":
        return (
          <ErrorIcon
            fontSize="small"
            sx={{ verticalAlign: "middle", marginRight: 1 }}
          />
        );
      default:
        break;
    }
  };

  // Table config
  const [page, setPage] = React.useState(1);
  const handleChangePage = (event, newPage) => setPage(newPage);
  const count = listOrder ? Math.ceil(listOrder?.length / 10) : 0;

  //Get Order Data
  React.useEffect(() => {
    dispatch(actGetOrder());
  }, []);

  // Get Order Data Pagination
  const rowsPerPage = 10;
  React.useEffect(() => {
    dispatch(actGetOrderPagination(page, rowsPerPage));
  }, [page]);

  //renderTableHead
  const tableHead = ["ID", "Delivery place", "Date", "Price", "Status", ""];

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
    return orderDataPagination?.map((order, index) => {
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
          <TableCell align="left">
            {formatter.format(order.totalAfterDiscount)}
          </TableCell>

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
            <IconButton
              color="secondary"
              aria-describedby={id}
              onClick={handleClick}
            >
              <MoreVertIcon fontSize="inherit" />
            </IconButton>
            <Popover
              id={id}
              elevation={1}
              open={open}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
            >
              <Stack spacing={1}>
                <IconButton color="error">
                  <DeleteOutlineOutlinedIcon fontSize="inherit" />
                </IconButton>
                <IconButton color="secondary">
                  <ModeEditOutlinedIcon fontSize="inherit" />
                </IconButton>
                <IconButton color="success">
                  <ArticleIcon fontSize="inherit" />
                </IconButton>
              </Stack>
            </Popover>
          </TableCell>
        </TableRow>
      );
    });
  };

  return (
    <Box>
      {loading ? (
        <Loading />
      ) : (
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
              count={count}
              onChange={handleChangePage}
              sx={{ mt: 5 }}
              size="small"
              shape="rounded"
              variant="outlined"
            />
          </Box>
        </TableContainer>
      )}
    </Box>
  );
}

export default OrderTable;
