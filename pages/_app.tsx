import "@/styles/global.css";
import "prismjs/themes/prism-okaidia.css";
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
  const [initialScreen, setInitialScreen] = useState<boolean | null>(true);
  const [isAnimating, setIsAnimating] = useState(false);
  const router = useRouter();

  const isResumePage = router.pathname === "/resume";

  useEffect(() => {
    const handleInitialScreen = () => {
      const hasBeenShown = localStorage.getItem("initialScreenShown");

      if (!hasBeenShown) {
        setTimeout(() => {
          setInitialScreen(false);
          localStorage.setItem("initialScreenShown", "true");
        }, 3000);
      } else {
        setInitialScreen(false);
      }
    };

    handleInitialScreen();
  }, []);

  useEffect(() => {
    const handleRouteChange = (isStart: boolean) => () =>
      setIsAnimating(isStart);

    router.events.on("routeChangeStart", handleRouteChange(true));
    router.events.on("routeChangeComplete", handleRouteChange(false));

    return () => {
      router.events.off("routeChangeStart", handleRouteChange(true));
      router.events.off("routeChangeComplete", handleRouteChange(false));
    };
  }, [router]);

  if (initialScreen === null) {
    return null;
  }

  if (isResumePage) {
    return <Component {...pageProps} />;
  }

  return (
    <ThemeProvider enableSystem={true} attribute="class" defaultTheme="dark">
      {initialScreen ? (
        <Loader />
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.75 }}
        >
          <Component {...pageProps} />
          {isAnimating && (
            <motion.div
              key={router.route}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.75 }}
            />
          )}
        </motion.div>
      )}
    </ThemeProvider>
  );
};

export default App;
