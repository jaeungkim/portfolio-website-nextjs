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
  const [initialScreen, setInitialScreen] = useState(() => {
    return (
      typeof window !== "undefined" &&
      !localStorage.getItem("initialScreenShown")
    );
  });

  useEffect(() => {
    if (initialScreen) {
      const timer = setTimeout(() => {
        setInitialScreen(false);
        localStorage.setItem("initialScreenShown", "true");
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [initialScreen]);

  if (initialScreen) return <Loader />;

  return (
    <ThemeProvider defaultTheme="dark">
      <Component {...pageProps} />
    </ThemeProvider>
  );
};

export default App;
