"use client";

import { useEffect, useRef, Component, ReactNode } from "react";
import { useFrame, useLoader, useThree } from "@react-three/fiber";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera, Loader } from "@react-three/drei";
import { Suspense } from "react";
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

interface ErrorBoundaryState {
  hasError: boolean;
}

class ModelErrorBoundary extends Component<
  { children: ReactNode },
  ErrorBoundaryState
> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    if (process.env.NODE_ENV === "development") {
      console.error("3D 모델 로드 에러:", {
        message: error.message,
        stack: error.stack,
        componentStack: errorInfo.componentStack,
      });
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <mesh>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color="gray" />
        </mesh>
      );
    }

    return this.props.children;
  }
}

function ModelRoot() {
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

function ModelContainer() {
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

function Model() {
  return null;
}

Model.Root = ModelRoot;
Model.Container = ModelContainer;

export default Model;
export { ModelContainer };
