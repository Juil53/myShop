import EditIcon from "@mui/icons-material/Edit";
import {
  Box,
  IconButton,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material";
import { memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loading from "../../../../components/loading/Loading";
import {
  getAllProductRequest,
  getProductPaginationRequest,
  resetStatus,
} from "../../../../store/admin_product/productSlice";
import {
  selectAllProduct,
  selectLoading,
  selectProductPagination,
} from "../../../../store/admin_product/selector";
import {
  CustomizedTableHead,
  CustomPagination,
} from "../../../../styles/styled_components/styledComponent";
import ProductDelete from "./ProductDelete";

const ProductList = ({ filterOptions }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const loading = useSelector(selectLoading);
  const products = useSelector((state) => selectAllProduct(state, filterOptions));
  const paginationProduct = useSelector((state) => selectProductPagination(state, filterOptions));
  const handleResetStatus = () => dispatch(resetStatus());

  // FORMAT CURRENCY
  const formatter = new Intl.NumberFormat("vn-VN", {
    style: "currency",
    currency: "VND",
  });

  // CHANGE PAGE
  const handleChangePage = (event, newPage) => setPage(newPage);
  const count = products ? Math.ceil(products?.length / 10) : 0;

  // GET ALL PRODUCT
  useEffect(() => {
    dispatch(getAllProductRequest());
  }, [filterOptions]);

  // GET PRODUCT PAGINATION
  useEffect(() => {
    dispatch(getProductPaginationRequest({ page, rowsPerPage }));
  }, [page]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <Box component={Paper} elevation={3} p={2}>
          <TableContainer
            sx={{
              maxHeight: "65vh",
            }}
          >
            <Table
              stickyHeader
              aria-label="sticky table"
              size="small"
              sx={{ minWidth: { xs: "1400px", md: "110%" }, backgroundColor: "#fff" }}
            >
              <CustomizedTableHead>
                <TableRow>
                  <TableCell align="left"></TableCell>
                  <TableCell align="left">ID</TableCell>
                  <TableCell align="left">Product Name</TableCell>
                  <TableCell align="center">Image</TableCell>
                  <TableCell align="center">Available</TableCell>
                  <TableCell align="center">Price</TableCell>
                </TableRow>
              </CustomizedTableHead>
              <TableBody>
                {paginationProduct?.map((product, index) => {
                  return (
                    <TableRow
                      key={`product_${index}`}
                      hover={true}
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                        cursor: "pointer",
                      }}
                    >
                      <TableCell align="left">
                        <Stack direction="row">
                          <ProductDelete product={product} page={page} />
                          <IconButton
                            size="small"
                            color="secondary"
                            onClick={() => navigate(`/admin/products/edit/${product.id}`)}
                          >
                            <EditIcon fontSize="inherit" />
                          </IconButton>
                        </Stack>
                      </TableCell>
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
                      <TableCell align="center">
                        {formatter.format(product.priceBeforeDiscount)}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
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
            onClick={() => handleResetStatus()}
          />
        </Box>
      )}
    </>
  );
};

export default memo(ProductList);
