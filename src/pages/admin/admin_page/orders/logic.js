import { Grid, Typography } from "@mui/material";
import {
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarDensitySelector,
  GridToolbarExport,
  GridToolbarFilterButton
} from "@mui/x-data-grid";
import { formatter } from "../../../../utils";

export const style = {
  productSearch: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "2rem",
    marginBottom: "2rem",
  },
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
    "&.Successful": {
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
  cellShipping: {
    width: "100%",
    textAlign: "center",
    backgroundColor: "rgba(163, 227, 52, 0.2)",
    color: "green",
    "&.Tiki": {
      backgroundColor: "rgba(0, 0, 139, 0.2)",
      color: "blue",
    },
    "&.Shopee": {
      backgroundColor: "rgba(227, 85, 52, 0.2)",
      color: "orange",
    },
  },
};

export const columns = [
  { field: "id", headerName: "Order ID", width: 100 },
  {
    field: "name",
    headerName: "Name",
    width: 200,
    renderCell: (params) => {
      return <Typography>{params.row.deliveryAddress.name}</Typography>;
    },
  },
  { field: "email", headerName: "Email", width: 200 },
  {
    field: "deliveryAddress",
    headerName: "Address",
    headerAlign: "center",
    width: 400,
    renderCell: (params) => {
      return (
        <Typography>
          {params.row.deliveryAddress.address.detail}{" "}
          {params.row.deliveryAddress.address.district.name}{" "}
          {params.row.deliveryAddress.address.region.name}{" "}
          {params.row.deliveryAddress.address.ward.name}
        </Typography>
      );
    },
  },
  { field: "date", headerName: "Date", width: 250, align: "center", headerAlign: "center" },
  {
    field: "phone",
    headerName: "Phone Number",
    width: 200,
    renderCell: (params) => {
      return <Typography>{params.row.deliveryAddress.phoneNumber}</Typography>;
    },
  },
  {
    field: "shippingMethod",
    headerName: "Shipping",
    width: 200,
    align: "center",
    headerAlign: "center",
    renderCell: (params) => {
      return (
        <Typography sx={style.cellShipping}>
          {params.row.shippingMethod.shippingMethod || "Pay when received"}
        </Typography>
      );
    },
  },
  {
    field: "totalAmount",
    headerName: "Price",
    width: 100,
    align: "center",
    headerAlign: "center",
    renderCell: (params) => {
      return <Typography>{formatter.format(params.row.totalAmount)}</Typography>;
    },
  },
  {
    field: "status",
    headerName: "Status",
    headerAlign: "center",
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

//add header density,filter,export,column
export const CustomToolbar = () => {
  return (
    <Grid container justifyContent="space-between" mb={1}>
      <GridToolbarContainer sx={{ marginLeft: "1rem" }}>
        <GridToolbarColumnsButton />
        <GridToolbarFilterButton />
        <GridToolbarDensitySelector />
        <GridToolbarExport />
      </GridToolbarContainer>
    </Grid>
  );
};

//HandleSearch
const keys = ["email", "address", "id"];
export const handleSearch = (data, keyword) =>
  data?.filter((item) => keys.some((key) => item[key]?.toLowerCase().includes(keyword)));
