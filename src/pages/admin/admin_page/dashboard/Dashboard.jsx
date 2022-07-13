import { Box, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import Chart from "../../../../components/admin/Chart";
import Progress from "../../../../components/admin/Progress";
import WidgetUser from "../../../../components/admin/widget/WidgetUser";
import WidgetProduct from "../../../../components/admin/widget/WidgetProduct"
import Loading from "../../../../components/loading/Loading";
import fb from "../../../../service/db";
import WidgetOrder from "../../../../components/admin/widget/WidgetOrder";
import WidgetEarning from "../../../../components/admin/widget/WidgetEarning";

function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [users,setUsers] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const data = await fb.getAll("users");
      setUsers(data)
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
              <WidgetUser users={users}/>
            </Grid>
            <Grid item xs={3}>
              <WidgetProduct  />
            </Grid>
            <Grid item xs={3}>
              <WidgetOrder type="order" />
            </Grid>
            <Grid item xs={3}>
              <WidgetEarning type="profit" />
            </Grid>
            <Grid item xs={12} md={12} lg={4}>
              <Progress />
            </Grid>
            <Grid item xs={12} md={12} lg={8}>
              <Chart aspect={2 / 1} title="PROFIT & REVENUE" />
            </Grid>
          </Grid>
        </Box>
      )}
    </div>
  );
}

export default Dashboard;
