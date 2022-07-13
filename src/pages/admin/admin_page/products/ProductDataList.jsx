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
import { deleteUser } from "firebase/auth";
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loading from "../../../../components/loading/Loading";
import { db, user } from "../../../../service/auth";
import { formatter } from "../../../../utils";

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

export default function ProductDataList() {
  const [rows, setRows] = useState([]);
  const [arrIds, setArrIds] = useState([]);
  const [loading, setLoading] = useState(true);

  console.log(rows);

  const columns = [
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
    },
    { field: "name", headerName: "Product Name", flex: 2.5 },
    { field: "desc", headerName: "Description", flex: 2 },
    { field: "brand", headerName: "Brand", flex: 1.2 },
    { field: "available", headerName: "Quantity", flex: 0.8 },
    {
      field: "priceBeforeDiscount",
      headerName: "Price",
      renderCell: (params) => {
        return <Typography>{formatter.format(params.row.priceBeforeDiscount)}</Typography>;
      },
    },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
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
      flex: 1,
      renderCell: (params) => {
        return (
          <Box sx={{ display: "flex", gap: "5px" }}>
            <Link to={`/admin/customers/${params.row.id}`}>
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

  //add header density,filter,export,column
  const CustomToolbar = () => {
    return (
      <Grid container justifyContent="space-between" mb={1}>
        <GridToolbarContainer sx={{ marginLeft: "1rem" }}>
          <GridToolbarColumnsButton />
          <GridToolbarFilterButton />
          <GridToolbarDensitySelector />
          <GridToolbarExport />
        </GridToolbarContainer>
        <IconButton
          onClick={() => {
            handleDeleteSelected(arrIds);
          }}
        >
          <DeleteIcon color="error" />
        </IconButton>
      </Grid>
    );
  };

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "customers", id));

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

  const handleDeleteSelected = (ids) => {
    try {
      for (let id of ids) {
        deleteDoc(doc(db, "customers", id));
      }

      setRows(rows.filter((row) => !arrIds.includes(row.id)));
    } catch (error) {
      console.log(error);
    }
  };

  //call docs from collection
  useEffect(() => {
    const fetchData = async () => {
      const list = [];
      try {
        const querySnapshot = await getDocs(collection(db, "products"));
        console.log(querySnapshot);
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
            rows={rows}
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
            }}
          />
        </Box>
      )}
    </>
  );
}
