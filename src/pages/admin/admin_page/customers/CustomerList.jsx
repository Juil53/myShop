import { Box, Button, Paper, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { db } from "../../../../service/auth";

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
            {params.row.rank}
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
            <Link to="/admin/customers/1">
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

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "customers", id));
      setRows(rows.filter((item) => item.id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const list = [];
      try {
        const querySnapshot = await getDocs(collection(db, "customers"));
        querySnapshot.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        });
        setRows(list);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  // const handleCheck = (rows, data) => {
  //   rows.map((row) => {
  //     let id = row.id.toString();
  //     let indexItem = data.findIndex((item) => item.id === id);
  //     return data.splice(indexItem, 1);
  //   });
  // };

  return (
    <Box component={Paper} elevation={2} style={style.table}>
      <DataGrid
        rows={rows}
        columns={columns.concat(columnActions)}
        pageSize={11}
        rowsPerPageOptions={[11]}
        checkboxSelection
      />
    </Box>
  );
}
