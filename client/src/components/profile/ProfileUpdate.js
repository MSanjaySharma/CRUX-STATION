import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { API } from "../../../config";

import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles } from "@material-ui/core/styles";
import PhotoUpload from "../admin/rightSideList/Blog/PhotoUpload";
import CustomizedSnackbars from "../../utils/components/SnackBar";
import {schema, photoSchema} from "./schema";
import { startUserUpdate } from "../../redux/actions/userActions";

const useStyles = makeStyles((theme) => ({
  large: {
    width: theme.spacing(17),
    height: theme.spacing(17),
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export const ProfileUpdate = ({ user, startUserUpdate }) => {
  const [state, setState] = useState({
    username: user.username,
    name: user.name,
    email: user.email,
    password: "",
    error: "",
    message: "",
    photo: "",
    about: user.about,
  });

  const { username, name, email, password, photo, message, error } = state;

  const changeState = (message, error) => {
    setState({ ...state, message, error });
  };

  const handleChange = (e) => {
    const data = e.target.name === "photo" ? e.target.files[0] : e.target.value;
    setState({ ...state, [e.target.name]: data });
  };

  const handleSubmit = (values) => {
    console.log(values);
    const formData = new FormData();
    formData.append("username", values.username);
    formData.append("name", values.name);
    formData.append("email", values.email);
    formData.append("about", values.about);
    formData.append("password", values.password);
    formData.append("photo", photo);

    //validate the form
    if (photo) {
      const validateForm = {photo};

      photoSchema
        .validate(validateForm)
        .then((val) => {
          startUserUpdate(formData, changeState);
        })
        .catch((err) => {
          changeState("", err.message);
        });
    } else {
      changeState("", "Feature photo is required");
    }

  };

  const classes = useStyles();
  return (
    <>
      <Paper
        elevation={3}
        style={{ maxWidth: "1020px", margin: "auto", padding: "16px" }}
      >
        <Grid container direction="row" justify="center" alignItems="stretch">
          {/* LEFT SIDE */}
          <Grid item xs={2}>
            <Grid
              container
              direction="column"
              justify="center"
              alignItems="center"
              spacing={4}
            >
              <Grid item>
                <Avatar
                  src={`${API}/users/photo/${user.username}`}
                  className={classes.large}
                />
              </Grid>
              <Grid item>
                <PhotoUpload
                  imageName="PROFILE PICTURE"
                  handleChange={handleChange}
                />
              </Grid>
            </Grid>
          </Grid>
          {/* RIGHT SIDE */}
          <Grid item xs={10} style={{ paddingLeft: "50px" }}>
            <Grid
              container
              direction="column"
              justify="center"
              alignItems="center"
              spacing={1}
            >
              {/* FORM */}
              <Formik
                initialValues={state}
                onSubmit={(values) => handleSubmit(values)}
                validationSchema={schema}
              >
                {({
                  setFieldValue,
                  setFieldTouched,
                  values,
                  errors,
                  touched,
                }) => (
                  <Form className={classes.form}>
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <Field
                          variant="outlined"
                          required
                          fullWidth
                          name="username"
                          label="Username"
                          type="username"
                          id="username"
                          helperText={
                            <ErrorMessage name="username"></ErrorMessage>
                          }
                          error={touched.username && Boolean(errors.username)}
                          as={TextField}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Field
                          variant="outlined"
                          required
                          fullWidth
                          name="name"
                          label="Name"
                          type="name"
                          id="name"
                          helperText={<ErrorMessage name="name"></ErrorMessage>}
                          error={touched.name && Boolean(errors.name)}
                          as={TextField}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Field
                          variant="outlined"
                          required
                          fullWidth
                          id="email"
                          label="Email Address"
                          name="email"
                          helperText={
                            <ErrorMessage name="email"></ErrorMessage>
                          }
                          error={touched.email && Boolean(errors.email)}
                          as={TextField}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Field
                          variant="outlined"
                          required
                          fullWidth
                          multiline={true}
                          rowsMax={5}
                          rows={5}
                          name="about"
                          label="About"
                          id="about"
                          helperText={
                            <ErrorMessage name="about"></ErrorMessage>
                          }
                          error={touched.about && Boolean(errors.about)}
                          as={TextField}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Field
                          variant="outlined"
                          required
                          fullWidth
                          name="password"
                          label="Password"
                          type="password"
                          id="password"
                          helperText={
                            <ErrorMessage name="password"></ErrorMessage>
                          }
                          error={touched.password && Boolean(errors.password)}
                          as={TextField}
                        />
                      </Grid>
                    </Grid>
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      color="primary"
                      className={classes.submit}
                    >
                      UPDATE PROFILE
                    </Button>
                  </Form>
                )}
              </Formik>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
      <CustomizedSnackbars
        changeState={changeState}
        message={message}
        error={error}
      />
    </>
  );
};

const mapStateToProps = (state) => ({ user: state.user.userInfo });

const mapDispatchToProps = { startUserUpdate };

export default connect(mapStateToProps, mapDispatchToProps)(ProfileUpdate);

/* style={{
          backgroundImage: `url(${background})`,
          width: "100%",
          height: "100%",
          //backgroundSize: "100%",
          backgroundRepeat: "no-repeat",
          backgroundAttachment:"fixed"
        }} */
