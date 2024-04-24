import "../styles/globals.css";
import type { AppProps } from "next/app";
import { AuthContextProvider } from '../context/AuthProvider'
import Layout from "@/layout";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthContextProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AuthContextProvider>
  );
}
