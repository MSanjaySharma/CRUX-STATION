import React from "react";
import Router from "next/router";
import { isServer } from "../functions/isServer";
import {
  reauthenticate,
  removeUserToken,
} from "../../redux/actions/userActions";
import { getCookie } from "../functions/cookie";
import axios from "../../config/axios";

const home = "/"; // home route address.

const checkUserAuthentication = async (req, store) => {
  if (isServer()) {
    let promise = new Promise((resolve, reject) => {
      if (req.headers.cookie) {
        axios
          .get("/users/isAdmin", {
            headers: {
              Authorization: getCookie("token", req),
            },
          })
          .then((response) => {
            const data = response.data;
            store.dispatch(reauthenticate(getCookie("token", req)));
            resolve(data);
          })
          .catch((err) => {
            store.dispatch(removeUserToken());
            resolve({ isAdmin: false });
          });
      } else {
        resolve({ isAdmin: false });
      }
    });
    let result = await promise;
    return result;
  } else {
    const isAdmin = store.getState().user?.userInfo?.role;
    return isAdmin ? { isAdmin } : { isAdmin: false };
  }
};

export default (WrappedComponent) => {
  const hocComponent = ({ ...props }) => <WrappedComponent {...props} />;

  hocComponent.getInitialProps = async ({ req, res, store }) => {
    const userAuth = await checkUserAuthentication(req, store);

    // Are you an authorized user or not?
    if (!userAuth?.isAdmin) {
      // Handle server-side and client-side rendering.
      if (isServer()) {
        res.writeHead(302, {
          Location: home,
        });
        res.end();
        return;
      } else {
        Router.replace(home);
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

/*     console.log("inside server Admin check");
    if (req.headers.cookie) {
      console.log("inside");
      axios
        .get("/users/isAdmin", {
          headers: {
            Authorization: getCookie("token", req),
          },
        })
        .then((response) => {
          const data = response.data;
          console.log("inside then", data);
          store.dispatch(reauthenticate(getCookie("token", req)));
          return { isAdmin: true };
        })
        .catch((err) => {
          console.log(err);
          console.log("inside err axios");
          store.dispatch(removeUserToken());
          return { isAdmin: false };
        });
    }
    return { isAdmin: false }; */
