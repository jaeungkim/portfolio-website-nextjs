"use client";

import { useEffect, useRef } from "react";
import { useFrame, useLoader, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";

const MODEL_URL = "https://images.jaeungkim.com/3d-models/models/scene-draco.glb";
const DRACO_PATH = "https://www.gstatic.com/draco/versioned/decoders/1.5.7/";

// DRACO 로더를 모듈 레벨에서 한 번만 생성
const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath(DRACO_PATH);
dracoLoader.setDecoderConfig({ type: "wasm" });

// 로더 설정 함수를 모듈 레벨로 추출
function loaderConfig(loader: GLTFLoader): void {
  loader.setDRACOLoader(dracoLoader);
}

export default function Model() {
  const mixerRef = useRef<THREE.AnimationMixer | null>(null);
  const scale = useThree(
    (state) => Math.min(state.size.width, state.size.height) / 120
  );
  const gltf = useLoader(GLTFLoader, MODEL_URL, loaderConfig);

  useEffect(() => {
    if (!gltf?.animations?.length || !gltf?.scene) return;

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
      object={gltf.scene}
      scale={[scale, scale, scale]}
      position={[-0.5, -2.5, 0]}
    />
  );
}
