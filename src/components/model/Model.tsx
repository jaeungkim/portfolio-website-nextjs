"use client";

import { useRef } from "react";
import { useFrame, useLoader, useThree } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";

export default function Model() {
  const groupRef = useRef<THREE.Group>(null);
  const mixerRef = useRef<THREE.AnimationMixer | null>(null);

  /* Viewport Scaling */
  const { size } = useThree();
  const scale = Math.min(size.width, size.height) / 120;

  /* Load Model using `useLoader` */
  const gltf = useLoader(GLTFLoader, "/models/scene-draco.glb", (loader) => {
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath("/models/draco/");
    dracoLoader.setDecoderConfig({ type: "wasm" });
    loader.setDRACOLoader(dracoLoader);
  });

  /* Setup Animation */
  if (gltf.animations.length && !mixerRef.current) {
    mixerRef.current = new THREE.AnimationMixer(gltf.scene);
    mixerRef.current.clipAction(gltf.animations[0]).play();
  }

  /* Animation Update */
  useFrame((_, delta) => mixerRef.current?.update(delta));

  return (
    <primitive
      ref={groupRef}
      object={gltf.scene}
      scale={[scale, scale, scale]}
      position={[1, -2, 1]}
    />
  );
}
