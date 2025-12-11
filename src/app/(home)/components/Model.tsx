"use client";

import { useEffect, useRef, Component, ReactNode } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera, useGLTF } from "@react-three/drei";
import { Suspense } from "react";
import * as THREE from "three";

const MODEL_URL =
  "https://images.jaeungkim.com/3d-models/models/scene-draco.glb";

// 모델 프리로드
useGLTF.preload(MODEL_URL);

// 로딩 플레이스홀더
function LoadingPlaceholder() {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.5;
    }
  });

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[1, 16, 16]} />
      <meshBasicMaterial color="#888" wireframe />
    </mesh>
  );
}

// 에러 발생 시 대체 UI
function ModelErrorFallback() {
  return (
    <mesh>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="gray" />
    </mesh>
  );
}

// 에러 바운더리
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

// 3D 모델 렌더링
function ModelRoot() {
  const mixerRef = useRef<THREE.AnimationMixer | null>(null);
  const { size } = useThree();
  const { scene, animations } = useGLTF(MODEL_URL);

  const scale = Math.min(size.width, size.height) / 120;

  // 애니메이션 설정
  useEffect(() => {
    if (!animations?.length || !scene) return;

    const mixer = new THREE.AnimationMixer(scene);
    mixer.clipAction(animations[0])?.play();
    mixerRef.current = mixer;

    return () => {
      mixer.stopAllAction();
      mixerRef.current = null;
    };
  }, [animations, scene]);

  // 리소스 정리
  useEffect(() => {
    return () => {
      scene.traverse((obj) => {
        if (obj instanceof THREE.Mesh) {
          obj.geometry?.dispose();
          if (Array.isArray(obj.material)) {
            obj.material.forEach((m) => m.dispose());
          } else {
            obj.material?.dispose();
          }
        }
      });
    };
  }, [scene]);

  // 애니메이션 업데이트
  useFrame((_, delta) => {
    mixerRef.current?.update(delta);
  });

  return <primitive object={scene} scale={scale} position={[-0.5, -2.5, 0]} />;
}

export default function Model() {
  return (
    <Canvas
      dpr={[1, 2]}
      gl={{ antialias: true, powerPreference: "high-performance" }}
    >
      <PerspectiveCamera makeDefault position={[2.5, 5, 7]} fov={60} />
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 10, 5]} intensity={1} />
      <Suspense fallback={<LoadingPlaceholder />}>
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
  );
}
