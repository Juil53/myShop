import { Box, Grid, Paper, Typography } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import List from "../../../../components/admin/List";
import MonthChart from "../../../../components/admin/MonthChart";
import Breadcrumb from "../../../../components/breadcumb/BreadCumb";
import { selectCustomer } from "../../../../store/clients/selector";
import { clientActions } from "../../../../store/clients/slice";
import { getOrderRequest } from "../../../../store/orders/orderSlice";
import { selectOrderData } from "../../../../store/orders/selector";
import { style, pages } from "./logic";

const CURRENT_MONTH = new Date().getMonth() + 1;

const Customer = () => {
  const params = useParams();
  const dispatch = useDispatch();

  const customer = useSelector(selectCustomer);
  const ordersData = useSelector(selectOrderData);

  const customerBreadcrumb = [...pages, { name: customer.displayName, url: "" }];

  useEffect(() => {
    dispatch(clientActions.getCustomerRequest(params.id));
    dispatch(getOrderRequest());
  }, []);

  return (
    <Box>
      <Breadcrumb pages={customerBreadcrumb} />
      <Grid container columnSpacing={1} marginTop={2}>
        <Grid component={Paper} elevation={8} item xs={4} sx={style.information}>
          <Box>
            <img
              src={customer.image ? customer.image : "/img/default_avatar.png"}
              alt="avatar"
              style={style.img}
            />
          </Box>

          <Box textAlign="left">
            <Typography component="h2" sx={{ fontWeight: "700", fontSize: "2rem" }} padding={1}>
              {customer.displayName}
            </Typography>
            <Typography component="p" color="text.secondary" padding={1}>
              Email: {customer.email}
            </Typography>
            <Typography component="p" color="text.secondary" padding={1}>
              Phone: {customer.phoneNumber}
            </Typography>
            <Typography component="p" color="text.secondary" padding={1}>
              Address: {customer.homeAddress}
            </Typography>
            <Typography component="p" color="text.secondary" padding={1}>
              Rank: {customer.rank}
            </Typography>
          </Box>
        </Grid>

        <Grid item xs={8}>
          <MonthChart
            aspect={3 / 1}
            title="User Spending (Last 6 Months)"
            month={CURRENT_MONTH}
            orders={ordersData}
          />
        </Grid>

        <Grid item xs={12} mt={1} component={Paper} elevation={8}>
          <List />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Customer;
