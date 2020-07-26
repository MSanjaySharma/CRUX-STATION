import React from "react";
import Link from "next/link";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import MUILink from "@material-ui/core/Link";
import { APP_API } from "../../../../config";

function Copyright() {
  return (
    <Typography align="center" variant="body2" color="textSecondary">
      {"Copyright © "}
      <MUILink href={APP_API} color="inherit">
        Crux Station
      </MUILink>
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    minHeight: "20.8vh",
  },
  main: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(2),
  },
  footer: {
    padding: theme.spacing(3, 2),
    marginTop: "auto",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[200]
        : theme.palette.grey[800],
  },
  emptyClass: {

  }
}));

export default function StickyFooter({ modified }) {
  const classes = useStyles();

  return (
    <div
      className={!modified ? classes.root : classes.emptyClass}
      style={
        modified && {
          display: "flex",
          flexDirection: "column",
          minHeight: modified,
        }
      }
    >
      <CssBaseline />
      <footer className={classes.footer}>
        <Container maxWidth="sm">
          <Typography align="center" variant="body1">
            Made with ❤️ from Team CruxStation .
          </Typography>
          <Copyright />
        </Container>
      </footer>
    </div>
  );
}
