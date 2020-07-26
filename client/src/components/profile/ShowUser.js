import React from "react";

import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles } from "@material-ui/core/styles";
import moment from "moment";
import { API } from "../../../config";

const useStyles = makeStyles((theme) => ({
  large: {
    width: theme.spacing(17),
    height: theme.spacing(17),
  },
}));

function ShowUser({ user }) {
  const classes = useStyles();
  return (
    <>
      <Grid item style={{ width: "100%" }}>
        <Paper
          elevation={3}
          style={{ maxWidth: "1200px", margin: "auto", padding: "16px" }}
        >
          <Grid container direction="row" justify="center" alignItems="stretch">
            <Grid item xs={2}>
              <Avatar src={`${API}/users/photo/${user.username}`} className={classes.large} />
            </Grid>
            <Grid item xs={10}>
              <Grid
                container
                direction="column"
                justify="center"
                alignItems="center"
                spacing={1}
              >
                <Grid item xs={12} style={{ width: "100%" }}>
                  <Typography variant="h6">{`${user.name[0].toUpperCase()}${user.name.slice(
                    1
                  )}`}</Typography>
                  <Typography variant="body1">{`@${
                    user.username
                  } | Joined ${moment(user.createdAt).fromNow()}`}</Typography>
                </Grid>
                <Grid item xs={12} style={{ width: "100%" }}>
                  <Typography>{user.about}</Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </>
  );
}

export default ShowUser;
