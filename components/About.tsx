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
import THREE from "three";
import React from "react";

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
  return (
    <div className="md:flex w-full">
      <div className="w-full relative md:basis-2/6 lg:basis-3/6 py-4 h-96 md:h-auto md:py-1 md:pr-4 max-h-[350px]">
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
        {/* <h1 className="mb-4 text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
      </h1> */}
        <h2 className="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
          <MemoizedCrypticTextDynamic
            text={`Hello I'm Jae`}
            delay={0.2}
            classNames={`${styles.fadein}`}
          />
        </h2>
        {/* <p className="my-6 text-base text-zinc-600 dark:text-zinc-400">
          I'm Jae 🧑🏻‍💻
        </p> */}
        <p className="my-6 text-base text-zinc-600 dark:text-zinc-400">
          I am a highly motivated and collaborative software engineer with 2
          years of experience in designing, building, and maintaining software
          for startup companies. I primarily focus on full-stack web development
          but I also have experiences working as a designer and product owner
          depending on the needs of the company.
        </p>
        <p className="my-6 text-base text-zinc-600 dark:text-zinc-400">
          웹 기술의 빠른 변화에 발맞추어, 지속적인 학습을 통해 최신 트렌드, 보안
          문제, 그리고 시스템 효율성에 관한 지식을 꾸준히 확장해 왔습니다.
          이러한 노력은 프로젝트에 혁신적인 아이디어를 적용하고 비즈니스의
          성장을 도모하는 데 큰 도움이 되었습니다. 또한, 자동화와 프로세스
          최적화에 집중함으로써 작업 효율성을 상당히 높일 수 있었습니다.
        </p>
        <p className="my-6 text-base text-zinc-600 dark:text-zinc-400">
          성공적인 프로젝트는 원활한 커뮤니케이션에서 비롯된다는 것을 이해하고
          있습니다. 팀원들과의 페어 프로그래밍을 통해 지식과 아이디어를 공유하는
          것을 즐기며, 모든 이들과 긍정적이고 열린 마음으로 소통합니다. 이러한
          경험들은 저를 더 나은 개발자로 성장시키는 원동력이 되었고, 계속해서
          새로운 기술을 배우고 전문성을 키우는 데 집중하고 있습니다.
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
