import "../styles/global.css";
import { motion } from "framer-motion";
import { ThemeProvider } from "next-themes";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import "prismjs/themes/prism-okaidia.css";
import Loader from "../components/Loader";
import { Analytics } from '@vercel/analytics/react';
import MouseFollower from "mouse-follower";
import gsap from "gsap";

MouseFollower.registerGSAP(gsap);

function App({ Component, pageProps }) {
  const [initialScreen, setInitialScreen] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (document.querySelector(".mf-container")) {
      const cursor = new MouseFollower({
        container: ".mf-container",
        speed: 0.3,
      });
    }
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setInitialScreen(false);
    }, 3000);
  }, []);

  useEffect(() => {
    const handleRouteChangeStart = () => {
      setIsAnimating(true);
    };

    const handleRouteChangeComplete = () => {
      setIsAnimating(false);
    };

    router.events.on("routeChangeStart", handleRouteChangeStart);
    router.events.on("routeChangeComplete", handleRouteChangeComplete);

    return () => {
      router.events.off("routeChangeStart", handleRouteChangeStart);
      router.events.off("routeChangeComplete", handleRouteChangeComplete);
    };
  }, [router]);

  return (
    <ThemeProvider enableSystem={true} attribute="class">
      {initialScreen ? (
        <Loader />
      ) : (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.75 }}
          >
            <div className="mf-container">
              <Component {...pageProps} />
              <Analytics />
            </div>
          </motion.div>
          {isAnimating && (
            <motion.div
              key={router.route}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.75 }}
            />
          )}
        </>
      )}
    </ThemeProvider>
  );
}

export default App;
