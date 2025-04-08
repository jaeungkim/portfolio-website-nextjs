"use client";

import dynamic from "next/dynamic";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { Suspense } from "react";

import Loader from "./Loader";

const Model = dynamic(() => import("./Model"), { ssr: false });

export default function ModelContainer() {
  return (
    <Canvas shadows>
      <PerspectiveCamera makeDefault position={[2.5, 5, 7]} fov={60} />
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 10, 5]} intensity={1} />
      <Suspense fallback={<Loader />}>
        <Model />
      </Suspense>
      <OrbitControls
        enableRotate
        enableZoom={true}
        enablePan={true}
        minPolarAngle={Math.PI / 2}
        maxPolarAngle={Math.PI / 2}
      />
    </Canvas>
  );
}
