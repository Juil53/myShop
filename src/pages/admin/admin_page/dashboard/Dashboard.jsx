import { Box, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Chart from "../../../../components/admin/Chart";
import Progress from "../../../../components/admin/Progress";
import WidgetCustomer from "../../../../components/admin/widget/WidgetCustomer";
import WidgetEarning from "../../../../components/admin/widget/WidgetEarning";
import WidgetOrder from "../../../../components/admin/widget/WidgetOrder";
import WidgetProduct from "../../../../components/admin/widget/WidgetProduct";
import Loading from "../../../../components/loading/Loading";
import fb from "../../../../service/db";
import { getOrderRequest } from "../../../../store/orders/orderSlice";
import { selectOrderData } from "../../../../store/orders/selector";

function Dashboard() {
  const dispatch = useDispatch();
  const ordersData = useSelector(selectOrderData);
  const [loading, setLoading] = useState(true);
  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);
  const [orders,setOrders] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const customersData = await fb.getAll("customers");
      const productsData = await fb.getAll("products");
      dispatch(getOrderRequest());
      setCustomers(customersData);
      setProducts(productsData);
      setOrders(ordersData)
      setLoading(false);
    };
    fetchData();
  }, []);

  return (
    <div className="content">
      {loading ? (
        <Loading />
      ) : (
        <Box>
          <Grid container spacing={2}>
            <Grid item xs={3}>
              <WidgetCustomer customers={customers} />
            </Grid>
            <Grid item xs={3}>
              <WidgetProduct products={products} />
            </Grid>
            <Grid item xs={3}>
              <WidgetOrder orders={orders} />
            </Grid>
            <Grid item xs={3}>
              <WidgetEarning orders={orders} />
            </Grid>
            <Grid item xs={12} md={12} lg={4}>
              <Progress orders={orders}/>
            </Grid>
            <Grid item xs={12} md={12} lg={8}>
              <Chart aspect={2 / 1} title="PROFIT & REVENUE" customers={customers}/>
            </Grid>
          </Grid>
        </Box>
      )}
    </div>
  );
}

export default Dashboard;
