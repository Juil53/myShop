import { Box, Grid } from "@mui/material";
import Chart from "../../../../components/admin/Chart";
import Progress from "../../../../components/admin/Progress";
import Widget from "../../../../components/admin/Widget";

function Dashboard() {
  return (
    <div className="content">
      <Box>
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <Widget type="user" />
          </Grid>
          <Grid item xs={3}>
            <Widget type="product" />
          </Grid>
          <Grid item xs={3}>
            <Widget type="order" />
          </Grid>
          <Grid item xs={3}>
            <Widget type="profit" />
          </Grid>
          <Grid item xs={4}>
            <Progress />
          </Grid>
          <Grid item xs={8}>
            <Chart aspect={2 / 1} title="PROFIT & REVENUE" />
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}

export default Dashboard;
