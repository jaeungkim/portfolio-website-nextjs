"use client";

import { useEffect, useRef, Suspense } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import {
  useGLTF,
  PerspectiveCamera,
  OrbitControls,
  useAnimations,
} from "@react-three/drei";
import * as THREE from "three";
import { Html, useProgress } from "@react-three/drei";

function Loader() {
  const { progress } = useProgress();
  return <Html center>{progress.toFixed(0)} % loaded</Html>;
}

function ModelContent() {
  const group = useRef<THREE.Group>(null);
  const { size } = useThree();
  const { scene, animations } = useGLTF(
    "https://images.jaeungkim.com/3d-models/models/scene-draco.glb"
  );
  const { actions } = useAnimations(animations, group);

  const scale = Math.min(size.width, size.height) / 120;

  useEffect(() => {
    if (actions && animations.length > 0) {
      actions[animations[0].name]?.play();
    }
  }, [actions, animations]);

  return (
    <group ref={group} dispose={null}>
      <primitive object={scene} scale={scale} position={[-0.5, -2.5, 0]} />
    </group>
  );
}

export default function Model() {
  return (
    <div className="absolute inset-0">
      <Canvas dpr={[1, 1.5]} gl={{ antialias: false }}>
        <PerspectiveCamera makeDefault position={[2.5, 5, 7]} fov={60} />
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 10, 5]} intensity={1} />
        <Suspense fallback={<Loader />}>
          <ModelContent />
        </Suspense>
        <OrbitControls
          enableRotate
          minPolarAngle={Math.PI / 2}
          maxPolarAngle={Math.PI / 2}
        />
      </Canvas>
    </div>
  );
}
