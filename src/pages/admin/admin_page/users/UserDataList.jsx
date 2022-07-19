import { Box, Button, Grid, Paper, Typography } from "@mui/material";
import {
  DataGrid,
  GridFooter,
  GridFooterContainer,
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarDensitySelector,
  GridToolbarExport,
  GridToolbarFilterButton,
} from "@mui/x-data-grid";
import { deleteUser } from "firebase/auth";
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loading from "../../../../components/loading/Loading";
import { db, user } from "../../../../service/auth";

const style = {
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
};

export default function UserDataList({ keyword }) {
  const [rows, setRows] = useState([]);
  const [arrIds, setArrIds] = useState([]);
  const [loading, setLoading] = useState(true);
  const keys = ["firstname", "lastname", "email", "address", "identify"];

  const columns = [
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

  const columnActions = [
    {
      field: "action",
      headerName: "Actions",
      width: 150,
      headerAlign: "center",
      renderCell: (params) => {
        return (
          <Box sx={{ display: "flex", gap: "5px" }}>
            <Link to={`/admin/users/edit/${params.row.id}`}>
              <Button sx={style.btnView}>View</Button>
            </Link>
            <Button sx={style.btnDelete} onClick={() => handleDelete(params.row.id)}>
              Delete
            </Button>
          </Box>
        );
      },
    },
  ];

  //Add header density,filter,export,column
  const CustomToolbar = () => {
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
  const CustomFooter = () => {
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

  //Delete 1 row
  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "users", id));

      deleteUser(user)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });

      setRows(rows.filter((item) => item.id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  //Delete selected rows
  const handleDeleteSelected = (ids) => {
    try {
      for (let id of ids) {
        deleteDoc(doc(db, "users", id));
      }

      setRows(rows.filter((row) => !arrIds.includes(row.id)));
    } catch (error) {
      console.log(error);
    }
  };

  //HandleSearch
  const handleSearch = (data) => {
    return data.filter((item) => keys.some((key) => item[key].toLowerCase().includes(keyword)));
  };

  //Call docs from collection
  useEffect(() => {
    const fetchData = async () => {
      const list = [];
      try {
        const querySnapshot = await getDocs(collection(db, "users"));
        querySnapshot.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        });
        setRows(list);
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <Box component={Paper} elevation={2} style={style.table}>
          <DataGrid
            rows={handleSearch(rows)}
            columns={columns.concat(columnActions)}
            density="compact"
            pageSize={10}
            rowsPerPageOptions={[10]}
            checkboxSelection
            disableSelectionOnClick
            onSelectionModelChange={(ids) => {
              setArrIds(ids);
            }}
            components={{
              Toolbar: CustomToolbar,
              Footer: CustomFooter,
            }}
          />
        </Box>
      )}
    </>
  );
}
