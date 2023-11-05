import "@/styles/global.css";
import { motion } from "framer-motion";
import { ThemeProvider, useTheme } from "next-themes";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import "prismjs/themes/prism-okaidia.css";
import dynamic from "next/dynamic";

const Loader = dynamic(() => import("../components/Loader"), { ssr: false });

function App({ Component, pageProps }: any) {
  const [initialScreen, setInitialScreen] = useState<null | boolean>(true);
  const [isAnimating, setIsAnimating] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const hasBeenShown = sessionStorage.getItem("initialScreenShown");

    if (!hasBeenShown) {
      setTimeout(() => {
        setInitialScreen(false);
        sessionStorage.setItem("initialScreenShown", "true");
      }, 3000);
    } else {
      setInitialScreen(false);
    }
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

  if (initialScreen === null) {
    return null;
  }

  return (
    <ThemeProvider enableSystem={true} attribute="class">
      {initialScreen ? (
        <Loader />
      ) : (
        <ThemeInitializer>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.75 }}
          >
            <Component {...pageProps} />
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
        </ThemeInitializer>
      )}
    </ThemeProvider>
  );
}

function ThemeInitializer({ children }: any) {
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");

    // Set the theme to the stored theme or 'dark' if not found
    setTheme(storedTheme || "dark");
  }, [theme]);

  useEffect(() => {
    // Store the selected theme in localStorage
    localStorage.setItem("theme", theme);
  }, [theme]);

  return children;
}

export default App;
