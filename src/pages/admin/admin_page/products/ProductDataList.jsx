import { Box, Button, Paper } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import SimpleSnackbar from "../../../../components/admin/SimpleSnackbar";
import Loading from "../../../../components/loading/Loading";
import { getAllProductRequest, resetStatus } from "../../../../store/admin_product/productSlice";
import {
  selectAllProduct,
  selectLoading,
  selectStatus
} from "../../../../store/admin_product/selector";
import { columns, CustomFooter, CustomToolbar, handleSearch, style } from "./logic";
import ProductDelete from "./ProductDelete";

export default function ProductDataList({ keyword, filterOptions }) {
  const dispatch = useDispatch();

  const loading = useSelector(selectLoading);
  const productsData = useSelector((state) => selectAllProduct(state, filterOptions));
  const deleteStatus = useSelector(selectStatus);

  const [arrIds, setArrIds] = useState([]);
  const [show, setShow] = useState(false);
  const [severity, setSeverity] = useState({
    type: "",
    message: "",
  });

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
            <ProductDelete product={params.row} setShow={setShow} setSeverity={setSeverity}/>
          </Box>
        );
      },
    },
  ];

  //Call docs from collection
  useEffect(() => {
    dispatch(getAllProductRequest());
  }, []);

  useEffect(() => {
    dispatch(resetStatus());
  }, [filterOptions, deleteStatus]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <Box component={Paper} elevation={2} style={style.table}>
          <DataGrid
            rows={handleSearch(productsData, keyword)}
            columns={columns.concat(columnActions)}
            density="compact"
            autoPageSize
            checkboxSelection
            onSelectionModelChange={(ids) => {
              setArrIds(ids);
            }}
            components={{
              Toolbar: CustomToolbar,
              Footer: CustomFooter,
            }}
            componentsProps={{ footer: {arrIds} }}
          />
          <SimpleSnackbar show={show} setShow={setShow} severity={severity} />
        </Box>
      )}
    </>
  );
}
