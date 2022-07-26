import { Button, Grid, Typography } from "@mui/material";
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

const keys = ["firstname", "lastname", "email", "address", "identify"];

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
    "&.Staff": {
      backgroundColor: "rgba(0, 128, 0, 0.2)",
      color: "green",
    },
    "&.Admin": {
      backgroundColor: "rgba(218, 165, 32, 0.2)",
      color: "goldenrod",
    },
  },
  container: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    margin: "auto",
    padding: "2rem",
    bgcolor: "background.paper",
    boxShadow: 3,
    borderRadius: 2,
  },
  imgContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "25%",
    marginRight: 2,
    padding: 3,
  },
  img: {
    width: "250px",
    height: "250px",
    objectFit:'contain'
  },
  userForm: {
    width: "75%",
    padding: 3,
  },
  user__search: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "2rem",
    marginBottom: "2rem",
  },
};

//Roles
export const roles = [
  {
    value: "Staff",
    label: "Staff",
  },
  {
    value: "Admin",
    label: "Admin",
  },
];

//HandleSearch
export const handleSearch = (data, keyword) => {
  return data.filter((item) => keys.some((key) => item[key].toLowerCase().includes(keyword)));
};

//Delete selected rows
export const handleDeleteSelected = (ids) => {
  try {
    for (let id of ids) {
      deleteDoc(doc(db, "users", id));
    }
  } catch (error) {
    console.log(error);
  }
};

//Data table columns
export const columns = [
  { field: "id", headerName: "ID" },
  {
    field: "image",
    headerName: "Avatar",
    renderCell: (params) => {
      return (
        <div>
          <img src={params.row.avatar} style={style.image} />
        </div>
      );
    },
  },
  {
    field: "displayName",
    headerName: "Full Name",
    width: 200,
    valueGetter: (params) => `${params.row.firstname || ""} ${params.row.lastname || ""}`,
  },
  { field: "gender", headerName: "Gender", width: 100 },
  { field: "identify", headerName: "Identify Number", width: 150 },
  { field: "email", headerName: "Email", width: 200 },
  { field: "phonenumber", headerName: "Phone Number", width: 150 },
  { field: "education", headerName: "Education", width: 250 },
  { field: "address", headerName: "Address", width: 300 },
  {
    field: "role",
    headerName: "Role",
    headerAlign: "center",
    renderCell: (params) => {
      return (
        <Typography className={`${params.row.role}`} sx={style.cellStatus}>
          {params.row.role}
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

//Add footer delete Selected rows button
export const CustomFooter = ({ arrIds }) => {
  return (
    <GridFooterContainer>
      <Button
        sx={{ display: arrIds.length > 0 ? "block" : "none", ...style.btnDelete }}
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
