import Amplify from "aws-amplify";
import config from "../src/aws-exports";
import Layout from "../components/layout";

import "../styles/globals.css";

Amplify.configure({
  ...config,
  ssr: true,
});

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
