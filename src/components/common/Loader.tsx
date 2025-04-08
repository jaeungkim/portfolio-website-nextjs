"use client";

import { motion } from "framer-motion";
import { useEffect, useState, useMemo } from "react";

export default function Loader() {
  const [dValue, setDValue] = useState(
    "M2 2c49.7 2.6 125 3.1 400 7-46.5 3-600 20-200.2 15 45.2-1.5 90.6-1.8 135.8-.6"
  );

  useEffect(() => {
    const updatePath = () => {
      setDValue(
        window.innerWidth <= 640
          ? "M2 2c49.7 2.6 125 3.1 325 7-46.5 3-400 20-200.2 15 45.2-1.5 90.6-1.8 135.8-.6"
          : "M2 2c49.7 2.6 125 3.1 400 7-46.5 3-600 20-200.2 15 45.2-1.5 90.6-1.8 135.8-.6"
      );
    };

    updatePath();
    window.addEventListener("resize", updatePath);
    return () => window.removeEventListener("resize", updatePath);
  }, []);

  const pathVariants = useMemo(
    () => ({
      hidden: { pathLength: 0 },
      visible: {
        pathLength: 1,
        transition: { duration: 2, ease: "easeInOut" },
      },
    }),
    []
  );

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ ease: "easeOut", delay: 1.0, duration: 2.5 }}
      className="flex justify-center items-center h-screen w-screen absolute top-0 transition-opacity duration-1000 overflow-hidden"
    >
      <div className="relative mb-48 sm:mb-0">
        <p className="text-6xl sm:text-7xl">JAEUNG KIM</p>
        <svg
          className="absolute w-full stroke-black dark:stroke-white"
          xmlns="http://www.w3.org/2000/svg"
          role="presentation"
        >
          <motion.path
            d={dValue}
            strokeWidth="3"
            fill="transparent"
            variants={pathVariants}
            initial="hidden"
            animate="visible"
          />
        </svg>
      </div>
    </motion.div>
  );
}
