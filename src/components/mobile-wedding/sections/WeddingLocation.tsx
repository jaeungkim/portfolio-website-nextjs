import { motion } from "motion/react";

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut" as const,
    },
  },
};

export default function WeddingLocation() {
  return (
    <motion.div
      className="flex flex-col items-center justify-center px-6 text-center"
      variants={sectionVariants}
    >
      <p>wedding countdown</p>
    </motion.div>
  );
}
