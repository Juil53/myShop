import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Button, Paper, Typography } from "@mui/material";
import { Link } from "react-router-dom";

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

export default function CustomerList({ data }) {
  const columns = [
    { field: "id", headerName: "ID", width: 50 },
    {
      field: "avatar",
      headerName: "Avatar",
      width: 80,
      renderCell: (params) => {
        return (
          <div>
            <img src={params.row.image} />
          </div>
        );
      },
    },
    { field: "name", headerName: "Full Name", width: 180 },
    { field: "gender", headerName: "Gender", width: 100 },
    { field: "birthday", headerName: "Birthday", width: 100 },
    { field: "email", headerName: "Email", width: 250 },
    { field: "phoneNumber", headerName: "Phone Number", width: 150 },
    { field: "address", headerName: "Address", width: 200 },
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

  const [rows, setRows] = useState([
    {
      id: "1",
      name: "Tabina Kondratenko",
      gender: "Female",
      email: "ebeamande@businessinsider.com",
      phoneNumber: "+54 956 276 1898",
      address: "67 Shasta Crossing",
      birthday: "03/02/1979",
      rank: "Silver",
      image: "https://robohash.org/eaquequonulla.png?size=50x50&set=set1",
    },
    {
      id: "2",
      name: "Lanie Fennell",
      gender: "Male",
      email: "dblundeld@eepurl.com",
      phoneNumber: "+977 171 391 1260",
      address: "6701 Mcbride Pass",
      birthday: "04/04/1967",
      rank: "Gold",
      image: "https://robohash.org/consecteturfugitofficiis.png?size=50x50&set=set1",
    },
  ]);

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

  return (
    <Box
      component={Paper}
      elevation={2}
      style={{ height: "80vh", width: "100%", margin: "2rem 0" }}
    >
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
