import * as React from "react";
import {
  Table,
  TableBody,
  TableContainer,
  TableRow,
  IconButton,
  Box,
} from "@mui/material";

import {
  CustomizedTableHead,
  CustomizeTableRow,
  CustomizeTableCell,
  CustomPagination,
} from "../../../../styles/styled_components/styledComponent";

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Loading from "../../../../components/loading/Loading";
import { useSelector, useDispatch } from "react-redux";
import {
  actDeleteProduct,
  actGetAllProduct,
  actProductPagination,
} from "../../../../store/admin_product/action";

import {
  selectAllProduct,
  selectLoading,
  selectProductPagination,
} from "../../../../store/admin_product/selector";

export default function ProductTable() {

  const dispatch = useDispatch();
  const loading = useSelector(selectLoading);
  const allProduct = useSelector(selectAllProduct);
  const paginationProduct = useSelector(selectProductPagination);
  const [page, setPage] = React.useState(1);

  // Get All Product
  React.useEffect(() => {
    dispatch(actGetAllProduct());
  }, []);

  // Get Product Pagination
  const rowsPerPage = 10;
  React.useEffect(() => {
    dispatch(actProductPagination(page, rowsPerPage));
  }, [page]);

  //Handle Delete User
  const handleDelete = (productId) => (
    dispatch(actDeleteProduct(productId)),
    setPage(1)
  );

  // Format currency
  const formatter = new Intl.NumberFormat("vn-VN", {
    style: "currency",
    currency: "VND",
  });

  // ChangePage, total Page
  const handleChangePage = (event, newPage) => setPage(newPage);
  const count = allProduct ? Math.ceil(allProduct?.length / 10) : 0;

  //renderBody
  const renderTableBody = () => {
    return paginationProduct?.map((product, index) => {
      return (
        <CustomizeTableRow
          key={index}
          sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
        >
          <CustomizeTableCell align="center">{product.id}</CustomizeTableCell>
          <CustomizeTableCell align="center">{product.name}</CustomizeTableCell>
          <CustomizeTableCell align="center">
            <img
              src={product.image}
              alt="product"
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                objectFit: "contain",
              }}
            />
          </CustomizeTableCell>
          <CustomizeTableCell align="center">
            {product.quantity}
          </CustomizeTableCell>
          <CustomizeTableCell align="center">
            {formatter.format(product.priceBeforeDiscount)}
          </CustomizeTableCell>
          <CustomizeTableCell align="center">
            <IconButton
              size="small"
              sx={{ color: "error.light" }}
              onClick={() => {
                window.confirm("Are you sure?");
                handleDelete(product.id);
              }}
            >
              <DeleteIcon fontSize="inherit" />
            </IconButton>
            <IconButton
              size="small"
              sx={{ color: "info.dark" }}
              onClick={() => {
                // handleGetUserInfo(user);
              }}
            >
              <EditIcon fontSize="inherit" />
            </IconButton>
          </CustomizeTableCell>
        </CustomizeTableRow>
      );
    });
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <TableContainer>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <CustomizedTableHead>
              <TableRow>
                <CustomizeTableCell align="center">ID</CustomizeTableCell>
                <CustomizeTableCell align="center">
                  PRODUCT NAME
                </CustomizeTableCell>
                <CustomizeTableCell align="center">IMAGE</CustomizeTableCell>
                <CustomizeTableCell align="center">QUANTITY</CustomizeTableCell>
                <CustomizeTableCell align="center">PRICE</CustomizeTableCell>
                <CustomizeTableCell align="center">ACTION</CustomizeTableCell>
              </TableRow>
            </CustomizedTableHead>
            <TableBody>{renderTableBody()}</TableBody>
          </Table>
          <Box sx={{ textAlign: "center" }}>
            <CustomPagination
              showFirstButton
              showLastButton
              page={page}
              count={count}
              onChange={handleChangePage}
              sx={{ mt: 5 }}
              size="small"
              shape="rounded"
              variant="outlined"
            />
          </Box>
        </TableContainer>
      )}
    </>
  );
}

