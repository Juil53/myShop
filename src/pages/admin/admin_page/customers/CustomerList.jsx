import { Box, Paper } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SimpleSnackbar from "../../../../components/admin/SimpleSnackbar";
import Loading from "../../../../components/loading/Loading";
import { selectCustomers, selectLoading, selectStatus } from "../../../../store/clients/selector";
import { clientActions } from "../../../../store/clients/slice";
import CustomerActions from "./CustomerActions";
import { columns, CustomFooter, CustomToolbar, style } from "./logic";

export default function CustomerList({ data }) {
  console.log(data);
  const dispatch = useDispatch();
  const loading = useSelector(selectLoading);
  const deleteStatus = useSelector(selectStatus);
  const customers = useSelector(selectCustomers);

  const [arrIds, setArrIds] = useState([]);
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
              setArrIds(ids);
            }}
            components={{
              Toolbar: CustomToolbar,
              Footer: CustomFooter,
            }}
            componentsProps={{ footer: { arrIds } }}
          />
          <SimpleSnackbar show={show} setShow={setShow} type="delete" />
        </Box>
      )}
    </>
  );
}
