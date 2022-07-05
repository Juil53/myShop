import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Box, Grid, IconButton, Paper, Typography } from "@mui/material";

const Progress = () => {
  return (
    <Box
      component={Paper}
      elevation={8}
      p={3}
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography
          sx={{ fontSize: "2rem", fontWeight: "400" }}
          color="text.secondary"
          gutterBottom
        >
          TOTAL REVENUE
        </Typography>
        <IconButton size="large">
          <MoreVertIcon />
        </IconButton>
      </Box>
      <Box sx={{ position: "relative", display: "inline-flex" }}>
        <CircularProgress variant="determinate" value={75} size={180} color="info" thickness={2} />
        <Box
          sx={{
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            position: "absolute",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography variant="caption" component="div" color="info.main" sx={{ fontSize: "5rem" }}>
            75%
          </Typography>
        </Box>
      </Box>

      <Typography component="p" color="text.disabled" sx={{ fontSize: "2.5rem", marginTop: 2 }}>
        Total sale made today
      </Typography>

      <Typography
        component="h3"
        color="text.primary"
        sx={{ fontSize: "4rem", fontWeight: "500", marginTop: 2 }}
      >
        500$
      </Typography>

      <Typography
        component="p"
        color="text.disabled"
        sx={{ fontSize: "2rem", textAlign: "center" }}
      >
        Previous transactions processing. Last payments may not be included.
      </Typography>

      <Box sx={{ width: "100%", textAlign: "center", marginTop: 1 }}>
        <Grid container>
          <Grid item xs={4}>
            <Typography component="p" color="text.disabled" sx={{ fontSize: "2rem" }}>
              Target
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
              <KeyboardArrowDownOutlinedIcon sx={{ fontSize: "3rem" }} color="error" />
              <Typography sx={{ fontSize: "2.5rem" }} color="error">
                $12.5k
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={4}>
            <Typography component="p" color="text.disabled" sx={{ fontSize: "2rem" }}>
              Last Week
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
              <KeyboardArrowUpOutlinedIcon sx={{ fontSize: "3rem" }} color="success" />
              <Typography sx={{ fontSize: "2.5rem" }} color="success.main">
                $12.5k
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={4}>
            <Typography component="p" color="text.disabled" sx={{ fontSize: "2rem" }}>
              Last Month
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
              <KeyboardArrowUpOutlinedIcon sx={{ fontSize: "3rem" }} color="success" />
              <Typography sx={{ fontSize: "2.5rem" }} color="success.main">
                $12.5k
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Progress;
