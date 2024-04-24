import "../styles/globals.css";
import type { AppProps } from "next/app";
import { AuthContextProvider } from '../context/AuthProvider'
import Layout from "@/layout";
import { useEffect } from "react";
import Cookies from "js-cookie";
import { useAuthContext } from "@/context/AuthContext";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }: AppProps) {

  const { userAuth ,logout } = useAuthContext();

  const router = useRouter();

useEffect(() => {
  const token = Cookies.get('sendflow.token')

  const excludedRoutes = ['/signIn', '/signUp'];

  if (excludedRoutes.includes(router.pathname)) {
    return;
  }
  
  if (!token) {
    Cookies.remove('sendflow.token');
    router.push('/signIn');
  } else {
      router.push('/');
  }
}, [userAuth]);

  return (
    <AuthContextProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AuthContextProvider>
  );
}
