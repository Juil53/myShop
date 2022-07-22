import { Box, Paper } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SimpleSnackbar from "../../../../components/admin/SimpleSnackbar";
import Loading from "../../../../components/loading/Loading";
import { selectCustomers, selectLoading, selectStatus } from "../../../../store/clients/selector";
import { clientActions } from "../../../../store/clients/slice";
import CustomerActions from "./CustomerActions";
import { columns, CustomToolbar, style } from "./logic";
import CustomerFooter from "./CustomerFooter";

export default function CustomerList({ data }) {
  const dispatch = useDispatch();
  const loading = useSelector(selectLoading);
  const deleteStatus = useSelector(selectStatus);
  const customers = useSelector(selectCustomers);

  const [ids, setIds] = useState([]);
  const [show, setShow] = useState(false);

  const columnActions = [
    {
      field: "action",
      headerName: "Actions",
      headerAlign: "center",
      width: 150,
      renderCell: (params) => <CustomerActions setShow={setShow} params={params} />,
    },
  ];

  //reload page when import data
  useEffect(() => {
    if (data.length > 0);
  }, [data]);

  //call docs from collection
  useEffect(() => {
    dispatch(clientActions.getCustomersRequest());
  }, []);

  //reset status
  useEffect(() => {
    dispatch(clientActions.resetStatus());
    if(!deleteStatus) {
      setIds([])
    }
  }, [deleteStatus]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <Box component={Paper} elevation={2} style={style.table}>
          <DataGrid
            rows={customers}
            columns={columns.concat(columnActions)}
            density="compact"
            pageSize={10}
            rowsPerPageOptions={[10]}
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
          <SimpleSnackbar show={show} setShow={setShow} type="delete" />
        </Box>
      )}
    </>
  );
}
