import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const ProjectSingle = ({ id, img, title, category }) => (
  <Link href={`/project/${id}`} passHref>
    <motion.div
      className="overflow-hidden rounded-md p-1 shadow-zinc-800/5 ring-1 ring-zinc-900/5 shadow-lg hover:shadow-xl cursor-pointer mb-4 sm:mb-0 bg-white/90 dark:bg-zinc-800/90"
      aria-label="Single Project"
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          ease: "easeInOut",
          duration: 0.7,
          delay: 0.15,
        }}
        className="w-full h-full relative rounded-md overflow-hidden"
      >
        <img
          src={img}
          alt="Single Project"
          className="w-full h-full object-cover object-center transform transition-transform duration-500 ease-in-out"
        />
      </motion.div>
    </motion.div>
  </Link>
);

export default ProjectSingle;
