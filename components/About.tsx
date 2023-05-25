import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import {
  OrbitControls,
  Environment,
  Html,
  PerspectiveCamera,
} from "@react-three/drei";
import Model from "./Model";
import THREE from "three";

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
      {/* <Environment preset="lobby" /> */}
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
    <div className="md:flex w-full">
      <div className="w-full relative basis-2/6 py-12 h-96 md:h-auto md:py-0 md:pr-4">
        <Canvas>
          <PerspectiveCamera makeDefault position={[5, 10, 5]} fov={50} />
          <ambientLight />
          <directionalLight />
          <ModelLoader />
          <OrbitControls
            enableRotate={true}
            enableZoom={true}
            enablePan={false}
            minPolarAngle={Math.PI / 2}
            maxPolarAngle={Math.PI / 2}
          />
        </Canvas>
      </div>
      <article className="basis-4/6">
        {/* <h1 className="mb-4 text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
      </h1> */}
        <h2 className="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-4xl">
          About
        </h2>
        {/* <p className="my-6 text-base text-zinc-600 dark:text-zinc-400">
        You can also call me Jae 🙂.
      </p> */}
        <p className="my-6 text-base text-zinc-600 dark:text-zinc-400">
          I am a highly motivated and collaborative software engineer with 2
          years of experience in designing, building, and maintaining software
          for startup companies. I primarily focus on full-stack web development
          but I also have experiences working as a designer and product owner
          depending on the needs of the company.
        </p>
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
      </article>
    </div>
  );
}
