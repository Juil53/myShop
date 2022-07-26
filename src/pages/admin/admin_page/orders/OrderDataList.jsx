import { Box, Button, Paper } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SimpleSnackbar from "../../../../components/admin/SimpleSnackbar";
import Loading from "../../../../components/loading/Loading";
import {
  getOrderDetailRequest,
  getOrderRequest,
  openModal,
  resetStatus
} from "../../../../store/orders/orderSlice";
import { selectLoading, selectOrderData, selectStatus } from "../../../../store/orders/selector";
import { columns, CustomToolbar, handleSearch, style } from "./logic";
import OrderDelete from "./OrderDelete";
import OrderFooter from "./OrderFooter";

const OrderDataList = ({ keyword }) => {
  const dispatch = useDispatch();

  const orders = useSelector(selectOrderData);
  const loading = useSelector(selectLoading);
  const deleteStatus = useSelector(selectStatus);

  const [show, setShow] = useState(false);
  const [ids, setIds] = useState([]);
  const [severity, setSeverity] = useState({
    type: "",
    message: "",
  });

  const columnActions = [
    {
      field: "action",
      headerName: "Actions",
      width: 150,
      headerAlign: "center",
      renderCell: (params) => {
        return (
          <Box sx={{ display: "flex", gap: "5px" }}>
              <Button sx={style.btnView} onClick={() => handleGetOrderDetail(params.row)}>
                View
              </Button>
            <OrderDelete orderId={params.row.id} order={params.row} style={style} setSeverity={setSeverity}/>
          </Box>
        );
      },
    },
  ];

  const handleGetOrderDetail = (order) => {
    dispatch(openModal());
    dispatch(getOrderDetailRequest(order));
  };

  useEffect(() => {
    dispatch(getOrderRequest());
  }, []);

  useEffect(() => {
    dispatch(resetStatus());
    if (!deleteStatus) {
      setIds([]);
    }
  }, [deleteStatus]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <Box component={Paper} elevation={2} style={style.table}>
          <DataGrid
            rows={handleSearch(orders, keyword)}
            columns={columns.concat(columnActions)}
            density="compact"
            autoPageSize
            checkboxSelection
            disableSelectionOnClick
            onSelectionModelChange={(ids) => {
              setIds(ids);
            }}
            components={{
              Toolbar: CustomToolbar,
              Footer: OrderFooter,
            }}
            componentsProps={{ footer: { ids, setShow } }}
          />
        </Box>
      )}
      <SimpleSnackbar show={show} setShow={setShow} severity={severity} />
    </>
  );
};

export default OrderDataList;
