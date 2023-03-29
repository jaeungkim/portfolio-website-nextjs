import { motion } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import {
  OrbitControls,
  Stage,
  Html,
  PerspectiveCamera,
} from "@react-three/drei";
import Model from "./Model";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";

const visible = { opacity: 1, y: 0, transition: { duration: 0.5 } };
const hidden = { opacity: 0, y: -50 };

function ModelLoader() {
  return (
    <Suspense
      fallback={
        <Html center className="text-zinc-600 dark:text-zinc-400">
          Loading...
        </Html>
      }
    >
      <Model />
    </Suspense>
  );
}

function SocialIcon({ href, IconComponent }) {
  return (
    <a className="group -m-1 p-1" href={href}>
      <IconComponent className="h-6 w-6 fill-zinc-500 transition group-hover:fill-zinc-600 dark:fill-zinc-400 dark:group-hover:fill-zinc-300" />
    </a>
  );
}

export default function About() {
  return (
    <motion.article
      initial="hidden"
      animate="visible"
      exit={{ opacity: 0, transition: { duration: 1 } }}
      variants={{ visible: { transition: { staggerChildren: 0.3 } } }}
    >
      <motion.h1
        variants={{
          visible,
          hidden,
        }}
        className="mb-4 text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl"
      >
        Hi there 👋
      </motion.h1>
      <motion.h2
        variants={{
          hidden,
          visible: { ...visible, transition: { delay: 0.3 } },
        }}
        className="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-4xl"
      >
        I am Jaeung Kim
      </motion.h2>
      <motion.p
        variants={{
          hidden,
          visible: { ...visible, transition: { delay: 0.6 } },
        }}
        className="mt-6 text-base text-zinc-600 dark:text-zinc-400"
      >
        You can also call me Jae 🙂.
      </motion.p>
      <motion.p
        variants={{
          hidden,
          visible: { ...visible, transition: { delay: 0.9 } },
        }}
        className="mt-6 text-base text-zinc-600 dark:text-zinc-400"
      >
        I am a highly motivated and collaborative software engineer with 2 years
        of experience in designing, building, and maintaining software for
        startup companies. I primarily focus on full-stack web development but I
        also have experiences working as a designer and product owner depending
        on the needs of the company.
      </motion.p>
      <div className="mt-6 flex gap-6">
        <SocialIcon
          href="https://github.com/jaeungkim"
          IconComponent={FaGithub}
        />
        <SocialIcon
          href="https://www.linkedin.com/in/jaeungkim0526/"
          IconComponent={FaLinkedin}
        />
        <SocialIcon
          href="https://www.instagram.com/jaekiim/"
          IconComponent={FaInstagram}
        />
      </div>

      <div className="w-full h-96 relative">
        <Canvas>
          <PerspectiveCamera makeDefault position={[0, 0, 50]} fov={75} />
          <ambientLight intensity={0.5} />
          <directionalLight position={[2.5, 8, 5]} intensity={1} />
          <ModelLoader />
          <OrbitControls enableZoom={false} enablePan={false} />
        </Canvas>
      </div>
    </motion.article>
  );
}
