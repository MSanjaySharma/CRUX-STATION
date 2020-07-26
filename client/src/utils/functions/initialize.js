import Router from "next/router";
import { getCookie } from "./cookie";
import { reauthenticate } from "../../redux/actions/userActions";
import { isServer } from "./isServer";

// checks if the page is being loaded on the server, and if so, get auth token from the cookie:
export default function (ctx) {
  if (isServer()) {
    if (ctx.req.headers.cookie) {
      ctx.store.dispatch(reauthenticate(getCookie("token", ctx.req)));
    }
  } else {
    const token = ctx.store.getState().user.token;

    if (token && (ctx.pathname === "/signin" || ctx.pathname === "/signup")) {
      setTimeout(function () {
        Router.push("/");
      }, 0);
    }
  }
}
