import { Box, FormControl, Grid, InputLabel, MenuItem, Select, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Chart from "../../../../components/admin/Chart";
import MonthChart from "../../../../components/admin/MonthChart";
import Progress from "../../../../components/admin/Progress";
import WidgetCustomer from "../../../../components/admin/widget/WidgetCustomer";
import WidgetEarning from "../../../../components/admin/widget/WidgetEarning";
import WidgetOrder from "../../../../components/admin/widget/WidgetOrder";
import WidgetProduct from "../../../../components/admin/widget/WidgetProduct";
import { getAllProductRequest } from "../../../../store/admin_product/productSlice";
import { selectAllProduct } from "../../../../store/admin_product/selector";
import { selectCustomers } from "../../../../store/clients/selector";
import { clientActions } from "../../../../store/clients/slice";
import { getOrderRequest } from "../../../../store/orders/orderSlice";
import { selectLoading, selectOrderData } from "../../../../store/orders/selector";
import Loading from "./../../../../components/loading/Loading";
import { months } from "./date";

const Dashboard = () => {
  const dispatch = useDispatch();
  
  const [month, setMonth] = useState("");

  const ordersData = useSelector(selectOrderData);
  const customersData = useSelector(selectCustomers);
  const productsData = useSelector(selectAllProduct);
  const loading = useSelector(selectLoading);

  useEffect(() => {
    dispatch(clientActions.getCustomersRequest());
    dispatch(getAllProductRequest());
    dispatch(getOrderRequest());
  }, []);

  const handleChange = (event) => {
    event.preventDefault();
    setMonth(event.target.value);
  };

  return (
    <div className="content">
      {loading ? (
        <Loading />
      ) : (
        <Box>
          <Box sx={{ width: 200, marginBottom: 2 }}>
            <Typography color="text.primary" sx={{ marginBottom: 1 }} gutterBottom>
              FILTER
            </Typography>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Current Month</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={month}
                label="Current Month"
                onChange={handleChange}
              >
                <MenuItem value="">Select current month</MenuItem>
                {months.map((month) => (
                  <MenuItem key={month.value} value={month.value}>
                    {month.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          <Grid container spacing={2}>
            <Grid item xs={3}>
              <WidgetCustomer customers={customersData} month={month} />
            </Grid>
            <Grid item xs={3}>
              <WidgetProduct products={productsData} month={month} />
            </Grid>
            <Grid item xs={3}>
              <WidgetOrder orders={ordersData} month={month}/>
            </Grid>
            <Grid item xs={3}>
              <WidgetEarning orders={ordersData} month={month} />
            </Grid>
            <Grid item xs={12} md={12} lg={4}>
              <Progress orders={ordersData} month={month} />
            </Grid>
            <Grid item xs={12} md={12} lg={8}>
              {month ? (
                <MonthChart
                  aspect={2 / 1}
                  title="REVENUE & CUSTOMERS"
                  customers={customersData}
                  orders={ordersData}
                  month={month}
                />
              ) : (
                <Chart
                  aspect={2 / 1}
                  title="REVENUE & CUSTOMERS"
                  customers={customersData}
                  orders={ordersData}
                />
              )}
            </Grid>
          </Grid>
        </Box>
      )}
    </div>
  );
};

export default Dashboard;
