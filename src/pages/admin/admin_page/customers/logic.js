import { Grid, Typography } from "@mui/material";
import {
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarDensitySelector,
  GridToolbarExport,
  GridToolbarFilterButton,
} from "@mui/x-data-grid";
const keys = ["displayName", "email", "homeAddress", "id"];

export const style = {
  table: { height: "70vh", width: "100%", margin: "2rem 0" },
  btnView: { color: "darkblue", border: "1px dotted rgba(0, 0, 139, 0.596)", padding: 0 },
  btnDelete: { color: "crimson", border: "1px dotted rgba(255, 0, 0, 0.596)", padding: 0 },
  image: {
    objectFit: "cover",
    width: "100%",
    height: "100%",
  },
  img: { width: "150px", height: "150px", objectFit: "cover", borderRadius: "50%" },
  cellStatus: {
    width: "100%",
    textAlign: "center",
    "&.silver": {
      backgroundColor: "rgba(0, 128, 0, 0.2)",
      color: "green",
    },
    "&.gold": {
      backgroundColor: "rgba(218, 165, 32, 0.2)",
      color: "goldenrod",
    },
    "&.diamond": {
      backgroundColor: "#539ec633",
      color: "blue",
    },
  },
  container: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "2rem",
    marginBottom: "2rem",
  },
  information: {
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
};

export const pages = [
  {
    name: "Admin",
    url: "/admin",
  },
  {
    name: "Customers",
    url: "/admin/customers",
  },
];

//Data columns
export const columns = [
  { field: "id", headerName: "ID" },
  {
    field: "image",
    headerName: "Avatar",
    width: 100,
    renderCell: (params) => {
      return (
        <div>
          <img src={params.row.image} style={style.image} />
        </div>
      );
    },
  },
  { field: "displayName", headerName: "Full Name", flex: 1.5 },
  { field: "email", headerName: "Email", flex: 1 },
  { field: "phoneNumber", headerName: "Phone Number", flex: 1 },
  {
    field: "address",
    headerName: "Address",
    width: 250,
    renderCell: (params) => {
      return <Typography>{params.row.homeAddress}</Typography>;
    },
  },
  {
    field: "timeStamp",
    headerName: "Created At",
    width: 150,
    renderCell: (params) => {
      return <Typography>{params.row.timeStamp}</Typography>;
    },
  },
  {
    field: "rank",
    headerName: "Rank",
    headerAlign: "center",
    width: 100,
    renderCell: (params) => {
      return (
        <Typography className={`${params.row.rank}`} sx={style.cellStatus}>
          {params.row.rank?.toUpperCase()}
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
export const handleSearch = (data, keyword) => {
  return data?.filter((item) => keys.some((key) => item[key]?.toLowerCase().includes(keyword)));
};
