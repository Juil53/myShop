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
};

export default function CustomerList({ data }) {
  const [rows, setRows] = useState([]);
  const [arrIds, setArrIds] = useState([]);
  const [loading, setLoading] = useState(true);

  const columns = [
    { field: "id", headerName: "ID", width: 100 },
    {
      field: "img",
      headerName: "Avatar",
      width: 80,
      renderCell: (params) => {
        return (
          <div>
            <img src={params.row.img} style={style.image} />
          </div>
        );
      },
    },
    { field: "displayName", headerName: "Full Name", width: 180 },
    { field: "email", headerName: "Email", width: 350 },
    { field: "phoneNumber", headerName: "Phone Number", width: 150 },
    { field: "address", headerName: "Address", width: 250 },
    {
      field: "rank",
      headerName: "Rank",
      width: 90,
      renderCell: (params) => {
        return (
          <Typography className={`${params.row.rank}`} sx={style.cellStatus}>
            {params.row.rank?.toUpperCase()}
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

  const handleData = (importData) => {
    setRows([...rows, ...importData]);
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

  //reload page when import data
  useEffect(() => {
    if (data.length > 0) {
      handleData(data);
    }
  }, [data]);

  //call docs from collection
  useEffect(() => {
    const fetchData = async () => {
      const list = [];
      try {
        const querySnapshot = await getDocs(collection(db, "customers"));
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
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.539294211946!2d106.66230041512051!3d10.846525492274054!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317529baa7607279%3A0x50d512e271fd23c7!2zNDk3IFRo4buRbmcgTmjhuqV0LCBQaMaw4budbmcgMTYsIEfDsiBW4bqlcCwgVGjDoG5oIHBo4buRIEjhu5MgQ2jDrSBNaW5oLCBWaeG7h3QgTmFt!5e0!3m2!1svi!2s!4v1657274449598!5m2!1svi!2s"
        allowFullScreen="true"
        referrerPolicy="no-referrer-when-downgrade"
        loading="lazy"
        style={{
          width: "900px",
          height: "750px",
        }}
      ></iframe>
    </>
  );
}
