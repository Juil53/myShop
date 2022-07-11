import AutorenewIcon from "@mui/icons-material/Autorenew";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import DoneIcon from "@mui/icons-material/Done";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import ErrorIcon from "@mui/icons-material/Error";
import LocationOnIcon from "@mui/icons-material/LocationOn";
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
import { getUserRequest } from "../../../../store/users/usersSlice";
import {
  CustomizedTableHead,
  CustomPagination
} from "../../../../styles/styled_components/styledComponent";
import { formatter } from "../../../../utils";

const style = {
  tableHead: {
    minWidth: { xs: "1400px", md: "110%" },
    backgroundColor: "#fff",
  },
  tableRow: {
    "&:last-child td, &:last-child th": { border: 0 },
    cursor: "pointer",
  },
  tableContainer: {
    maxHeight: "65vh",
  },
  tableCellEmail: {
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    maxWidth: "150px",
  },
  tableCellLocation: {
    fontWeight: 500,
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    maxWidth: "50px",
  },
  statusColors: {
    Successed: "#689f38",
    Pending: "#0288d1",
    Failed: "#c2185b",
  },
};

export default function OrderList({ keyword }) {
  const dispatch = useDispatch();
  const listOrder = useSelector(selectOrderData);
  const loading = useSelector(selectLoading);
  const orderDetail = useSelector(selectOrderDetail);
  const orderDataPagination = useSelector(selectOrderPagination);
  const [page, setPage] = React.useState(1);
  const ROWS_PER_PAGE = 10;
  const orderList = keyword
    ? listOrder?.filter((order) => order.email.toLowerCase().indexOf(keyword?.toLowerCase()) !== -1)
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
  }, [page, orderDetail]);

  // HANDLE DETELE ORDER
  const handleDeleteOrder = (orderId) => (
    dispatch({ type: "DELETE_ORDER", payload: orderId }),
    dispatch(getOrderPaginationRequest({ page, ROWS_PER_PAGE }))
  );

  // TABLE CONFIG
  const handleChangePage = (event, newPage) => setPage(newPage);
  const count = listOrder ? Math.ceil(listOrder?.length / 10) : 0;

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

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <Box component={Paper} elevation={3} p={2}>
          <TableContainer sx={style.tableContainer}>
            <Table stickyHeader size="small" sx={style.tableHead}>
              <CustomizedTableHead>
                <TableRow>
                  <TableCell width="10%">Order ID</TableCell>
                  <TableCell width="20%">Email</TableCell>
                  <TableCell width="20%">Delivery place</TableCell>
                  <TableCell width="10%">Date</TableCell>
                  <TableCell width="10%">Price</TableCell>
                  <TableCell width="15%">Status</TableCell>
                  <TableCell width="5%"></TableCell>
                </TableRow>
              </CustomizedTableHead>
              <TableBody>
                {orderList?.map((order, index) => {
                  return (
                    <TableRow key={index} hover={true} sx={style.tableRow}>
                      <TableCell align="left">{order.id}</TableCell>
                      <TableCell align="left" style={style.tableCellEmail}>
                        {order.email}
                      </TableCell>
                      <TableCell style={style.tableCellLocation}>
                        <LocationOnIcon
                          fontSize="small"
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
                          color: style.statusColors[order.status] ?? "#000",
                          fontWeight: 700,
                        }}
                      >
                        {statusIcon(order.status)}
                        {order.status}
                      </TableCell>
                      <TableCell align="center">
                        <Stack direction="row">
                          <IconButton
                            size="small"
                            onClick={() => {
                              handleGetOrderDetail(order);
                            }}
                          >
                            <EditOutlinedIcon />
                          </IconButton>
                          <IconButton
                            color="error"
                            size="small"
                            onClick={() => {
                              handleDeleteOrder(order.id);
                            }}
                          >
                            <DeleteOutlineOutlinedIcon />
                          </IconButton>
                        </Stack>
                      </TableCell>
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
