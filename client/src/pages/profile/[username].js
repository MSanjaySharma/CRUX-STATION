const { startUserPublicProfile } = require("../../redux/actions/userActions");
import Layout from "../../components/pageoutline/Layout";
import ErrorPage from "next/error";

import React from "react";
import UserProfileComp from "../../components/profile/UserProfile";
import StickyFooter from "../../components/pageoutline/Footer/Footer";

function UserProfile({ user, blogs, error }) {
  const [err, setError] = React.useState(error);
  return (
    <>
      {err && <ErrorPage statusCode={404} />}
      {!err && (
        <Layout>
          <UserProfileComp user={user} blogs={blogs} />
        </Layout>
      )}
      <StickyFooter/>
    </>
  );
}

UserProfile.getInitialProps = ({ query }) => {
  return startUserPublicProfile(query.username).then((data) => {
    if (data.error) {
      return { error: data.error };
    } else {
      return { user: data.user, blogs: data.blogs };
    }
  });
};

export default UserProfile;
