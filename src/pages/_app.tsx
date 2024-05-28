import "../styles/globals.css";
import type { AppProps } from "next/app";
import { AuthContextProvider } from "../context/AuthProvider";
import Layout from "@/layout";
import { useEffect } from "react";
import Cookies from "js-cookie";
import { useAuthContext } from "@/context/AuthContext";
import { useRouter } from "next/router";
import { GlobalStyles, createTheme, ThemeProvider } from "@mui/material";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#FFDE07",
    },
    secondary: {
      main: "#151515",
    },
    // a cor base do tema
    background: {
      default: "#FFF",
    },
  },
});

export default function App({ Component, pageProps }: AppProps) {
  const { userAuth, logout } = useAuthContext();

  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get("sendflow.token");

    const excludedRoutes = ["/signIn", "/signUp"];

    if (excludedRoutes.includes(router.pathname)) {
      return;
    }

    if (!token) {
      Cookies.remove("sendflow.token");
      router.push("/signIn");
    } else {
      router.push("/");
    }
  }, [userAuth]);

  return (
    <AuthContextProvider>
      <ThemeProvider theme={theme}>
        <GlobalStyles
          styles={{
            body: { backgroundColor: "#151515" },
            input: { color: "white", borderColor: "white" },
            "input::placeholder": { color: "white" },
            "input:focus": { borderColor: "white" },
          }}
        />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </AuthContextProvider>
  );
}
