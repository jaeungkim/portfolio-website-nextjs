import Head from "next/head";
import Layout from "../components/layout";
import Link from "next/link";
import ParticleBackground from "../components/particleBackground";
import { Canvas } from "@react-three/fiber";
import { Experience } from "../components/Experience";
export default function Home() {
  return (
    <>
      <Head>
        <title>Jaeung Kim</title>
      </Head>
      <div className="h-screen w-screen">
        <Canvas
          camera={{
            fov: 64,
            position: [2.3, 1.5, 2.3],
          }}
        >
          <Experience />
        </Canvas>
      </div>
    </>
  );
}
