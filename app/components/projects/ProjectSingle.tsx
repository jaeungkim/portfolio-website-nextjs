import { motion } from "framer-motion";
import Link from "next/link";

interface ProjectProps {
  id: string;
  img: string;
  title: string;
  date: string;
  videoSrc: string;
}

const transitionConfig = {
  ease: "easeInOut",
  duration: 0.7,
  delay: 0.25,
};

const ProjectSingle: React.FC<ProjectProps> = ({
  id,
  img,
  title,
  date,
  videoSrc,
}) => (
  <Link href={`/project/${id}`}>
    <motion.div
      className="overflow-hidden rounded-md p-1 shadow-lg ring-1 ring-zinc-900/5 hover:shadow-xl mb-4 sm:mb-0 bg-white/90 dark:bg-zinc-800/90"
      aria-label="Single Project"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={transitionConfig}
    >
      <motion.div className="relative rounded-md overflow-hidden">
        <video
          muted
          autoPlay
          playsInline
          loop
          className="w-full h-full object-cover object-center transition-transform duration-500 ease-in-out min-h-[200px]"
          poster={img}
          aria-hidden="true"
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
        <div className="absolute bottom-0 left-0 w-full p-3 flex justify-between items-end bg-gradient-to-t from-black to-transparent">
          <h3 className="text-xs text-neutral-200">{title}</h3>
          <p className="text-xs text-neutral-200">{date}</p>
        </div>
      </motion.div>
    </motion.div>
  </Link>
);

export default ProjectSingle;
