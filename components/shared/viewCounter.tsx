import { motion } from "framer-motion";
import useSWR from "swr";
import axios from "axios";

const spinnerVariants = {
  animate: {
    rotate: [0, 360],
    transition: {
      duration: 1.5,
      ease: "linear",
      loop: Infinity,
    },
  },
};

export default function ViewCounter({ slug }: { slug: string }) {
  const { data: views, error } = useSWR(`/api/views/${slug}`, async (url) => {
    const response = await axios.post(url);
    return response.data.total;
  });

  if (error) return <p>Failed to load views</p>;

  return (
    <motion.div
      animate={{ opacity: views ? 1 : 0 }}
      transition={{ duration: 0.5 }}
    >
      {!views && (
        <motion.div
          variants={spinnerVariants}
          animate="animate"
          className="flex justify-center items-center h-10 w-10"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="animate-spin h-6 w-6 text-gray-700"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 016 12H2c0 2.981 1.657 5.622 4 6.979V17z"
            />
          </svg>
        </motion.div>
      )}
      {views && <p>{views} views</p>}
    </motion.div>
  );
}
