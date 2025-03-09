"use client";

import { useRef } from "react";
import { useFrame, useLoader, useThree } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";

export default function Model() {
  /* Refs */
  const group = useRef<THREE.Group>(null);
  const mixer = useRef<THREE.AnimationMixer | null>(null);
  const progressRef = useRef(0);

  /* Viewport Scaling */
  const { size } = useThree();
  const scale = Math.min(size.width, size.height) / 120;

  /* ✅ Load Model using `useLoader` (More efficient than manual useEffect) */
  const gltf = useLoader(GLTFLoader, "/models/scene-draco.glb", (loader) => {
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath("/models/draco/");
    dracoLoader.setDecoderConfig({ type: "wasm" });
    loader.setDRACOLoader(dracoLoader);
  });

  /* ✅ Setup Animation (Runs only once) */
  if (gltf.animations.length && !mixer.current) {
    mixer.current = new THREE.AnimationMixer(gltf.scene);
    const action = mixer.current.clipAction(gltf.animations[0]);
    action.play();
  }

  useFrame((_, delta) => {
    mixer.current?.update(delta);
  });

  return (
    <>
      {gltf ? (
        <primitive
          ref={group}
          object={gltf.scene}
          scale={[scale, scale, scale]}
          position={[-0.5, -2.5, 0]}
        />
      ) : (
        <Html className="flex mx-auto w-full justify-center items-center">
          <p>Loading... {Math.round(progressRef.current)}%</p>
        </Html>
      )}
    </>
  );
}
