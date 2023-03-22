import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const ProjectSingle = ({ id, img, title, category }) => (
  <Link href={`/projects/${id}`} passHref>
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        ease: "easeInOut",
        duration: 0.7,
        delay: 0.15,
      }}
      className="overflow-hidden aspect-square rounded-xl shadow-zinc-800/5 ring-1 ring-zinc-900/5 shadow-lg hover:shadow-xl cursor-pointer mb-10 sm:mb-0 bg-white/90 dark:bg-zinc-800/90 hover:bg-zinc-100 dark:hover:bg-zinc-900"
      aria-label="Single Project"
    >
      <motion.div className="rounded-t-xl">
        <Image
          className="aspect-[3/2] transform hover:scale-105 transition-transform duration-500 ease-in-out object-cover object-center w-full h-full"
          src={img}
          alt="Single Project"
          layout="responsive"
          width={100}
          height={90}
        />
      </motion.div>
      <div className="p-4">
        <p className="text-md md:text-lg mb-2 text-zinc-800 dark:text-zinc-100">
          {title}
        </p>
        <span className="text-md text-zinc-600 dark:text-zinc-400">
          {category}
        </span>
      </div>
    </motion.div>
  </Link>
);

export default ProjectSingle;
