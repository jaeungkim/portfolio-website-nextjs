"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame, useLoader, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";

export default function Model() {
  const groupRef = useRef<THREE.Group>(null);
  const mixerRef = useRef<THREE.AnimationMixer | null>(null);

  // Viewport-based scale
  const scale = useThree(
    (state) => Math.min(state.size.width, state.size.height) / 120
  );

  // Memoize DRACO loader setup
  const gltf = useLoader(
    GLTFLoader,
    "https://images.jaeungkim.com/3d-models/models/scene-draco.glb",
    useMemo(
      () => (loader: GLTFLoader) => {
        const dracoLoader = new DRACOLoader();
        dracoLoader.setDecoderPath("https://images.jaeungkim.com/3d-models/models/draco/");
        dracoLoader.setDecoderConfig({ type: "wasm" });
        loader.setDRACOLoader(dracoLoader);
      },
      []
    )
  );

  useEffect(() => {
    if (!gltf.animations.length || !gltf.scene) return;

    const mixer = new THREE.AnimationMixer(gltf.scene);
    mixer.clipAction(gltf.animations[0])?.play();
    mixerRef.current = mixer;

    return () => {
      mixer.stopAllAction();
      mixerRef.current = null;
    };
  }, [gltf]);

  useFrame((_, delta) => {
    mixerRef.current?.update(delta);
  });

  return (
    <primitive
      ref={groupRef}
      object={gltf.scene}
      scale={[scale, scale, scale]}
      position={[-0.5, -2.5, 0]}
    />
  );
}
