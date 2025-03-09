import { useEffect, useRef, useState, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";

export default function Model() {
  /* Refs */
  const group = useRef<THREE.Group>(null);
  const mixer = useRef<THREE.AnimationMixer | null>(null);
  const targetProgress = useRef(0);
  const animationRequestId = useRef<number | null>(null);

  /* State */
  const [model, setModel] = useState<THREE.Object3D | null>(null);
  const [progress, setProgress] = useState(0);

  /* Viewport Scaling */
  const { size } = useThree();
  const scale = useMemo(() => Math.min(size.width, size.height) / 120, [size]);

  useEffect(() => {
    const manager = new THREE.LoadingManager();
    manager.onProgress = (_, loaded, total) => {
      targetProgress.current = (loaded / total) * 100;
    };

    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath("models/draco/");
    dracoLoader.setDecoderConfig({ type: "wasm" });

    const loader = new GLTFLoader(manager);
    loader.setDRACOLoader(dracoLoader);

    loader.load(
      "/models/scene-draco.glb",
      (gltf) => {
        const firstNode = gltf.scene.children[0];
        setModel(firstNode);

        if (gltf.animations.length) {
          mixer.current = new THREE.AnimationMixer(firstNode);
          const action = mixer.current.clipAction(gltf.animations[0]);
          action.play();
        }
      },
      (event) => {
        targetProgress.current = (event.loaded / event.total) * 100;
      },
      (error) => {
        console.error("Error loading model:", error);
      }
    );

    return () => {
      if (mixer.current) mixer.current.stopAllAction();
      dracoLoader.dispose();
    };
  }, []);

  useEffect(() => {
    const updateProgress = () => {
      setProgress((prev) => {
        const newProgress = THREE.MathUtils.lerp(
          prev,
          targetProgress.current,
          0.1
        );
        return Math.abs(newProgress - prev) < 0.5
          ? targetProgress.current
          : newProgress;
      });

      if (progress < 100) {
        animationRequestId.current = requestAnimationFrame(updateProgress);
      }
    };

    animationRequestId.current = requestAnimationFrame(updateProgress);

    return () => {
      if (animationRequestId.current)
        cancelAnimationFrame(animationRequestId.current);
    };
  }, []);

  useFrame((_, delta) => {
    if (mixer.current) mixer.current.update(delta);
  });

  return model ? (
    <primitive
      ref={group}
      object={model}
      scale={[scale, scale, scale]}
      position={[-0.5, -2.5, 0]}
    />
  ) : (
    <Html
      className="flex mx-auto w-full justify-center items-center"
      position={[0, 0, 0]}
    >
      <p>Loading... {Math.round(progress)}%</p>
    </Html>
  );
}
