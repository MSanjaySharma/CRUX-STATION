import Layout from "../components/pageoutline/Layout";
import SigninComponentFormik from "../components/authentication/signin/SiginComponentFormik";
import withPublicRoute from "../utils/components/withPublicRoute";
import StickyFooter from "../components/pageoutline/Footer/Footer";

const Signin = () => {
  return (
    <>
      <Layout>
        <SigninComponentFormik />
      </Layout>
      <StickyFooter modified={"30vh"} />
    </>
  );
};

export default withPublicRoute(Signin);
