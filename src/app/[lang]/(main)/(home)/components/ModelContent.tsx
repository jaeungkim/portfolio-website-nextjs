"use client";

import { useEffect, useState, Suspense } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import {
  Html,
  OrbitControls,
  useAnimations,
  useGLTF,
  useProgress,
} from "@react-three/drei";

// The model is meshopt-compressed (EXT_meshopt_compression). Its decoder ships
// inside three, so no Draco binaries are fetched from Google's CDN.
const MODEL_PATH = "/3d-models/models/scene.glb";
const USE_DRACO = false;
const MODEL_SCALE_DIVISOR = 120;
const CAMERA_POSITION: [number, number, number] = [2.5, 5, 7];
const MODEL_POSITION: [number, number, number] = [-0.5, -2.5, 0];

useGLTF.preload(MODEL_PATH, USE_DRACO);

function ModelScene() {
  const size = useThree((state) => state.size);
  const { scene, animations } = useGLTF(MODEL_PATH, USE_DRACO);
  const { actions } = useAnimations(animations, scene);

  useEffect(() => {
    const clip = animations[0];
    const action = clip && actions[clip.name];
    action?.play();
    return () => {
      action?.stop();
    };
  }, [actions, animations]);

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
  return <Html center>{Math.round(progress)} %</Html>;
}

export function ModelContent() {
  const [canvasKey, setCanvasKey] = useState(0);

  return (
    <div className="absolute inset-0">
      <Canvas
        key={canvasKey}
        dpr={[1, 1.5]}
        gl={{ antialias: false }}
        camera={{ position: CAMERA_POSITION, fov: 60 }}
        // R3F force-loses the WebGL context when it tears its root down, and
        // rebuilds neither the context nor the root when its Effects re-run
        // (`if (!root.current)`). So any hide/show cycle — Next's <Activity>,
        // StrictMode — strands this canvas on a dead context and it stays
        // white; R3F ships no context-loss recovery, so remounting is ours to
        // do. The listener has to be raw DOM: a React Effect would be cleaned
        // up by the very hide that arms the loss, and never hear it fire.
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
    </div>
  );
}
