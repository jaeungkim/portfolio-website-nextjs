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

export default function Introduction() {
  return (
    <motion.div variants={sectionVariants} className="py-[64px]">
      <p>hello</p>
    </motion.div>
  );
}
