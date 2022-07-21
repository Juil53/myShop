import { Box, Paper } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SimpleSnackbar from "../../../../components/admin/SimpleSnackbar";
import Loading from "../../../../components/loading/Loading";
import { selectLoading, selectStatus, selectUserData } from "../../../../store/users/selector";
import { getUsersRequest, resetStatus } from "../../../../store/users/usersSlice";
import ColumnActions from "./ColumnActions";
import { columns, CustomFooter, CustomToolbar, handleSearch, style } from "./logic";

export default function UserDataList({ keyword }) {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [arrIds, setArrIds] = useState([]);
  
  const loading = useSelector(selectLoading);
  const usersData = useSelector(selectUserData);
  const deleteStatus = useSelector(selectStatus);

  const columnActions = [
    {
      field: "action",
      headerName: "Actions",
      width: 150,
      headerAlign: "center",
      renderCell: (params) => <ColumnActions setShow={setShow} params={params} />,
    },
  ];

  //Call docs from collection
  useEffect(() => {
    dispatch(getUsersRequest());
  }, []);

  useEffect(() => {
    dispatch(resetStatus());
  }, [deleteStatus]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <Box component={Paper} elevation={2} style={style.table}>
          <DataGrid
            rows={handleSearch(usersData, keyword)}
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
            componentsProps={{ footer: { arrIds } }}
          />
          <SimpleSnackbar show={show} setShow={setShow} type="delete" />
        </Box>
      )}
    </>
  );
}
