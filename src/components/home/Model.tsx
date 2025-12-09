"use client";

import { useEffect, useRef, useMemo, Component, ReactNode } from "react";
import { useFrame, useLoader, useThree } from "@react-three/fiber";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera, Loader } from "@react-three/drei";
import { Suspense } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";

const MODEL_URL =
  "https://images.jaeungkim.com/3d-models/models/scene-draco.glb";
const DRACO_PATH = "https://www.gstatic.com/draco/versioned/decoders/1.5.7/";

const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath(DRACO_PATH);
dracoLoader.setDecoderConfig({ type: "wasm" });

const loaderConfig = (loader: GLTFLoader) => {
  loader.setDRACOLoader(dracoLoader);
};

function ModelErrorFallback() {
  return (
    <mesh>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="gray" />
    </mesh>
  );
}

class ModelErrorBoundary extends Component<
  { children: ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    if (process.env.NODE_ENV === "development") {
      console.error("3D 모델 로드 에러:", error);
    }
  }

  render() {
    if (this.state.hasError) {
      return <ModelErrorFallback />;
    }
    return this.props.children;
  }
}

function ModelRoot() {
  const mixerRef = useRef<THREE.AnimationMixer | null>(null);
  const { size } = useThree();

  const scale = useMemo(
    () => Math.min(size.width, size.height) / 120,
    [size.width, size.height]
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

  const scaleArray = useMemo(() => [scale, scale, scale], [scale]);

  return (
    <primitive
      object={gltf.scene}
      scale={scaleArray}
      position={[-0.5, -2.5, 0]}
    />
  );
}

export default function Model() {
  return (
    <>
      <Canvas>
        <PerspectiveCamera makeDefault position={[2.5, 5, 7]} fov={60} />
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 10, 5]} intensity={1} />
        <Suspense fallback={null}>
          <ModelErrorBoundary>
            <ModelRoot />
          </ModelErrorBoundary>
        </Suspense>
        <OrbitControls
          enableRotate
          minPolarAngle={Math.PI / 2}
          maxPolarAngle={Math.PI / 2}
        />
      </Canvas>
      <Loader />
    </>
  );
}
