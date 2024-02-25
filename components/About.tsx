import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import dynamic from "next/dynamic";
import styles from "@/styles/blog.module.css";
import {
  OrbitControls,
  Environment,
  Html,
  PerspectiveCamera,
} from "@react-three/drei";
import Model from "./Model";
import React from "react";
import { useTranslation } from "react-i18next";

const CrypticTextDynamic = dynamic(
  () => import("@/components/shared/CrypticText"),
  { ssr: false }
);

const MemoizedCrypticTextDynamic = React.memo(CrypticTextDynamic);

function ModelLoader() {
  return (
    <Suspense>
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
  const { t } = useTranslation();

  return (
    <div className="md:flex w-full">
      <div className="w-full relative md:basis-2/6 lg:basis-3/6 py-4 h-96 md:h-auto md:py-1 md:pr-4 max-h-[350px] md:mt-12">
        <Canvas>
          <PerspectiveCamera makeDefault position={[2.5, 10, 5]} fov={50} />
          <ambientLight />
          {/* <directionalLight /> */}
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
      <article className="md:basis-4/6 lg:basis-3/6">
        <h2 className="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
          <MemoizedCrypticTextDynamic
            text="Hello I'm Jay Kim"
            delay={0.1}
            classNames={`${styles.fadein}`}
          />
        </h2>
        <p className="mt-4 mb-4 text-base text-zinc-600 dark:text-zinc-400">
          I'm a software developer from Vancouver, Canada 🇨🇦.
        </p>
        <p className="text-base text-zinc-600 dark:text-zinc-400 mb-4">
          Currently, I been living in South Korea for about 3 years now. Welcome
          to my digital playground 😈
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
