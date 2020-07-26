import React from "react";
import Layout from "../../components/pageoutline/Layout";
import withPrivateRoute from "../../utils/components/withPrivateRoute";
import UserDashBoardComp from "../../components/user/UserDashBoard";
import StickyFooter from "../../components/pageoutline/Footer/Footer";
function UserDashboard() {
  return (
    <>
      <Layout>
        <UserDashBoardComp />
      </Layout>
      <StickyFooter />
    </>
  );
}

export default withPrivateRoute(UserDashboard);
