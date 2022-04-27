import * as React from "react";
import { Link } from "react-router-dom";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { ListItemIcon, Toolbar } from "@mui/material";

import DashboardIcon from "@mui/icons-material/Dashboard";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";

function MyDrawer(props) {
  const { history } = props;
  const itemList = [
    {
      text: "Dashboard",
      icon: <DashboardIcon />,
      onClick: () => history.push("/dashboard"),
      href: "/dashboard",
    },
    {
      text: "User Management",
      icon: <AccountCircleIcon />,
      onClick: () => history.push("/user-management"),
      href: "/user-management",
    },
    {
      text: "Product Management",
      icon: <LibraryBooksIcon />,
      onClick: () => history.push("/product-management"),
      href: "/product-management",
    },
  ];

  return (
    <div className="drawer">
      {/* Drawer */}
      <Drawer variant="permanent">
        <Toolbar>
          <h1>Shopping</h1>
        </Toolbar>
        <List>
          {itemList.map((item, index) => {
            const { text, icon, href } = item;
            return (
              <Link to={href} key={index}>
                <ListItem button>
                  <ListItemIcon>{icon}</ListItemIcon>
                  <ListItemText primary={text} />
                </ListItem>
              </Link>
            );
          })}
        </List>
      </Drawer>
    </div>
  );
}

export default MyDrawer;
