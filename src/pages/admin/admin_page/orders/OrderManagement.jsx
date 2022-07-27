import SearchIcon from "@mui/icons-material/Search";
import { Box, InputAdornment, Typography } from "@mui/material";
import { useState } from "react";
import Breadcrumb from "../../../../components/breadcumb/BreadCumb";
import { TextFieldCustom } from "../../../../styles/styled_components/styledComponent";
import { style } from "./logic";
import OrderModal from "./modal/OrderModal";
import OrderDataList from "./OrderDataList";

function OrderManagement() {
  const [keyword, setKeyword] = useState("");

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

  const handleChange = (e) => {
    setKeyword(e.target.value);
  };

  return (
    <>
      <Breadcrumb pages={pages} />
      <Typography variant="h4" fontWeight={400}>
        Orders Management
      </Typography>
      <Box className="product__search" sx={style.productSearch}>
        <TextFieldCustom
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          label="Search"
          placeholder="Type email,id,address"
          size="small"
          sx={{ minWidth: "10%" }}
          onChange={handleChange}
        />
      </Box>
      <OrderDataList keyword={keyword} />
      <OrderModal />
    </>
  );
}

export default OrderManagement;
