import { Box, Paper } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SimpleSnackbar from "../../../../components/admin/SimpleSnackbar";
import Loading from "../../../../components/loading/Loading";
import { selectCustomers, selectLoading, selectStatus } from "../../../../store/clients/selector";
import { clientActions } from "../../../../store/clients/slice";
import CustomerActions from "./CustomerActions";
import CustomerFooter from "./CustomerFooter";
import { columns, CustomToolbar, handleSearch, style } from "./logic";

const CustomerList = ({ importData, save, keyword }) => {
  const dispatch = useDispatch();
  const loading = useSelector(selectLoading);
  const deleteStatus = useSelector(selectStatus);
  const customers = useSelector(selectCustomers);

  const [data, setData] = useState(customers);
  const [ids, setIds] = useState([]);
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
      renderCell: (params) => <CustomerActions setShow={setShow} params={params} setSeverity={setSeverity}/>,
    },
  ];

  //call docs from collection
  useEffect(() => {
    dispatch(clientActions.getCustomersRequest());
  }, []);

  //reload page when import data
  useEffect(() => {
    //Import
    if (importData.length > 0) setData([...customers, ...importData]);
    //Save Import
    if (save){
      dispatch(clientActions.getCustomersRequest())
    };
  }, [importData, save]);

  //reset status
  useEffect(() => {
    dispatch(clientActions.resetStatus());
    if (!deleteStatus) {
      setIds([]);
    }
  }, [deleteStatus]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <Box component={Paper} elevation={2} style={style.table}>
          <DataGrid
            rows={data.length > 0 ? data : handleSearch(customers, keyword)}
            columns={columns.concat(columnActions)}
            density="compact"
            autoPageSize
            checkboxSelection
            disableSelectionOnClick
            onSelectionModelChange={(ids) => {
              setIds(ids);
            }}
            components={{
              Toolbar: CustomToolbar,
              Footer: CustomerFooter,
            }}
            componentsProps={{ footer: { ids, setShow } }}
          />
          <SimpleSnackbar show={show} setShow={setShow} severity={severity} />
        </Box>
      )}
    </>
  );
};

export default memo(CustomerList);
