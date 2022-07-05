import { Box, Grid, Paper, Typography } from "@mui/material";
import React from "react";
import Chart from "../../../../components/admin/Chart";
import List from "../../../../components/admin/List";

const styleInformation = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

const Customer = () => {
  return (
    <Box>
      <Grid container columnSpacing={1}>
        <Grid component={Paper} elevation={8} item xs={5} sx={styleInformation}>
          <Box>
            <Typography
              sx={{ fontSize: "2rem" }}
              color="text.disabled"
              textAlign="center"
              padding={1}
            >
              Infomation
            </Typography>
            <img
              src="/img/default_avatar.png"
              alt="avatar"
              style={{
                borderRadius: "50%",
                marginBottom: "1rem",
                width: "200px",
                height: "200px",
                padding: "1rem",
              }}
            />
          </Box>

          <Box textAlign="left">
            <Typography component="h2" sx={{ fontWeight: "700", fontSize: "2rem" }} padding={1}>
              Jon Snow
            </Typography>
            <Typography component="p" color="text.secondary" padding={1}>
              Email: dvhnghia@gmail.com
            </Typography>
            <Typography component="p" color="text.secondary" padding={1}>
              Phone: 0983 505 905
            </Typography>
            <Typography component="p" color="text.secondary" padding={1}>
              Address: 497 Thong Nhat Street, Go Vap District, HCM city
            </Typography>
            <Typography component="p" color="text.secondary" padding={1}>
              Country: Viet Nam
            </Typography>
          </Box>
        </Grid>

        <Grid item xs={7}>
          <Chart aspect={3 / 1} title="User Spending (Last 6 Months)" />
        </Grid>

        <Grid item xs={12} mt={1} component={Paper} elevation={8}>
          <List />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Customer;
