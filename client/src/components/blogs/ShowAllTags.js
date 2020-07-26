import React from "react";
import Router from "next/router";

import Chip from "@material-ui/core/Chip";
import useStyles from "./useStyles";

function ShowAllTags({ tags }) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      {tags.map((tag, i) => (
        <Chip
          key={i}
          label={tag.name}
          onClick={() => Router.push(`/tags/${tag.slug}`)}
          size="small"
          color="secondary"
          variant="outlined"
          //style={{ marginRight: "5px" }}
          //style={{ borderStyle: "none" }}
        />
      ))}
    </div>
  );
}

export default ShowAllTags;
