import React from "react";
import Layout from "../../components/pageoutline/Layout";
import withAdminRoute from "../../utils/components/withAdminRoute";
import RevampedAdminDashBoard from "../../components/admin/RevampDashboard";

import StickyFooter from "../../components/pageoutline/Footer/Footer";

function AdminDashboard() {
  return (
    <>
      <Layout>
        <RevampedAdminDashBoard />
      </Layout>
      <StickyFooter />
    </>
  );
}
export default withAdminRoute(AdminDashboard);
