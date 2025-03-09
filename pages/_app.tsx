import "@/styles/global.css";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { ThemeProvider } from "next-themes";
import { useRouter } from "next/router";
import { useEffect, useState, FC } from "react";

const Loader = dynamic(() => import("@/components/Loader"), { ssr: false });

interface AppProps {
  Component: FC;
  pageProps: any;
}

const App: FC<AppProps> = ({ Component, pageProps }) => {
  const [initialScreen, setInitialScreen] = useState(true);
  const router = useRouter();
  const isResumePage = router.pathname === "/resume";

  useEffect(() => {
    if (!localStorage.getItem("initialScreenShown")) {
      const timer = setTimeout(() => {
        setInitialScreen(false);
        localStorage.setItem("initialScreenShown", "true");
      }, 3000);
      return () => clearTimeout(timer);
    }
    setInitialScreen(false);
  }, []);

  if (isResumePage) return <Component {...pageProps} />;
  if (initialScreen) return <Loader />;

  return (
    <ThemeProvider defaultTheme="dark">
      <Component {...pageProps} />
    </ThemeProvider>
  );
};

export default App;
