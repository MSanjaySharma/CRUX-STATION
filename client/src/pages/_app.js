import App from "next/app";
import { useState } from "react";
import { wrapper } from "../redux/store/configureStore";
import { useStore } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import Loader from "../utils/components/Loader";
import "../styles/globalStyles/link.css";
import "../styles/globalStyles/nprogress.css";
import "../../node_modules/react-quill/dist/quill.snow.css";

import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import themeDark from "../utils/functions/themeDark";
import themeLight from "../utils/functions/themeLight";
import useDarkMode from "use-dark-mode";

function MyApp({ Component, pageProps }) {
  const store = useStore((state) => state);

  const { value: isDark } = useDarkMode(true);

  store.subscribe(() => {
    console.log(store.getState());
  });

  return (
    <PersistGate persistor={store.__persistor} loading={<Loader />}>
      <ThemeProvider theme={isDark ? themeDark : themeLight}>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
      {/* <Component {...pageProps} /> */}
    </PersistGate>
  );
}

MyApp.getInitialProps = async ({ Component, ctx }) => {
  return {
    pageProps: {
      // Call page-level getInitialProps
      ...(Component.getInitialProps
        ? await Component.getInitialProps(ctx)
        : {}),
      // Some custom thing for all pages
      appProp: ctx.pathname,
    },
  };
};

export default wrapper.withRedux(MyApp);
