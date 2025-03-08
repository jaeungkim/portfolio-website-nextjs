import { useEffect, useRef, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

export default function Model() {
  /* Refs */
  const group = useRef();
  const mixer = useRef(new THREE.AnimationMixer(null));
  const targetProgress = useRef(0);
  const animationRequestId = useRef(null);

  /* State */
  const [model, setModel] = useState(null);
  const [progress, setProgress] = useState(0);

  /* Get viewport size for scaling */
  const { size } = useThree();
  const scale = Math.min(size.width, size.height) / 120;

  useEffect(() => {
    const manager = new THREE.LoadingManager();
    manager.onProgress = (_, loaded, total) => {
      targetProgress.current = (loaded / total) * 100;
    };

    const loader = new GLTFLoader(manager);
    loader.load(
      "/models/scene.gltf",
      (gltf) => {
        const [firstNode] = gltf.scene.children;
        setModel(firstNode);

        if (gltf.animations.length) {
          const action = mixer.current.clipAction(
            gltf.animations[0],
            firstNode
          );
          action.play();
        }
      },
      (progressEvent) => {
        targetProgress.current =
          (progressEvent.loaded / progressEvent.total) * 100;
      }
    );
  }, []);

  /* Progress animation */
  useEffect(() => {
    const updateProgress = () => {
      setProgress((prev) =>
        THREE.MathUtils.lerp(prev, targetProgress.current, 0.1)
      );
      if (progress < 100)
        animationRequestId.current = requestAnimationFrame(updateProgress);
    };
    animationRequestId.current = requestAnimationFrame(updateProgress);
    return () => cancelAnimationFrame(animationRequestId.current);
  }, []);

  /* Update animation on each frame */
  useFrame((_, delta) => mixer.current.update(delta));

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
