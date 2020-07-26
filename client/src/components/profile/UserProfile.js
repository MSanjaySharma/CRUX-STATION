import React from "react";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import ShowUser from "./ShowUser";
import RelatedBlogCard from "../blogs/RelatedBlogCard";

function UserProfileComp({ user, blogs }) {
  return (
    <>
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
        spacing={4}
        style={{ maxWidth: "1350px" }}
      >
        <Grid item style={{ width: "100%", paddingTop: "5vh" }}>
          <ShowUser user={user} />
        </Grid>
        <Grid item style={{ width: "100%" }}>
          <Typography variant="h5" align="center">
            RECENTLY POSTED
          </Typography>
        </Grid>
        <Grid item style={{ width: "100%" }}>
          <Grid
            container
            direction="row"
            justify="center"
            alignItems="stretch"
            spacing={4}
          >
            {blogs.length ? (
              <RelatedBlogCard relatedBlogs={blogs} />
            ) : (
              <Grid item>
                <img src="/empty.png" alt="no blogs" />
              </Grid>
            )}
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

export default UserProfileComp;
