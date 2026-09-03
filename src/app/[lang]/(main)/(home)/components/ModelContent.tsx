"use client";

import { useEffect, useRef, useState, Suspense } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import {
  Clone,
  Html,
  OrbitControls,
  useAnimations,
  useGLTF,
  useProgress,
} from "@react-three/drei";
import * as THREE from "three";

const MODEL_PATH = "/3d-models/models/scene-draco.glb";
const MODEL_SCALE_DIVISOR = 120;
const CAMERA_POSITION: [number, number, number] = [2.5, 5, 7];
const MODEL_POSITION: [number, number, number] = [-0.5, -2.5, 0];

useGLTF.preload(MODEL_PATH);

function ModelScene() {
  const groupRef = useRef<THREE.Group>(null);
  const size = useThree((state) => state.size);
  const { scene, animations } = useGLTF(MODEL_PATH);
  const { actions } = useAnimations(animations, groupRef);

  useEffect(() => {
    // `actions` are getters that return undefined until groupRef is attached,
    // so the action has to be read here and never during render.
    const clip = animations[0];
    const action = clip && actions[clip.name];
    action?.play();
    return () => {
      action?.stop();
    };
  }, [actions, animations]);

  return (
    <group ref={groupRef}>
      <Clone
        object={scene as THREE.Group}
        scale={Math.min(size.width, size.height) / MODEL_SCALE_DIVISOR}
        position={MODEL_POSITION}
      />
    </group>
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
        // R3F force-loses the WebGL context 500ms after its Effects are torn
        // down, and rebuilds neither the context nor the root when they re-run
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
          enableRotate
          minPolarAngle={Math.PI / 2}
          maxPolarAngle={Math.PI / 2}
        />
      </Canvas>
    </div>
  );
}
