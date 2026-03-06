"use client";

import { useEffect, useRef, Suspense } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import {
  Clone,
  Html,
  OrbitControls,
  PerspectiveCamera,
  Preload,
  useAnimations,
  useGLTF,
  useProgress,
} from "@react-three/drei";
import * as THREE from "three";

const MODEL_PATH = "/3d-models/models/scene-draco.glb";

useGLTF.preload(MODEL_PATH);

function ModelScene() {
  const groupRef = useRef<THREE.Group>(null);
  const { size } = useThree();
  const { scene, animations } = useGLTF(MODEL_PATH) as {
    scene: THREE.Group;
    animations: THREE.AnimationClip[];
  };
  const { actions } = useAnimations(animations, groupRef);
  const firstClip = animations[0];
  const firstAction = firstClip ? actions?.[firstClip.name] : null;

  useEffect(() => {
    firstAction?.play();

    return () => {
      firstAction?.stop();
    };
  }, [actions, firstAction]);

  return (
    <group ref={groupRef}>
      <Clone
        object={scene}
        scale={Math.min(size.width, size.height) / 120}
        position={[-0.5, -2.5, 0]}
      />
      <Preload all />
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
          <ModelScene />
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

function Loader() {
  return <Html center>{Math.round(useProgress().progress)} %</Html>;
}
