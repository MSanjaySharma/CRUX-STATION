import React from "react";
import Router from "next/router";

import Chip from "@material-ui/core/Chip";
import Avatar from "@material-ui/core/Avatar";
import useStyles from "./useStyles";

function ShowAllCategories({ categories, size, color, variant, avatar }) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      {categories.map((category, i) => (
        <Chip
          key={i}
          label={category.name}
          avatar={avatar ? <Avatar>#</Avatar> : <></>}
          onClick={() => Router.push(`/categories/${category.slug}`)}
          size={size ? size : "small"}
          color={color ? color : "primary"}
          variant={variant ? variant : "outlined"}
          //style={{ marginRight: "5px" }}
          //style={{ borderStyle: "none" }}
        />
      ))}
    </div>
  );
}

export default ShowAllCategories;
