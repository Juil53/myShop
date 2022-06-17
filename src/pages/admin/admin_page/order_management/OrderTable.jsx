import AutorenewIcon from "@mui/icons-material/Autorenew";
import DeleteIcon from "@mui/icons-material/Delete";
import DoneIcon from "@mui/icons-material/Done";
import EditIcon from "@mui/icons-material/Edit";
import ErrorIcon from "@mui/icons-material/Error";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import {
  Box,
  IconButton, Paper,
  Stack, Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow
} from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../../../components/loading/Loading";
import {
  getOrderDetail,
  getOrderPaginationRequest,
  getOrderRequest,
  openModal
} from "../../../../store/orders/orderSlice";
import {
  selectLoading,
  selectOrderData,
  selectOrderDetail,
  selectOrderPagination
} from "../../../../store/orders/selector";
import { selectUserData } from "../../../../store/users/selector";
import { getUserRequest } from "../../../../store/users/usersSlice";
import {
  CustomizedTableHead,
  CustomPagination
} from "../../../../styles/styled_components/styledComponent";

export default function OrderTable({ keyword }) {
  const dispatch = useDispatch();
  const listOrder = useSelector(selectOrderData);
  const loading = useSelector(selectLoading);
  const userList = useSelector(selectUserData);
  const orderDetail = useSelector(selectOrderDetail);
  const orderDataPagination = useSelector(selectOrderPagination);
  const [page, setPage] = React.useState(1);
  const ROWS_PER_PAGE = 20;
  const orderList = keyword
    ? listOrder?.filter((order) => order.id.toLowerCase().indexOf(keyword?.toLowerCase()) !== -1)
    : orderDataPagination;

  // HANDLE GET ORDER DETAIL
  const handleGetOrderDetail = (order) => {
    dispatch(openModal());
    dispatch(getOrderDetail(order));
  };

  //GET ORDER DATA PAGINATION
  React.useEffect(() => {
    dispatch(getOrderPaginationRequest({ page, ROWS_PER_PAGE }));
    dispatch(getOrderRequest());
    dispatch(getUserRequest());
  }, [page,orderDetail]);

  // HANDLE DETELE ORDER
  const handleDeleteOrder = (orderId) => (
    dispatch({ type: "DELETE_ORDER", payload: orderId }),
    dispatch(getOrderPaginationRequest({ page, ROWS_PER_PAGE }))
  );

  // TABLE CONFIG
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
        return <DoneIcon fontSize="small" sx={{ verticalAlign: "middle", marginRight: 1 }} />;
      case "Pending":
        return <AutorenewIcon fontSize="small" sx={{ verticalAlign: "middle", marginRight: 1 }} />;
      case "Failed":
        return <ErrorIcon fontSize="small" sx={{ verticalAlign: "middle", marginRight: 1 }} />;
      default:
        break;
    }
  };

  //NUMBER FORMATTER
  const formatter = new Intl.NumberFormat("vn-VN", {
    style: "currency",
    currency: "VND",
  });

  //RENDER USER EMAIL
  const renderEmail = (id) => {
    const user = userList?.find((user) => user.id === id);
    return user?.email;
  };

  //RENDER TABLE BODY
  const renderTableBody = () => {
    return orderList?.map((order, index) => {
      return (
        <TableRow
          key={index}
          hover={true}
          sx={{
            "&:last-child td, &:last-child th": { border: 0 },
            cursor: "pointer",
          }}
        >
          <TableCell align="left">{order.id}</TableCell>
          <TableCell align="left">{order.userId}</TableCell>
          <TableCell
            align="left"
            style={{
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              maxWidth: "150px",
            }}
          >
            {renderEmail(order.userId)}
          </TableCell>
          <TableCell
            style={{
              fontWeight: 500,
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              maxWidth: "50px",
            }}
          >
            <LocationOnIcon fontSize="small" color="secondary" sx={{ verticalAlign: "middle" }} />
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
          <TableCell align="center">
            <Stack direction="row">
              <IconButton
                color="secondary"
                size="small"
                onClick={() => {
                  handleGetOrderDetail(order);
                }}
              >
                <EditIcon />
              </IconButton>
              <IconButton
                color="error"
                size="small"
                onClick={() => {
                  handleDeleteOrder(order.id);
                }}
              >
                <DeleteIcon />
              </IconButton>
            </Stack>
          </TableCell>
        </TableRow>
      );
    });
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <Box component={Paper} elevation={2} padding={2} sx={{ backgroundColor: "#E7EBF0"}}>
          <TableContainer
            sx={{
              maxHeight: "65vh",
            }}
          >
            <Table
              stickyHeader
              size="small"
              sx={{ minWidth: { xs: "1400px", md: "110%" }, backgroundColor: "#fff" }}
            >
              <CustomizedTableHead>
                <TableRow>
                  <TableCell width="10%">Order ID</TableCell>
                  <TableCell width="10%">User ID</TableCell>
                  <TableCell width="20%">Email</TableCell>
                  <TableCell width="20%">Delivery place</TableCell>
                  <TableCell width="10%">Date</TableCell>
                  <TableCell width="10%">Price</TableCell>
                  <TableCell width="15%">Status</TableCell>
                  <TableCell width="5%"></TableCell>
                </TableRow>
              </CustomizedTableHead>
              <TableBody>{renderTableBody()}</TableBody>
            </Table>
          </TableContainer>

          <CustomPagination
            showFirstButton
            showLastButton
            page={page}
            count={count || 0}
            onChange={handleChangePage}
            sx={{ mt: 2 }}
            size="small"
            shape="rounded"
            variant="outlined"
          />
        </Box>
      )}
    </>
  );
}
