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
  Modal,
  Typography,
  Grid,
  Divider,
  Paper,
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
import ArticleIcon from "@mui/icons-material/Article";
import Loading from "../../../../components/loading/Loading";
import { selectUserData } from "../../../../store/users/selector";
import { actGetUser } from "../../../../store/users/actions";
import { getOrderDetail, openModal } from "../../../../store/orders/orderSlice";

const style = {
  width: { xs: 600, md: 900, lg: "100%" },
  maxHeight: 500,
};

function OrderTable() {
  const dispatch = useDispatch();
  const listOrder = useSelector(selectOrderData);
  const loading = useSelector(selectLoading);
  const userList = useSelector(selectUserData);
  const orderDataPagination = useSelector(selectOrderPagination);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  const rowsPerPage = 10; // Get Order Data Pagination

  // HANDLE GET ORDER DETAIL
  const handleGetOrderDetail = (order) => {
    dispatch(openModal());
    dispatch(getOrderDetail(order));
  };

  // TABLE CONFIG
  const [page, setPage] = React.useState(1);
  const handleChangePage = (event, newPage) => setPage(newPage);
  const count = listOrder ? Math.ceil(listOrder?.length / 10) : 0;

  //STATUS COLOR
  const statusColors = {
    Successed: "#689f38",
    Pending: "#0288d1",
    Failed: "#c2185b",
  };

  //STATUS ICON
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

  //NUMBER FORMATTER
  const formatter = new Intl.NumberFormat("vn-VN", {
    style: "currency",
    currency: "VND",
  });

  // OPEN POPOVER
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // CLOSE POPOVER
  const handleClose = () => {
    setAnchorEl(null);
  };

  //GET ORDER DATA
  React.useEffect(() => {
    dispatch(actGetOrder());
  }, []);

  //GET ORDER DATA PAGINATION
  React.useEffect(() => {
    dispatch(actGetOrderPagination(page, rowsPerPage));
  }, [page]);

  //GET USER DATA
  React.useEffect(() => {
    dispatch(actGetUser());
  }, []);

  //RENDER USER EMAIL
  const renderEmail = (id) => {
    const user = userList?.find((user) => user.id === id);
    return user?.email;
  };

  //RENDER TABLE BODY
  const renderTableBody = () => {
    return orderDataPagination?.map((order, index) => {
      return (
        <TableRow
          key={index}
          hover={true}
          sx={{
            "&:last-child td, &:last-child th": { border: 0 },
            cursor: "pointer",
          }}
          onClick={() => {
            handleGetOrderDetail(order);
          }}
        >
          <TableCell align="left">{order.id}</TableCell>
          <TableCell align="left">{order.userId}</TableCell>
          <TableCell align="left">{renderEmail(order.userId)}</TableCell>
          <TableCell
            width="50px"
            style={{
              fontWeight: 500,
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
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
            width="100px"
          >
            {statusIcon(order.status)}
            {order.status}
          </TableCell>
          <TableCell align="right">
            <IconButton
              color="success"
              onClick={() => {
                handleGetOrderDetail(order);
              }}
            >
              <ArticleIcon fontSize="inherit" />
            </IconButton>
          </TableCell>
        </TableRow>
      );
    });
  };

  return (
    <>
      <Box>
        {loading ? (
          <Loading />
        ) : (
          <Box sx={{ textAlign: "-webkit-center" }}>
            <TableContainer
              component={Paper}
              elevation={2}
              sx={{
                ...style,
              }}
            >
              <Table
                sx={{ minWidth: 1000 }}
                aria-label="simple table"
                size="small"
                style={{ tableLayout: "fixed" }}
              >
                <TableHead>
                  <TableRow hover={true}>
                    <TableCell width="70px">Order ID</TableCell>
                    <TableCell width="80px">User ID</TableCell>
                    <TableCell width="250px">Email</TableCell>
                    <TableCell width="150px">Delivery place</TableCell>
                    <TableCell width="100px">Date</TableCell>
                    <TableCell width="100px">Price</TableCell>
                    <TableCell width="150px">Status</TableCell>
                    <TableCell width="50px"></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>{renderTableBody()}</TableBody>
              </Table>
            </TableContainer>

            <Box sx={{ textAlign: "center", marginBottom: 2 }}>
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
          </Box>
        )}
      </Box>
    </>
  );
}

export default OrderTable;
