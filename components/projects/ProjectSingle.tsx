import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const imageStyle = { maxWidth: "100%", height: "auto" };

const ProjectSingle = ({ id, img, title, category }) => {
  return (
    <Link href={`/projects/${id}`} passHref>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          ease: "easeInOut",
          duration: 0.7,
          delay: 0.15,
        }}
        className="rounded-xl shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur shadow-lg hover:shadow-xl cursor-pointer mb-10 sm:mb-0 bg-white/90 dark:bg-zinc-800/90 hover:bg-zinc-100 dark:hover:bg-zinc-900"
        aria-label="Single Project"
      >
        <div>
          <Image
            src={img}
            className="rounded-xl border-none aspect-video"
            alt="Single Project"
            layout="responsive"
            width={100}
            height={90}
          />
        </div>
        <div className="text-center px-4 py-6">
          <p className="font-general-medium text-xl md:text-2xl text-ternary-dark dark:text-ternary-light mb-2">
            {title}
          </p>
          <span className="text-lg text-ternary-dark dark:text-ternary-light">
            {category}
          </span>
        </div>
      </motion.div>
    </Link>
  );
};

export default ProjectSingle;
