import { Box, FormControl, Grid, InputLabel, MenuItem, Select, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Chart from "../../../../components/admin/Chart";
import MonthChart from "../../../../components/admin/MonthChart";
import Progress from "../../../../components/admin/Progress";
import WidgetCustomer from "../../../../components/admin/widget/WidgetCustomer";
import WidgetEarning from "../../../../components/admin/widget/WidgetEarning";
import WidgetOrder from "../../../../components/admin/widget/WidgetOrder";
import WidgetProduct from "../../../../components/admin/widget/WidgetProduct";
import Loading from "../../../../components/loading/Loading";
import fb from "../../../../service/db";
import { getOrderRequest } from "../../../../store/orders/orderSlice";
import { selectLoading, selectOrderData } from "../../../../store/orders/selector";
import { months } from "./date";

function Dashboard() {
  const dispatch = useDispatch();
  const ordersData = useSelector(selectOrderData);
  const loading = useSelector(selectLoading);
  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);
  const [month, setMonth] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const customersData = await fb.getAll("customers");
      const productsData = await fb.getAll("products");
      dispatch(getOrderRequest());
      setCustomers(customersData);
      setProducts(productsData);
    };
    fetchData();
  }, [month]);

  const handleChange = async (event) => {
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
              <WidgetCustomer customers={customers} month={month} />
            </Grid>
            <Grid item xs={3}>
              <WidgetProduct products={products} month={month} />
            </Grid>
            <Grid item xs={3}>
              <WidgetOrder orders={ordersData} />
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
                  customers={customers}
                  orders={ordersData}
                  month={month}
                />
              ) : (
                <Chart
                  aspect={2 / 1}
                  title="REVENUE & CUSTOMERS"
                  customers={customers}
                  orders={ordersData}
                />
              )}
            </Grid>
          </Grid>
        </Box>
      )}
    </div>
  );
}

export default Dashboard;
