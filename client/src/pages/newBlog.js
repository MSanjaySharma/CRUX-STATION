import React from "react";
import Layout from "../components/pageoutline/Layout";
import withPrivateRoute from "../utils/components/withPrivateRoute";

import Blog2point0 from "../components/admin/rightSideList/Blog/Blog2.0";
import StickyFooter from "../components/pageoutline/Footer/Footer";

function NewBlog() {
  return (
    <>
      <Layout>
        <Blog2point0 modified={true}/>
      </Layout>
      <StickyFooter/>
    </>
  );
}

export default withPrivateRoute(NewBlog);
