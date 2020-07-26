import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function CustomizedSnackbars({
  changeState,
  message,
  error,
  redirect,
  reset,
}) {
  const handleCloseSuccess = (event, reason) => {
    changeState();
    if (Boolean(redirect)) {
      redirect();
    }
  };

  const handleClose = (event, reason) => {
    changeState();
  };

  return (
    <>
      {Boolean(message) && (
        <Snackbar
          anchorOrigin={
            Boolean(redirect)
              ? { vertical: "top", horizontal: "center" }
              : { vertical: "bottom", horizontal: "left" }
          }
          open={Boolean(message)}
          autoHideDuration={3000}
          onClose={Boolean(redirect) ? handleCloseSuccess : handleClose}
          style={{ marginTop: "50px" }}
        >
          {Boolean(message) && (
            <Alert
              onClose={Boolean(redirect) ? handleCloseSuccess : handleClose}
              severity="success"
            >
              {message}
            </Alert>
          )}
        </Snackbar>
      )}

      {Boolean(error) && (
        <Snackbar
          anchorOrigin={
            Boolean(redirect)
              ? { vertical: "top", horizontal: "center" }
              : { vertical: "bottom", horizontal: "left" }
          }
          open={Boolean(error)}
          autoHideDuration={3000}
          onClose={handleClose}
          style={{ marginTop: "50px" }}
        >
          {Boolean(error) && (
            <Alert onClose={handleClose} severity="error">
              {error}
            </Alert>
          )}
        </Snackbar>
      )}
    </>
  );
}
