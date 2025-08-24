import Image from "next/image";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "motion/react";

gsap.registerPlugin(ScrollTrigger);

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.8,
      staggerChildren: 0.2,
    },
  },
};

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

const heroVariants = {
  hidden: { opacity: 0, scale: 1.05 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 1.2,
      ease: "easeOut" as const,
    },
  },
};

export default function MainWeddingScreen() {
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    sectionRefs.current.forEach((section, index) => {
      if (!section) return;

      gsap.fromTo(
        section,
        {
          y: 100,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    return () => ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
  }, []);

  return (
    <motion.div
      className="min-h-screen"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div
        className="relative h-screen"
        variants={heroVariants}
        initial="hidden"
        animate="visible"
      >
        <Image
          src="/images/mobile-wedding/gallery/main23.jpeg"
          alt="Main"
          fill
          className="object-cover"
          priority
        />

        {/* Text Overlay - Bottom positioned with elegant fonts */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent flex items-end justify-center pb-20">
          <div className="text-center text-white px-6 max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.4,
                duration: 0.8,
                ease: "easeOut" as const,
              }}
              className="mb-6"
            >
              <h1 className="text-3xl md:text-4xl font-light mb-3 tracking-[0.2em] uppercase">
                Our Wedding Day
              </h1>
              <p className="text-sm md:text-base font-light mb-4 tracking-[0.3em] uppercase">
                — Sun, May 18th, 2025 —
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.6,
                duration: 0.8,
                ease: "easeOut" as const,
              }}
              className="space-y-2"
            >
              <p className="text-sm md:text-base font-light italic leading-relaxed tracking-wide">
                Forever begins with a single step,
              </p>
              <p className="text-sm md:text-base font-light italic leading-relaxed tracking-wide">
                And love guides us every step of the way.
              </p>
            </motion.div>
          </div>
        </div>
      </motion.div>

      <div className="bg-white">
        <motion.div
          ref={(el) => {
            sectionRefs.current[0] = el;
          }}
          className="py-20 px-6 text-center"
          variants={sectionVariants}
        >
          <h2 className="text-3xl font-serif text-gray-800 mb-4">
            Join Us in Celebration
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We're excited to share this special day with you. Come celebrate
            love, laughter, and new beginnings as we start our journey together.
          </p>
        </motion.div>

        <motion.div
          ref={(el) => {
            sectionRefs.current[1] = el;
          }}
          className="py-20 px-6 bg-gray-50 text-center"
          variants={sectionVariants}
        >
          <h2 className="text-3xl font-serif text-gray-800 mb-4">
            The Perfect Day
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Every detail has been carefully planned to create memories that will
            last a lifetime. From the flowers to the music, everything tells our
            story.
          </p>
        </motion.div>

        <motion.div
          ref={(el) => {
            sectionRefs.current[2] = el;
          }}
          className="py-20 px-6 text-center"
          variants={sectionVariants}
        >
          <h2 className="text-3xl font-serif text-gray-800 mb-4">
            RSVP & Details
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Please let us know if you can attend. We can't wait to celebrate
            this beautiful moment with our family and friends.
          </p>
        </motion.div>

        <motion.div
          ref={(el) => {
            sectionRefs.current[3] = el;
          }}
          className="py-20 px-6 bg-gray-50 text-center"
          variants={sectionVariants}
        >
          <h2 className="text-3xl font-serif text-gray-800 mb-4">
            Love & Gratitude
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Thank you for being part of our special day. Your presence and well
            wishes mean the world to us as we begin this new chapter.
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}
