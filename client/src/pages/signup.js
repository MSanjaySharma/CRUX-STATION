import Layout from "../components/pageoutline/Layout";
import SignupComponentFormik from "../components/authentication/signup/SignupComponentFormik";
import withPublicRoute from "../utils/components/withPublicRoute";
import StickyFooter from "../components/pageoutline/Footer/Footer";

const Signup = () => {
  return (
    <>
      <Layout>
        <SignupComponentFormik />
      </Layout>
      <StickyFooter modified={"25vh"} />
    </>
  );
};

export default withPublicRoute(Signup);
