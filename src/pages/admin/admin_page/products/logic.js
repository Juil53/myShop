import { Button, Grid, Typography } from "@mui/material";
import { formatter } from "../../../../utils/index";
import {
  GridFooter,
  GridFooterContainer,
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarDensitySelector,
  GridToolbarExport,
  GridToolbarFilterButton,
} from "@mui/x-data-grid";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../../../service/auth";

const keys = ["name", "brand", "status"];

//HandleSearch
export const handleSearch = (data, keyword) => {
  return data.filter((item) => keys.some((key) => item[key].toLowerCase().includes(keyword)));
};

export const style = {
  table: { height: "80vh", width: "100%", margin: "2rem 0" },
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
    "&.Available": {
      backgroundColor: "rgba(0, 128, 0, 0.2)",
      color: "green",
    },
    "&.None": {
      backgroundColor: "rgba(255, 0, 0, 0.2)",
      color: "crimson",
    },
  },
};

export const columns = [
  { field: "id", headerName: "ID" },
  {
    field: "image",
    headerName: "Image",
    renderCell: (params) => {
      return (
        <div>
          <img src={params.row.image} style={style.image} />
        </div>
      );
    },
    width: 100,
  },
  { field: "name", headerName: "Product Name", width: 450 },
  { field: "desc", headerName: "Description", width: 300 },
  { field: "brand", headerName: "Brand", width: 250, align: "center", headerAlign: "center" },
  {
    field: "timeStamp",
    headerName: "Created At",
    width: 250,
    align: "center",
    headerAlign: "center",
  },
  { field: "available", headerName: "Quantity", width: 80, align: "center" },
  {
    field: "priceBeforeDiscount",
    headerName: "Price",
    headerAlign: "center",
    align: "right",
    width: 150,
    renderCell: (params) => {
      return <Typography>{formatter.format(params.row.priceBeforeDiscount)}</Typography>;
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

//Add header density,filter,export,column
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

//Delete selected rows
const handleDeleteSelected = (ids) => {
  try {
    for (let id of ids) {
      deleteDoc(doc(db, "products", id));
    }
  } catch (error) {
    console.log(error);
  }
  // dispatch(getAllProductRequest());
};

//Add footer delete selected rows button
export const CustomFooter = ({ arrIds }) => {
  return (
    <GridFooterContainer>
      <Button
        sx={{ display: arrIds?.length > 0 ? "block" : "none", ...style.btnDelete }}
        style={{ marginLeft: "2rem", padding: "5px" }}
        onClick={() => {
          handleDeleteSelected(arrIds);
        }}
      >
        Delete All Selected
      </Button>

      <GridFooter />
    </GridFooterContainer>
  );
};
