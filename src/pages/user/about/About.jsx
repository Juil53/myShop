import { Box, Button, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Breadcrumb from "../../../components/breadcumb/BreadCumb";
import "./about.scss";

const style = {
  container: {
    width: { xs: "100%", md: "100%", lg: "80%" },
    margin: "5rem auto 0 auto",
    textAlign: "center",
  },
  title: {
    marginTop: "2rem",
    marginBottom: "2rem",
    fontWeight: 500,
  },
  quote: {
    lineHeight: "25px",
    letterSpacing: "2px",
    fontWeight: 700,
    fontSize: "2.5rem",
    margin: "2rem 2rem",
  },
  paragraph: {
    margin: "2rem",
    lineHeight: 1.6,
    letterSpacing: "1px",
    textAlign: "left",
  },
  btn: {
    marginTop: "2rem",
    fontWeight: 700,
  },
  arrowWrapper: {
    cursor: "pointer",
  },
};

const About = () => {
  const [toggle1, setToggle1] = useState(false);
  const [toggle2, setToggle2] = useState(false);
  const [toggle3, setToggle3] = useState(false);
  const [isActive, setIsActive] = useState(false);

  const handleHide1 = () => setToggle1(!toggle1);
  const handleHide2 = () => setToggle2(!toggle2);
  const handleHide3 = () => setToggle3(!toggle3);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsActive(!isActive);
    }, 4000);

    return () => clearInterval(interval);
  }, [isActive]);

  const pages = [
    {
      name: "Home",
      url: "/",
    },
    {
      name: "About",
      url: "/about",
    },
  ];

  return (
    <Box sx={style.container} className="aboutWrapper">
      <Breadcrumb pages={pages} color={"#35c0c5"}/>

      <Grid container spacing={2} justifyContent="center">
        <Grid item sx={{ display: { xs: "none", md: "block" } }} xs={0} md={4} alignSelf="center">
          <Typography sx={style.title} variant="h1">
            Breshka
          </Typography>
        </Grid>
        <Grid item xs={12} md={8}>
          <Box className="overlap">
            <img
              src="/img/company01.jpg"
              alt="company"
              className={isActive ? "overlapImg active" : "overlapImg"}
            />
            <img
              src="/img/company02.jpg"
              alt="company"
              className={isActive ? "overlapImg" : "overlapImg active"}
            />
          </Box>
        </Grid>

        <Grid item xs={12} md={12} lg={6}>
          <Typography variant="h5">THE BRAND</Typography>
          <q style={style.quote}>
            Bershka was created in 1998 as a new brand of the Spanish group Inditex
          </q>
          <br />
          <Typography sx={style.paragraph}>
            Bershka presents itself as a reference point for fashion targeting this increasingly
            demanding public and, in just 2 years, hasconsolidated its brand image in 100 shops;
            Today, after 18 years, the chain has more than 1000 stores in over 70 markets, with
            sales that represent 9% of the total revenue for the whole group.
          </Typography>

          <Box sx={style.arrowWrapper} onClick={() => handleHide1()}>
            <Button sx={style.btn} disableRipple>
              Read more
            </Button>
            <span className="arrow"></span>
          </Box>

          <Box className="expand">
            <Typography className={toggle1 ? "paragraph active" : "paragraph"} sx={style.paragraph}>
              In order to always have the latest trends at the shop; Bershka uses its flexible
              business model to adapt to any changes occurring during the seasons, responding to
              them by bringing new products to the shops within the shortest possible time. The
              models for each season are developed entirely by their creative teams, who take as
              their main source of inspiration the fashion trends prevailing in the market, through
              information received from the shops, as well as the customers themselves. The Bershka
              design team consists of more than 60 professionals who are continuously assessing the
              needs, desires and demands of consumers, and offering more than 4,000 different
              products in their shops each year.
            </Typography>
          </Box>
          <img src="/img/company05.jpg" alt="company05" />

          <Typography variant="h5" style={style.title}>
            THE TARGET
          </Typography>
          <Typography sx={style.paragraph}>
            Bershka's public is characterized by adventurous young people, who are aware of the
            latest trends and are interested in music, social networks and new technologies.
          </Typography>
          <img src="/img/company06.jpg" alt="company06" />

          <Typography variant="h5" style={style.title}>
            PRODUCT LINES
          </Typography>
          <q style={style.quote}>
            BSK is the brand for younger people, and always caters to the interests and needs of
            this public
          </q>
          <Typography sx={style.paragraph}>
            The shops have separate spaces intended for the various different product lines that
            Bershka offers. In each section, Bershka, BSK & Man, the products are placed according
            to their style, creating a wide spectrum ranging from casual wear to sports and from
            basic garments to more fashionable items.
          </Typography>
          <Box sx={style.arrowWrapper} onClick={() => handleHide2()}>
            <Button sx={style.btn} disableRipple>
              Read more
            </Button>
            <span className="arrow"></span>
          </Box>
          <Box className="expand">
            <Typography sx={style.paragraph} className={toggle2 ? "paragraph active" : "paragraph"}>
              The area dedicated to women's wear is the most important. This section has two product
              lines: Bershka and BSK. The first focuses on the latest fashion and includes the
              leading trends. It has a wide range of jeans wear, eveningwear, casual wear and latest
              fashion-wear. BSK is the brand for younger people, and always caters to the interests
              and needs of this public by basing its collection on their taste in music, their
              idols, rock stars and so on. The men’s section offers much more than fashionable jeans
              wear for young people. This product line offers casual, sports and fashion wear as
              well. In addition, apart from the wide range of clothing, Bershka also offers a wide
              range of accessories and footwear.
            </Typography>
          </Box>
          <img src="/img/company09.jpg" alt="company09" />
        </Grid>

        <Grid item xs={12} md={12} lg={6} mb={10}>
          <img src="/img/company03.jpg" alt="company03" style={{ width: "60%" }} />
          <Typography variant="h5" style={style.title}>
            THE CONCEPT
          </Typography>
          <q style={style.quote}>
            Music, screens, projections, modern graphics,fashionable, colours...
          </q>
          <Typography sx={style.paragraph}>
            Bershka shops are distinguished throughout the world by their strategic location and
            well-detailed architecture. The establishments are converted into spacious trend-setting
            showcases with a carefully thought through image extending from the windows to th
            arrangement of the goods inside. Bershka selects the best commercial sites in each city
            and positions itself in the most notable areas of the main shopping centres. Unique
            buildings are often chosen, which the Bershka architectural studio refurbish and adapt
            to its brand image and philosophy.
          </Typography>
          <Box sx={style.arrowWrapper} onClick={() => handleHide3()}>
            <Button sx={style.btn} disableRipple>
              Read more
            </Button>
            <span className="arrow"></span>
          </Box>
          <Box className="expand">
            <Typography sx={style.paragraph} className={toggle3 ? "paragraph active" : "paragraph"}>
              Music, screens, projections, modern graphics, fashionable colours, contemporary
              furniture design, state-of-the-art lighting and so on, are all features that turn
              Bershka into a shopping ‘experience’. The shop’s interior is designed to give maximum
              importance to displaying fashion. The layout, music, lighting, furniture, graphics and
              the materials used have been designed and carefully chosen to provide maximum freedom
              to customers as they discover the latest fashion trends. All the shop’s elements are
              designed by the Bershka image team and are updated every season. Bershka shops are
              designed to be appealing to young people in a space where they feel comfortable, which
              means the shops are fun. While browsing, choosing and trying on clothes, they can
              listen to the latest music and check out urban art trends displayed in the graphics
              and photo sessions featured in the shop decoration. Bershka attaches great importance
              to its windows, displaying the most important items of the collection and the
              predominant theme to its public. The windows are constantly being renewed every season
              and the garments match the style of the shop’s interior, reflecting the trends of the
              whole season. The new Bershka shop concept transforms the entire shopping space into a
              shop window, leaving a large glass front that allows the whole shop and complete
              collection to be seen.
            </Typography>
          </Box>
          <img
            src="/img/company12.jpg"
            alt="company12"
            style={{ width: "70%", marginBottom: "2rem" }}
          />
          <br />
          <q style={style.quote}>
            The men’s section offers much more than fashionable jeans wear for young people
          </q>
          <br />
          <img
            src="/img/company10.jpg"
            alt="company10"
            style={{ width: "70%", margin: "2rem 0" }}
          />
          <br />
          <q style={style.quote}>
            Bershka's public is characterized by adventurous young people, who are aware of the
            latest trends and are interested in music, social networks and new technologies
          </q>
        </Grid>
      </Grid>
    </Box>
  );
};

export default About;
