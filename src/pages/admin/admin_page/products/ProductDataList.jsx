import { Box, Button, Grid, Paper, Typography } from "@mui/material";
import {
  DataGrid,
  GridFooter,
  GridFooterContainer,
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarDensitySelector,
  GridToolbarExport,
  GridToolbarFilterButton
} from "@mui/x-data-grid";
import { deleteDoc, doc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Loading from "../../../../components/loading/Loading";
import { db } from "../../../../service/auth";
import { deleteProductRequest, getAllProductRequest } from "../../../../store/admin_product/productSlice";
import { selectAllProduct, selectLoading } from "../../../../store/admin_product/selector";
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

export default function ProductDataList({ keyword,filterOptions }) {
  const dispatch = useDispatch()
  const [arrIds, setArrIds] = useState([]);
  const loading = useSelector(selectLoading)
  const productsData = useSelector((state)=>selectAllProduct(state,filterOptions))
  const keys = ["name", "brand", "status"];

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

  const columnActions = [
    {
      field: "action",
      headerName: "Actions",
      headerAlign: "center",
      width: 150,
      renderCell: (params) => {
        return (
          <Box sx={{ display: "flex", gap: "5px" }}>
            <Link to={`/admin/products/edit/${params.row.id}`}>
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

  //Add footer delete selected rows button
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
    dispatch(deleteProductRequest(id))
    dispatch(getAllProductRequest())
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

    // dispatch(deleteSelectedProductRequest(ids))
    dispatch(getAllProductRequest())
  };
  
  //HandleSearch
  const handleSearch = (data) => {
    return data.filter((item) => keys.some((key) => item[key].toLowerCase().includes(keyword)));
  };

  //Call docs from collection
  useEffect(() => {
    dispatch(getAllProductRequest())
  }, [filterOptions]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <Box component={Paper} elevation={2} style={style.table}>
          <DataGrid
            rows={handleSearch(productsData)}
            columns={columns.concat(columnActions)}
            density="compact"
            autoPageSize
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
