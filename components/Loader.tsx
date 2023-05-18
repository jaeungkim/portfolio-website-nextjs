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
  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ ease: "easeOut", delay: 1.0, duration: 2.5 }}
      className={`flex justify-center items-center h-screen w-screen absolute top-0 transition-opacity duration-1000 overflow-hidden`}
    >
      <p className="text-7xl">JAEUNG KIM</p>
    </motion.div>
  );
}
