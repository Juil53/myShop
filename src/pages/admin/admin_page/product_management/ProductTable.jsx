import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
  Box,
  IconButton,
  Paper,
  Stack,
  Popover,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material";
import * as React from "react";
import { memo } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loading from "../../../../components/loading/Loading";
import {
  getAllProductRequest,
  getProductPaginationRequest,
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

const ProductTable = ({ filterOptions }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const loading = useSelector(selectLoading);
  const products = useSelector((state) => selectAllProduct(state, filterOptions));
  const paginationProduct = useSelector((state) => selectProductPagination(state, filterOptions));
  const ROWS_PER_PAGE = 10;

  // GET ALL PRODUCT
  React.useEffect(() => {
    dispatch(getAllProductRequest());
  }, [filterOptions]);

  // GET PRODUCT PAGINATION
  React.useEffect(() => {
    dispatch(getProductPaginationRequest({ page, rowsPerPage }));
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
  const count = products ? Math.ceil(products?.length / 10) : 0;

  // POPOVER
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

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
        >
          <TableCell align="left">
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

            {/* <IconButton aria-describedby={id} variant="contained" onClick={handleClick}>
              <MoreVertIcon />
            </IconButton>
            <Popover
              elevation={1}
              id={id}
              open={open}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
            >
              
            </Popover> */}
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
          <TableCell align="center">{formatter.format(product.priceBeforeDiscount)}</TableCell>
        </TableRow>
      );
    });
  };

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
};

export default memo(ProductTable);
