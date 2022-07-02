import React from "react";
import { Box, Grid, Paper } from "@mui/material";
import Widget from "../component/Widget";
import Progress from "../component/Progress";
import Chart from "../component/Chart";

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
            <Chart aspect={2 / 1} title="PROFIT & REVENUE"/>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}

export default Dashboard;
