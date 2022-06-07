import React from "react";
import {
  Box,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,  
  Stack,
} from "@mui/material";

import {
  selectLoading,
  selectOrderData,
  selectOrderPagination,
} from "../../../../store/orders/selector";

import {
  CustomizedTableHead,
  CustomPagination,
} from "../../../../styles/styled_components/styledComponent";
import {
  actDeleteOrder,
  actGetOrder,
  actGetOrderPagination,
} from "../../../../store/orders/action";
import { useSelector, useDispatch } from "react-redux";
import DoneIcon from "@mui/icons-material/Done";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import ErrorIcon from "@mui/icons-material/Error";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Loading from "../../../../components/loading/Loading";
import { selectUserData } from "../../../../store/users/selector";
import { actGetUser } from "../../../../store/users/actions";
import { getOrderDetail, openModal } from "../../../../store/orders/orderSlice";

export default function OrderTable({ keyword }) {
  const dispatch = useDispatch();
  const listOrder = useSelector(selectOrderData);
  const loading = useSelector(selectLoading);
  const userList = useSelector(selectUserData);
  const orderDataPagination = useSelector(selectOrderPagination);
  const [page, setPage] = React.useState(1);
  const ROWS_PER_PAGE = 10;
  const orderList = keyword
    ? listOrder?.filter((order) => order.id.toLowerCase().indexOf(keyword?.toLowerCase()) !== -1)
    : orderDataPagination;

  // HANDLE GET ORDER DETAIL
  const handleGetOrderDetail = (order) => {
    dispatch(openModal());
    dispatch(getOrderDetail(order));
  };

  // HANDLE DETELE ORDER
  const handleDeleteOrder = (orderId) => dispatch(actDeleteOrder(orderId));

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

  //GET ORDER DATA PAGINATION
  React.useEffect(() => {
    dispatch(actGetOrderPagination(page, ROWS_PER_PAGE));
  }, [page]);

  //GET USER DATA,ORDER DATA
  React.useEffect(() => {
    dispatch(actGetOrder());
    dispatch(actGetUser());
  }, []);

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
        <Box component={Paper} elevation={2} padding={2} sx={{ backgroundColor: "#E7EBF0" }}>
          <TableContainer
            sx={{
              maxHeight: "100vh",
            }}
          >
            <Table
              stickyHeader
              aria-label="sticky table"
              size="small"
              sx={{ minWidth: "110%", backgroundColor: "#fff" }}
            >
              <CustomizedTableHead>
                <TableRow>
                  <TableCell>Order ID</TableCell>
                  <TableCell>User ID</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Delivery place</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell width="150px">Status</TableCell>
                  <TableCell></TableCell>
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
