import React from "react";
import Layout from "../components/pageoutline/Layout";
import initialize from "../utils/functions/initialize";
import Typography from "@material-ui/core/Typography";
import Home from "../components/home/Home";
import StickyFooter from "../components/pageoutline/Footer/Footer";

function Index() {
  return (
    <>
      <Layout>
        <Home />
      </Layout>
      <StickyFooter />
    </>
  );
}

Index.getInitialProps = async (ctx) => {
  initialize(ctx);
};

export default Index;
