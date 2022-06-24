import React from "react";
import { Box, InputAdornment, Typography } from "@mui/material";
import { TextFieldCustom } from "../../../../styles/styled_components/styledComponent";
import SearchIcon from "@mui/icons-material/Search";
import OrderTable from "./OrderTable";
import OrderModal from "./order_modal/OrderModal";
import { selectOrderKeyword } from "../../../../store/orders/selector";
import { useDispatch, useSelector } from "react-redux";
import { getKeyword } from "../../../../store/orders/orderSlice";
import Breadcrumb from "../../../../components/breadcumb/BreadCumb";

const product__search = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginTop: "2rem",
  marginBottom: "2rem",
};

function OrderManagement() {
  const dispatch = useDispatch();
  const keyword = useSelector(selectOrderKeyword);
  const handleChange = (event) => dispatch(getKeyword(event.target.value));
  const pages = [
    {
      name: "Admin",
      url: "/admin",
    },
    {
      name: "Orders",
      url: "/admin/orders",
    },
  ];

  return (
    <>
      <Breadcrumb pages={pages} />
      <Typography variant="h4" fontWeight={400}>
        Orders Management
      </Typography>
      <Box className="product__search" sx={product__search}>
        <TextFieldCustom
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          label="Search by OrderId..."
          size="small"
          sx={{ minWidth: "10%" }}
          onChange={handleChange}
        />
      </Box>

      {/* ORDER TABLE */}
      <OrderTable keyword={keyword} />

      {/* ORDER MODAL */}
      <OrderModal />
    </>
  );
}

export default OrderManagement;
