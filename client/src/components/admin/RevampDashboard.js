import React from "react";
import { connect } from "react-redux";
import clsx from "clsx";

import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";

import LeftSideList from "./LeftSideList";
import Category from "./rightSideList/Category";
import Tag from "./rightSideList/Tag";
import Blog2point0 from "./rightSideList/Blog/Blog2.0";
import BlogUpdate from "./rightSideList/BlogUpdate.js/BlogUpdate";
import ProfileUpdate from "../profile/ProfileUpdate";
import { startGetCategories } from "../../redux/actions/categoryActions";
import { startGetTags } from "../../redux/actions/tagActions";

import useStyles from "./useStyles";

function RevampDashboard() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.rootDashboard}>
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
        {selectedIndex === 0 && <Category />}
        {selectedIndex === 1 && <Tag />}
        {selectedIndex === 2 && <Blog2point0 />}
        {selectedIndex === 3 && <BlogUpdate />}
        {selectedIndex === 4 && <ProfileUpdate />}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = { startGetCategories, startGetTags };

export default connect(mapStateToProps, mapDispatchToProps)(RevampDashboard);
