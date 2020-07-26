import React from "react";
import Header from "./Header";

function Layout({ children }) {
  return (
    <>
      <Header />
      <div style={{ height: "64px" }} />
      {children}
    </>
  );
}

export default Layout;
