import Image from "next/image";
import { useRef, useEffect, useCallback } from "react";
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

const textVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" as const },
  },
};

const sections = [
  {
    title: "Join Us in Celebration",
    content: "We're excited to share this special day with you. Come celebrate love, laughter, and new beginnings as we start our journey together.",
    bgColor: "bg-white",
  },
  {
    title: "The Perfect Day",
    content: "Every detail has been carefully planned to create memories that will last a lifetime. From the flowers to the music, everything tells our story.",
    bgColor: "bg-gray-50",
  },
  {
    title: "RSVP & Details",
    content: "Please let us know if you can attend. We can't wait to celebrate this beautiful moment with our family and friends.",
    bgColor: "bg-white",
  },
  {
    title: "Love & Gratitude",
    content: "Thank you for being part of our special day. Your presence and well wishes mean the world to us as we begin this new chapter.",
    bgColor: "bg-gray-50",
  },
];

export default function MainWeddingScreen() {
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

  const setupScrollAnimations = useCallback(() => {
    sectionRefs.current.forEach((section) => {
      if (!section) return;

      gsap.fromTo(
        section,
        { y: 100, opacity: 0 },
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
  }, []);

  useEffect(() => {
    setupScrollAnimations();
    return () => ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
  }, [setupScrollAnimations]);

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
          alt="Wedding Hero"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent flex items-end justify-center pb-20">
          <div className="text-center text-white px-6 max-w-3xl mx-auto">
            <motion.div
              variants={textVariants}
              initial="hidden"
              animate="visible"
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
              variants={textVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.2 }}
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
        {sections.map((section, index) => (
          <motion.div
            key={section.title}
            ref={(el) => {
              sectionRefs.current[index] = el;
            }}
            className={`py-20 px-6 text-center ${section.bgColor}`}
            variants={sectionVariants}
          >
            <h2 className="text-3xl font-serif text-gray-800 mb-4">
              {section.title}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {section.content}
            </p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
