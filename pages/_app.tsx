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
  const [initialScreen, setInitialScreen] = useState<boolean>(true);
  const [isAnimating, setIsAnimating] = useState(false);
  const router = useRouter();
  const isResumePage = router.pathname === "/resume";

  useEffect(() => {
    if (!localStorage.getItem("initialScreenShown")) {
      setTimeout(() => {
        setInitialScreen(false);
        localStorage.setItem("initialScreenShown", "true");
      }, 3000);
    } else {
      setInitialScreen(false);
    }
  }, []);

  useEffect(() => {
    const handleRouteChange = (start: boolean) => () => setIsAnimating(start);

    router.events.on("routeChangeStart", handleRouteChange(true));
    router.events.on("routeChangeComplete", handleRouteChange(false));

    return () => {
      router.events.off("routeChangeStart", handleRouteChange(true));
      router.events.off("routeChangeComplete", handleRouteChange(false));
    };
  }, [router.events]);

  if (isResumePage) return <Component {...pageProps} />;
  if (initialScreen) return <Loader />;

  return (
    <ThemeProvider enableSystem attribute="class" defaultTheme="dark">
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
    </ThemeProvider>
  );
};

export default App;
