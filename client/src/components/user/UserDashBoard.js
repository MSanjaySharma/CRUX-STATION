import React from "react";
import { connect } from "react-redux";
import clsx from "clsx";

import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";

import LeftSideList from "./LeftSideList";
//import Blog2point0 from "./RightSideList/Blog/Blog2.0";
import BlogUpdate from "./RightSideList/BlogUpdate/BlogUpdate";
import ProfileUpdate from "../profile/ProfileUpdate";

import Blog2point0 from "../admin/rightSideList/Blog/Blog2.0";
//import BlogUpdate from "../admin/rightSideList/BlogUpdate.js/BlogUpdate";

const drawerWidth = 180;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerOpen: {
    top: "64.5px",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    top: "64.5px",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

function UserDashboardComp() {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
        onMouseOver={handleDrawerOpen}
        onMouseLeave={handleDrawerClose}
      >
        <div className={classes.toolbar} />

        <LeftSideList
          setSelectedIndex={setSelectedIndex}
          selectedIndex={selectedIndex}
        />
      </Drawer>
      <div className={classes.content}>
        {selectedIndex === 0 && <Blog2point0 />}
        {selectedIndex === 1 && <BlogUpdate />}
        {selectedIndex === 2 && <ProfileUpdate />}
      </div>
    </div>
  );
}

/* const mapStateToProps = (state) => ({});

const mapDispatchToProps = { startGetCategories, startGetTags };

export default connect(mapStateToProps, mapDispatchToProps)(UserDashboardComp); */

export default UserDashboardComp;
