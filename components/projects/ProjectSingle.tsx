import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const ProjectSingle = ({ id, img, title, category }) => (
  <Link href={`/project/${id}`} passHref>
    <motion.div
      // whileHover={{ scale: 1.05 }}
      // whileTap={{ scale: 0.95 }}
      className="overflow-hidden rounded-md p-1 shadow-zinc-800/5 ring-1 ring-zinc-900/5 shadow-lg hover:shadow-xl cursor-pointer mb-10 sm:mb-0 bg-white/90 dark:bg-zinc-800/90"
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
      {/* <div className="p-4">
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            ease: "easeInOut",
            duration: 0.7,
            delay: 0.15,
          }}
          className="text-md md:text-lg mb-2 text-zinc-800 dark:text-zinc-100 font-bold"
        >
          {title}
        </motion.p>
        <motion.span
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            ease: "easeInOut",
            duration: 0.7,
            delay: 0.3,
          }}
          className="text-md text-zinc-600 dark:text-zinc-400 font-medium uppercase tracking-wider"
        >
          {category}
        </motion.span>
      </div> */}
    </motion.div>
  </Link>
);

export default ProjectSingle;
