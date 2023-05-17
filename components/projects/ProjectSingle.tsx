import { motion } from "framer-motion";
import Link from "next/link";

const ProjectSingle = ({ id, img, title, date, videoSrc }: any) => (
  <Link href={`/project/${id}`} passHref>
    <motion.div
      className="will-change-auto overflow-hidden rounded-md p-1 shadow-zinc-800/5 ring-1 ring-zinc-900/5 shadow-lg hover:shadow-xl cursor-pointer mb-4 sm:mb-0 bg-white/90 dark:bg-zinc-800/90"
      aria-label="Single Project"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        ease: "easeInOut",
        duration: 0.7,
        delay: 0.15,
      }}
    >
      <motion.div className="will-change-auto w-full h-full relative rounded-md overflow-hidden">
        <video
          muted
          autoPlay
          playsInline
          loop
          className="w-full h-full object-cover object-center transform transition-transform duration-500 ease-in-out"
          poster={img}
        >
          <source src={videoSrc} type="video/mp4"></source>
        </video>
        <div className="absolute bottom-0 left-0 w-full h-full flex justify-between items-end gap-1 p-3 z-20 will-change-auto transition-opacity duration-300 bg-gradient-to-t from-black to-transparent">
          <h3 className="text-xs text-neutral-200 flex gap-1 justify-start items-center">
            {title}
          </h3>
          <p className="text-xs text-neutral-200">{date}</p>
        </div>
      </motion.div>
    </motion.div>
  </Link>
);

export default ProjectSingle;
