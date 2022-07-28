import AccountBoxIcon from "@mui/icons-material/AccountBox";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import DashboardIcon from "@mui/icons-material/Dashboard";
import EmojiPeopleIcon from "@mui/icons-material/EmojiPeople";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import LocalGroceryStoreIcon from "@mui/icons-material/LocalGroceryStore";
import LogoutIcon from "@mui/icons-material/Logout";
import MailIcon from "@mui/icons-material/Mail";
import StoreIcon from "@mui/icons-material/Store";
import {
  AppBar,
  Avatar,
  Badge,
  Box,
  Button,
  Divider,
  Drawer,
  Fade,
  Grid,
  List,
  ListItemIcon,
  ListItemText,
  Paper,
  Popper,
  Stack,
  styled,
  Toolbar,
  Typography
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { LOADING_STATUS, USER_ACTIONS } from "../../constants";
import localStorage from "../../service/localStorage";
import { loginAdmin } from "../../store/users/selector";
import { getLoginUserInfoRequest } from "../../store/users/usersSlice";
import {
  CustomeNavlink,
  CustomizedListItemButton,
  CustomizeToolbar
} from "../../styles/styled_components/styledComponent";

const drawerWidth = "25rem";

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const NewDrawer = styled(Drawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    zIndex: theme.zIndex.drawer + 1,
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const MyAppBar = styled(AppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

function MyDrawer() {
  const dispatch = useDispatch();

  const [open, setOpen] = React.useState(true);
  const [popper, setPopper] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setPopper((previousOpen) => !previousOpen);
  };

  const token = localStorage.get("admin");

  const canBeOpen = popper && Boolean(anchorEl);
  const id = canBeOpen ? "transition-popper" : undefined;

  const user = useSelector(loginAdmin);

  React.useEffect(() => {
    if (user.status === LOADING_STATUS.IDLE && token) {
      dispatch(getLoginUserInfoRequest());
    }
  });

  const itemList = [
    {
      text: "Dashboard",
      icon: <DashboardIcon />,
      href: "/admin/dashboard",
    },
    {
      text: "Product",
      icon: <FormatListBulletedIcon />,
      href: "/admin/products",
    },
    {
      text: "Orders",
      icon: <LocalGroceryStoreIcon />,
      href: "/admin/orders",
    },
    {
      text: "Customers",
      icon: <EmojiPeopleIcon />,
      href: "/admin/customers",
    },
  ];

  const itemList_admin = [
    {
      text: "Dashboard",
      icon: <DashboardIcon />,
      href: "/admin/dashboard",
    },
    {
      text: "Users",
      icon: <AccountBoxIcon />,
      href: "/admin/users",
    },
    {
      text: "Products",
      icon: <FormatListBulletedIcon />,
      href: "/admin/products",
    },
    {
      text: "Orders",
      icon: <LocalGroceryStoreIcon />,
      href: "/admin/orders",
    },
    {
      text: "Customers",
      icon: <EmojiPeopleIcon />,
      href: "/admin/customers",
    },
  ];

  const handleSignout = () => {
    dispatch({ type: USER_ACTIONS.ADMIN_SIGNOUT });
    window.location.reload();
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <>
      {token && user.status === LOADING_STATUS.SUCCESS ? (
        <Box sx={{ display: "flex" }}>
          <MyAppBar position="fixed" open={open} elevation={1}>
            <CustomizeToolbar
              sx={{
                backgroundColor: "#e6eaf3",
                "&.MuiToolbar-root": {
                  minHeight: "45px",
                },
              }}
            >
              <Grid container justifyContent="space-between">
                <Grid item sx={open ? { paddingLeft: "25rem" } : { visibility: "hidden" }}>
                  <Typography variant="h5" color="#333"></Typography>
                </Grid>
                <Grid item>
                  <Stack spacing={3} direction="row" alignItems="center">
                    <Avatar
                      alt="Remy Sharp"
                      src={user?.data?.avatar}
                      sx={{
                        width: "30px",
                        height: "30px",
                        borderRadius: "50%",
                        border: "1px solid",
                        borderColor: "primary.main",
                        cursor: "pointer",
                        opacity: 0.8,
                        transition: "all 200ms",
                        "&:hover": {
                          opacity: 1,
                        },
                      }}
                      onClick={handleClick}
                    />

                    <Badge badgeContent={4} color="error">
                      <MailIcon color="primary" />
                    </Badge>

                    <Popper id={id} open={popper} anchorEl={anchorEl} transition>
                      {({ TransitionProps }) => (
                        <Fade {...TransitionProps} timeout={200}>
                          <Stack
                            sx={{ mt: 1, mr: 3, p: 1, textAlign: "left" }}
                            as={Paper}
                            elevation={2}
                          >
                            <Button>{user?.data?.lastname}</Button>
                            <Button onClick={handleSignout} endIcon={<LogoutIcon />}>
                              Log out
                            </Button>
                          </Stack>
                        </Fade>
                      )}
                    </Popper>
                  </Stack>
                </Grid>
              </Grid>
            </CustomizeToolbar>
          </MyAppBar>

          <NewDrawer
            variant="permanent"
            open={open}
            sx={{
              // height:'100%',
              background:
                "url(https://w0.peakpx.com/wallpaper/227/296/HD-wallpaper-game-of-thrones-got-jon-jon-snow-winter-is-coming-stark.jpg) center left",
              "& .MuiDrawer-paper": {
                backgroundColor: "primary.main",
                opacity: 0.9,
              },
            }}
          >
            <Grid
              container
              direction="column"
              sx={{ height: "100vh" }}
              justifyContent="space-between"
            >
              <Grid item>
                <Grid item>
                  <Toolbar className="adminToolbar" sx={{ paddingLeft: { xs: "16px" } }}>
                    {open ? (
                      <img
                        src="/img/logomyShopwhite.png"
                        alt="logo"
                        style={{ width: "100%", height: "100%" }}
                      />
                    ) : (
                      <StoreIcon sx={{ color: "#fff" }} />
                    )}
                  </Toolbar>
                </Grid>
                <Divider />
                <Grid item>
                  <List>
                    {user?.data?.role === "Admin"
                      ? itemList_admin.map((item, index) => {
                          const { text, icon, href } = item;
                          return (
                            <CustomeNavlink to={href} key={index}>
                              <CustomizedListItemButton>
                                <ListItemIcon sx={{ color: "#fff" }}>{icon}</ListItemIcon>
                                <ListItemText primary={text} />
                              </CustomizedListItemButton>
                              <Divider />
                            </CustomeNavlink>
                          );
                        })
                      : itemList.map((item, index) => {
                          const { text, icon, href } = item;
                          return (
                            <CustomeNavlink to={href} key={index}>
                              <CustomizedListItemButton>
                                <ListItemIcon sx={{ color: "#fff" }}>{icon}</ListItemIcon>
                                <ListItemText primary={text} />
                              </CustomizedListItemButton>
                              <Divider />
                            </CustomeNavlink>
                          );
                        })}
                  </List>
                </Grid>
              </Grid>

              <Grid item>
                <DrawerHeader sx={{ justifyContent: open ? "flex-end" : "flex-start" }}>
                  {!open ? (
                    <IconButton onClick={handleDrawerOpen}>
                      <ChevronRightIcon sx={{ color: "#fff" }} />
                    </IconButton>
                  ) : (
                    <IconButton onClick={handleDrawerClose}>
                      <ChevronLeftIcon sx={{ color: "#fff" }} />
                    </IconButton>
                  )}
                </DrawerHeader>
              </Grid>
            </Grid>
          </NewDrawer>
        </Box>
      ) : (
        <></>
      )}
    </>
  );
}

export default MyDrawer;
