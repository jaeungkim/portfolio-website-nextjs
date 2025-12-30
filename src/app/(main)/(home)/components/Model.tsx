"use client";

import { useEffect, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

const MODEL_URL =
  "https://images.jaeungkim.com/3d-models/models/scene-draco.glb";

useGLTF.preload(MODEL_URL);

export default function Model() {
  const mixerRef = useRef<THREE.AnimationMixer | null>(null);
  const { size } = useThree();
  const { scene, animations } = useGLTF(MODEL_URL);

  const scale = Math.min(size.width, size.height) / 120;

  useEffect(() => {
    if (!animations?.length) return;

    const mixer = new THREE.AnimationMixer(scene);
    mixer.clipAction(animations[0])?.play();
    mixerRef.current = mixer;

    return () => {
      mixer.stopAllAction();
    };
  }, [animations, scene]);

  useFrame((_, delta) => {
    mixerRef.current?.update(delta);
  });

  return <primitive object={scene} scale={scale} position={[-0.5, -2.5, 0]} />;
}
