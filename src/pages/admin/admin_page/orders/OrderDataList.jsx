import DeleteIcon from "@mui/icons-material/Delete";
import { Box, Button, Grid, IconButton, Paper, Typography } from "@mui/material";
import {
  DataGrid,
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarDensitySelector,
  GridToolbarExport,
  GridToolbarFilterButton,
} from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SimpleSnackbar from "../../../../components/admin/SimpleSnackbar";
import Loading from "../../../../components/loading/Loading";
import {
  deleteOrderRequest,
  getOrderDetail,
  getOrderRequest,
  openModal,
  resetStatus,
} from "../../../../store/orders/orderSlice";
import { selectLoading, selectOrderData, selectStatus } from "../../../../store/orders/selector";
import { formatter } from "../../../../utils";
import OrderDelete from "./OrderDelete";

const style = {
  table: { height: "70vh", width: "100%", marginTop: "2rem" },
  btnView: { color: "darkblue", border: "1px dotted rgba(0, 0, 139, 0.596)", padding: 0 },
  btnDelete: { color: "crimson", border: "1px dotted rgba(255, 0, 0, 0.596)", padding: 0 },
  image: {
    objectFit: "contain",
    width: "100%",
    height: "100%",
  },
  cellStatus: {
    width: "100%",
    textAlign: "center",
    "&.Successed": {
      backgroundColor: "rgba(0, 128, 0, 0.2)",
      color: "green",
    },
    "&.Pending": {
      backgroundColor: "rgba(218, 165, 32, 0.2)",
      color: "goldenrod",
    },
    "&.Failed": {
      backgroundColor: "rgba(255, 0, 0, 0.2)",
      color: "crimson",
    },
  },
};

const OrderDataList = () => {
  const dispatch = useDispatch();
  const orders = useSelector(selectOrderData);
  const loading = useSelector(selectLoading);
  const deleteStatus = useSelector(selectStatus);
  const [show, setShow] = useState(false);
  const [arrIds, setArrIds] = useState([]);


  const columns = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "email", headerName: "Email", width: 200 },
    {
      field: "address",
      headerName: "Address",
      width: 300,
      renderCell: (params) => {
        return <Typography>{params.row.address.location}</Typography>;
      },
    },
    { field: "date", headerName: "Date", width: 200 },
    {
      field: "phone",
      headerName: "Phone Number",
      width: 150,
      renderCell: (params) => {
        return <Typography>{params.row.address.phone}</Typography>;
      },
    },
    {
      field: "price",
      headerName: "Price",
      width: 150,
      renderCell: (params) => {
        return <Typography>{formatter.format(params.row.totalAfterDiscount)}</Typography>;
      },
    },
    {
      field: "status",
      headerName: "Status",
      width: 150,
      renderCell: (params) => {
        return (
          <Typography className={`${params.row.status}`} sx={style.cellStatus}>
            {params.row.status}
          </Typography>
        );
      },
    },
  ];

  const columnActions = [
    {
      field: "action",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => {
        return (
          <Box sx={{ display: "flex", gap: "5px" }}>
            <Button sx={style.btnView} onClick={() => handleGetOrderDetail(params.row)}>
              View
            </Button>
            <OrderDelete orderId={params.row.id} order={params.row} style={style} />
          </Box>
        );
      },
    },
  ];

  //add header density,filter,export,column
  const CustomToolbar = () => {
    return (
      <Grid container justifyContent="space-between" mb={1}>
        <GridToolbarContainer>
          <GridToolbarColumnsButton />
          <GridToolbarFilterButton />
          <GridToolbarDensitySelector />
          <GridToolbarExport />
        </GridToolbarContainer>
        <IconButton
          onClick={() => {
            // handleDeleteSelected(arrIds);
          }}
        >
          <DeleteIcon color="error" />
        </IconButton>
      </Grid>
    );
  };

  // const handleDeleteSelected = (ids) => {};

  const handleGetOrderDetail = (order) => {
    dispatch(openModal());
    dispatch(getOrderDetail(order));
  };

  useEffect(() => {
    dispatch(getOrderRequest());
  }, []);

  useEffect(() => {
    if (deleteStatus) {
      setShow(true);
    }
  }, [deleteStatus]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <Box component={Paper} elevation={2} style={style.table}>
          <DataGrid
            textAlign="center"
            rows={orders || []}
            columns={columns.concat(columnActions)}
            density="compact"
            autoPageSize
            checkboxSelection
            disableSelectionOnClick
            onSelectionModelChange={(ids) => {
              setArrIds(ids);
            }}
            components={{
              Toolbar: CustomToolbar,
            }}
          />
        </Box>
      )}
      <SimpleSnackbar show={show} setShow={setShow} type="delete" />
    </>
  );
};

export default OrderDataList;
