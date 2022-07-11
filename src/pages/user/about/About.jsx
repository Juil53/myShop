import { Box, Button, Grid, Typography } from "@mui/material";
import { lineHeight } from "@mui/system";
import React from "react";

const style = {
  container: {
    width: "60%",
    margin: "5rem auto 0 auto",
    textAlign: "center",
  },
  title: {
    fontWeight: 500,
  },
  quote: {
    fontWeight: 700,
    fontSize: "2.5rem",
  },
  paragraph:{
    marginTop:'2rem',
    lineHeight:'2rem'
  },
  arrow :{
    display:'block',
    position:'relative',
    width:'2px',
    height:'30px',
    backgroundColor:"#000",
    
  }
};

const About = () => {
  return (
    <Box sx={style.container}>
      <Grid container spacing={5} alignItems="center">
        <Grid item xs={4}>
          <Typography sx={style.title} variant="h3">
            Breshka
          </Typography>
        </Grid>
        <Grid item xs={8}>
          <img src="/img/company02.jpg" alt="company" />
        </Grid>

        <Grid item xs={6}>
          <Typography variant="h4">THE BRAND</Typography>
          <q style={style.quote}>
            Bershka was created in 1998 as a new brand of the Spanish group Inditex
          </q>
          <br/>
          <Typography sx={style.paragraph}>
            Bershka presents itself as a reference point for fashion targeting this increasingly
            demanding public and, in just 2 years, hasconsolidated its brand image in 100 shops;
            Today, after 18 years, the chain has more than 1000 stores in over 70 markets, with
            sales that represent 9% of the total revenue for the whole group.
          </Typography>

          <Button>Read more</Button>
          <span></span>

        </Grid>
        <Grid item xs={6}></Grid>
      </Grid>
    </Box>
  );
};

export default About;
