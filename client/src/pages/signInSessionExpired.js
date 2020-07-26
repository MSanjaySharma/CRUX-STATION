import Layout from "../components/pageoutline/Layout";
import SigninComponentFormik from "../components/authentication/signin/SiginComponentFormik";
import withPublicRoute from "../utils/components/withPublicRoute";

import { Typography } from "@material-ui/core";
import StickyFooter from "../components/pageoutline/Footer/Footer";

const SigninSessionExpired = () => {
  return (
    <>
      <Layout>
        <Typography align="center">SESSION EXPIRED!!! SIGN IN AGAIN</Typography>
        <SigninComponentFormik />
      </Layout>
      <StickyFooter modified={"30vh"} />
    </>
  );
};

export default withPublicRoute(SigninSessionExpired);
