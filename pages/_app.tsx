import Amplify from "aws-amplify";
import { ChakraProvider } from "@chakra-ui/react";
import config from "../aws-config";
import Layout from "../components/layout";

Amplify.configure({
  ...config,
  ssr: true,
});

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ChakraProvider>
  );
}

export default MyApp;
