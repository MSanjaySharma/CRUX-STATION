import { removeCookie } from "./cookie";

export default (dispatch) => {
  removeCookie("token");
  dispatch({ type: "PURGE_USERS" });
  dispatch({ type: "PURGE_CATEGORIES" });
  dispatch({ type: "PURGE_TAGS" });
  dispatch({ type: "PURGE_BLOGS" });
  window.location.href = "/signInSessionExpired?redirected=true";
};
