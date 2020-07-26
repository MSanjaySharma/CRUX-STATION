import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    minWidth: 60,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default useStyles;
