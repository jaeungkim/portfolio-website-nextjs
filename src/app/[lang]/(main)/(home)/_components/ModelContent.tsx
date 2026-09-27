"use client";

import { useEffect, useState, Suspense } from "react";
import { catchError } from "next/error";
import { Canvas, useThree } from "@react-three/fiber";
import {
  Html,
  OrbitControls,
  useAnimations,
  useGLTF,
  useProgress,
} from "@react-three/drei";
import { ModelLoader } from "@/app/[lang]/(main)/(home)/_components/ModelLoader";

const MODEL_PATH = "/3d-models/models/scene.glb";
const MODEL_SCALE_DIVISOR = 120;
const CAMERA_POSITION: [number, number, number] = [2.5, 5, 7];
const MODEL_POSITION: [number, number, number] = [-0.5, -2.5, 0];

useGLTF.preload(MODEL_PATH);

function ModelScene() {
  const size = useThree((state) => state.size);
  const { scene, animations } = useGLTF(MODEL_PATH);
  const { actions } = useAnimations(animations, scene);

  useEffect(() => {
    Object.values(actions)[0]?.play();
  }, [actions]);

  return (
    <primitive
      object={scene}
      scale={Math.min(size.width, size.height) / MODEL_SCALE_DIVISOR}
      position={MODEL_POSITION}
    />
  );
}

function Loader() {
  const { progress } = useProgress();
  return (
    <Html center>
      <ModelLoader progress={progress} />
    </Html>
  );
}

const ModelBoundary = catchError(() => null);

export function ModelContent() {
  const [canvasKey, setCanvasKey] = useState(0);

  return (
    <div className="absolute inset-0">
      <ModelBoundary>
        <Canvas
          key={canvasKey}
          dpr={[1, 1.5]}
          gl={{ antialias: false }}
          camera={{ position: CAMERA_POSITION, fov: 60 }}
          onCreated={({ gl }) =>
            gl.domElement.addEventListener(
              "webglcontextlost",
              () => setCanvasKey((key) => key + 1),
              { once: true },
            )
          }
        >
          <ambientLight intensity={0.5} />
          <directionalLight position={[5, 10, 5]} intensity={1} />
          <Suspense fallback={<Loader />}>
            <ModelScene />
          </Suspense>
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            minPolarAngle={Math.PI / 2}
            maxPolarAngle={Math.PI / 2}
          />
        </Canvas>
      </ModelBoundary>
    </div>
  );
}
