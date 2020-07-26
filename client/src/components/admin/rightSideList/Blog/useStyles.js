import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  rootList: {
    width: "100%",
    maxWidth: 360,
    height: 245,
    overflowY: "hidden",
    backgroundColor: theme.palette.background.paper,
    "&:hover": {
      overflow: "auto",
      paddingRight: "1px",
    },
  },
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

export default useStyles;


