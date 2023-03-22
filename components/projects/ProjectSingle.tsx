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
        className="rounded-xl shadow-lg hover:shadow-xl cursor-pointer mb-10 sm:mb-0 bg-secondary-light dark:bg-ternary-dark"
        aria-label="Single Project"
      >
        <div>
          <Image
            src={img}
            className="rounded-t-xl border-none"
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
