import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {
  Box, IconButton, Paper,
  Stack, Table,
  TableBody, TableCell, TableContainer,
  TableRow
} from "@mui/material";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loading from "../../../../components/loading/Loading";
import {
  getAllProductRequest,
  getProductPaginationRequest
} from "../../../../store/admin_product/productSlice";
import {
  selectAllProduct,
  selectLoading,
  selectProductPagination
} from "../../../../store/admin_product/selector";
import {
  CustomizedTableHead,
  CustomPagination
} from "../../../../styles/styled_components/styledComponent";




export default function ProductTable() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loading = useSelector(selectLoading);
  const allProduct = useSelector(selectAllProduct);
  const paginationProduct = useSelector(selectProductPagination);
  const [page, setPage] = React.useState(1);

  // GET ALL PRODUCT
  React.useEffect(() => {
    dispatch(getAllProductRequest());
  }, []);

  // GET PRODUCT PAGINATION
  const ROWS_PER_PAGE = 10;
  React.useEffect(() => {
    dispatch(getProductPaginationRequest({ page, ROWS_PER_PAGE }));
  }, [page]);

  // HANDLE DELETE PRODUCT
  const handleDelete = (productId) => (
    dispatch({ type: "DELETE_PRODUCT", payload: productId }),
    dispatch(getProductPaginationRequest({ page, ROWS_PER_PAGE }))
  );

  // FORMAT CURRENCY
  const formatter = new Intl.NumberFormat("vn-VN", {
    style: "currency",
    currency: "VND",
  });

  // CHANGE PAGE
  const handleChangePage = (event, newPage) => setPage(newPage);
  const count = allProduct ? Math.ceil(allProduct?.length / 10) : 0;

  // RENDER BODY
  const renderTableBody = () => {
    return paginationProduct?.map((product, index) => {
      return (
        <TableRow
          key={`product_${index}`}
          hover={true}
          sx={{
            "&:last-child td, &:last-child th": { border: 0 },
            cursor: "pointer",
          }}
          // onClick={() => navigate(`/admin/products/edit/${product.id}`)}
        >
          <TableCell align="left">{product.id}</TableCell>
          <TableCell align="left">{product.name}</TableCell>
          <TableCell align="center">
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
          </TableCell>
          <TableCell align="center">{product.available}</TableCell>
          <TableCell align="center">{formatter.format(product.priceBeforeDiscount)}</TableCell>
          <TableCell align="center">
            <Stack direction="row">
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
                color="secondary"
                onClick={() => navigate(`/admin/products/edit/${product.id}`)}
              >
                <EditIcon fontSize="inherit" />
              </IconButton>
            </Stack>
          </TableCell>
        </TableRow>
      );
    });
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <Box component={Paper} elevation={2} padding={2} sx={{ backgroundColor: "#E7EBF0" }}>
          <TableContainer
            sx={{
              maxHeight: "65vh",
            }}
          >
            <Table
              stickyHeader
              aria-label="sticky table"
              size="small"
              sx={{ minWidth: "110%", backgroundColor: "#fff" }}
            >
              <CustomizedTableHead>
                <TableRow>
                  <TableCell align="left">ID</TableCell>
                  <TableCell align="left">Product Name</TableCell>
                  <TableCell align="center">Image</TableCell>
                  <TableCell align="center">Available</TableCell>
                  <TableCell align="center">Price</TableCell>
                  <TableCell align="center"></TableCell>
                </TableRow>
              </CustomizedTableHead>
              <TableBody>{renderTableBody()}</TableBody>
            </Table>
          </TableContainer>

          <CustomPagination
            showFirstButton
            showLastButton
            page={page}
            count={count || 0}
            onChange={handleChangePage}
            sx={{ mt: 2 }}
            size="small"
            shape="rounded"
            variant="outlined"
          />
        </Box>
      )}
    </>
  );
}
