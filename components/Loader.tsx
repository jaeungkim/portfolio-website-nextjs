import { motion } from "framer-motion";
import { useEffect } from "react";

export default function Loader() {
  useEffect(() => {
    // Disable scroll on mount
    document.body.style.overflow = "hidden";
    // Re-enable scroll when component unmounts
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []); // Empty array ensures effect is only run on mount and unmount

  const pathVariants = {
    hidden: { pathLength: 0 },
    visible: {
      pathLength: 1,
      transition: {
        duration: 2,
        ease: "easeInOut",
      },
    },
  };

  return (
    <motion.div
      initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ ease: "easeOut", delay: 1.0, duration: 2.5 }}
      className={`flex justify-center items-center h-screen w-screen absolute top-0 transition-opacity duration-1000 overflow-hidden`}
    >
      <div className="relative">
        <p className="text-7xl">JAEUNG KIM</p>
        <svg className="absolute w-full" xmlns="http://www.w3.org/2000/svg">
          <motion.path
            d="M2 2c49.7 2.6 100 3.1 400 7-46.5 3-600 20-200.2 15 45.2-1.5 90.6-1.8 135.8-.6"
            stroke="white"
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
