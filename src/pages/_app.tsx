import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "../chakra/theme";
import { RecoilRoot } from "recoil";
import type { AppProps } from "next/app";
import Layout from "../components/Layout/Layout";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <ChakraProvider theme={theme}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ChakraProvider>
    </RecoilRoot>
  );
}

export default MyApp;
