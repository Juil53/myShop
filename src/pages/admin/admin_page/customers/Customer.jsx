import { Box, Grid, Paper, Typography } from "@mui/material";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import List from "../../../../components/admin/List";
import MonthChart from "../../../../components/admin/MonthChart";
import { months } from "../dashboard/date";
import { db } from "../../../../service/auth";
import { useSelector } from "react-redux";
import { selectOrderData } from "../../../../store/orders/selector";
import Breadcrumb from "../../../../components/breadcumb/BreadCumb";

const CURRENT_MONTH = new Date().getMonth() + 1;
const style = {
  information: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  avatar: {
    borderRadius: "50%",
    marginBottom: "1rem",
    width: "200px",
    height: "190px",
    padding: "1rem",
  },
};

const Customer = () => {
  const params = useParams();
  const [data, setData] = useState({});
  const ordersData = useSelector(selectOrderData);
  const pages = [
    {
      name: "Admin",
      url: "/admin",
    },
    {
      name: "Customers",
      url: "/admin/customers",
    },
    {
      name: data.displayName,
      url: "",
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      const docRef = doc(db, "customers", params.id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setData(docSnap.data());
      } else {
        console.log("No such document!");
      }
    };
    fetchData();
  }, []);

  return (
    <Box>
      <Breadcrumb pages={pages}/>
      <Grid container columnSpacing={1}>
        <Grid component={Paper} elevation={8} item xs={5} sx={style.information}>
          <Box>
            <Typography
              sx={{ fontSize: "2rem", flexGrow: 1 }}
              color="text.disabled"
              textAlign="center"
              padding={1}
            >
              Infomation
            </Typography>
            <img
              src={data.image ? data.image : "/img/default_avatar.png"}
              alt="avatar"
              style={style.avatar}
            />
          </Box>

          <Box textAlign="left" sx={{ flexGrow: 2, marginLeft: 3 }}>
            <Typography component="h2" sx={{ fontWeight: "700", fontSize: "2rem" }} padding={1}>
              {data.displayName}
            </Typography>
            <Typography component="p" color="text.secondary" padding={1}>
              Email: {data.email}
            </Typography>
            <Typography component="p" color="text.secondary" padding={1}>
              Phone: {data.phoneNumber}
            </Typography>
            <Typography component="p" color="text.secondary" padding={1}>
              Address: {data.homeAddress}
            </Typography>
            <Typography component="p" color="text.secondary" padding={1}>
              Rank: {data.rank}
            </Typography>
          </Box>
        </Grid>

        <Grid item xs={7}>
          <MonthChart
            aspect={3 / 1}
            title="User Spending (Last 6 Months)"
            month={CURRENT_MONTH}
            orders={ordersData}
          />
        </Grid>

        <Grid item xs={12} mt={1} component={Paper} elevation={8}>
          <List />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Customer;
