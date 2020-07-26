import React from "react";
import Router from "next/router";
import { isServer } from "../functions/isServer";
import { reauthenticate } from "../../redux/actions/userActions";
import { getCookie } from "../functions/cookie";

const login = "/signin?redirected=true"; // login route address.

const checkUserAuthentication = (req, store) => {
  if (isServer()) {
    if (req.headers.cookie) {
      store.dispatch(reauthenticate(getCookie("token", req)));
      return { isAuthenticated: true };
    }
    return { isAuthenticated: false };
  } else {
    const token = store.getState().user.token;
    return token ? { isAuthenticated: true } : { isAuthenticated: false };
  }
};

export default (WrappedComponent) => {
  const hocComponent = ({ ...props }) => <WrappedComponent {...props} />;

  hocComponent.getInitialProps = async ({ req, res, store }) => {
    const userAuth = await checkUserAuthentication(req, store);

    // Are you an authorized user or not?
    if (!userAuth?.isAuthenticated) {
      // Handle server-side and client-side rendering.
      if (isServer()) {
        res.writeHead(302, {
          Location: login,
        });
        res.end();
        return;
      } else {
        Router.replace(login);
      }
    } else if (WrappedComponent.getInitialProps) {
      //if we authenticated call the wrapped components getinitial props and pass userAuth function
      const wrappedProps = await WrappedComponent.getInitialProps(userAuth);
      return { ...wrappedProps, userAuth };
    }

    return { userAuth };
  };

  return hocComponent;
};
