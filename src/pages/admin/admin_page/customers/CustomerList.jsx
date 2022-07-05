import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Button, Paper, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getClientsRequest } from "../../../../store/clients/slice";
import { selectClients } from "../../../../store/clients/selector";

const cellStatus = {
  width: "100%",
  textAlign: "center",
  "&.Silver": {
    backgroundColor: "rgba(0, 128, 0, 0.2)",
    color: "green",
  },
  "&.Gold": {
    backgroundColor: "rgba(218, 165, 32, 0.2)",
    color: "goldenrod",
  },
  "&.Diamond": {
    backgroundColor: "#539ec633",
    color: "blue",
  },
};

const styleTable = { height: "80vh", width: "100%", margin: "2rem 0" };

export default function CustomerList({ data }) {
  const dispatch = useDispatch();
  const clients = useSelector(selectClients);
  const [rows, setRows] = useState([]);

  const columns = [
    { field: "id", headerName: "ID", width: 100 },
    {
      field: "image",
      headerName: "Avatar",
      width: 80,
      renderCell: (params) => {
        return (
          <div>
            <img
              src={params.row.image}
              style={{ objectFit: "contain", width: "100%", height: "100%" }}
            />
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
          <Typography className={`${params.row.rank}`} sx={cellStatus}>
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
      renderCell: () => {
        return (
          <Box sx={{ display: "flex", gap: "5px" }}>
            <Link to="/admin/customers/1">
              <Button
                sx={{
                  color: "darkblue",
                  border: "1px dotted rgba(0, 0, 139, 0.596)",
                  padding: 0,
                }}
              >
                View
              </Button>
            </Link>
            <Button color="error" sx={{ border: "1px dotted rgba(255, 0, 0, 0.596)", padding: 0 }}>
              Delete
            </Button>
          </Box>
        );
      },
    },
  ];

  const handleCheck = (rows, data) => {
    rows.map((row) => {
      let id = row.id.toString();
      let indexItem = data.findIndex((item) => item.id === id);
      return data.splice(indexItem, 1);
    });
  };

  const handleData = (newData) => {
    setRows([...rows, ...newData]);
  };

  useEffect(() => {
    if (data.length > 0) {
      handleCheck(rows, data);
      handleData(data);
    }
  }, [data]);

  useEffect(() => {
    dispatch(getClientsRequest());
    setRows(clients);
  }, []);

  return (
    <Box component={Paper} elevation={2} style={styleTable}>
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
