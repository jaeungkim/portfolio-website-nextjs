import { useAnimations, useGLTF, Html } from "@react-three/drei";
import { useLoader, useThree, useFrame } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GLTF, GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { AnimationAction, Object3D } from "three";
import { AnimationClip } from "three";
import { LoadingManager } from "three";

interface group {
  current: {
    rotation: {
      x: number;
      y: number;
    };
  };
}

interface actions {
  current: {
    idle: {
      play: () => void;
    };
  };
}

export default function Model() {
  /* Refs */
  const group: group = useRef();
  const actions: actions = useRef();

  const [model, setModel] = useState<Object3D | null>(null);
  const [animation, setAnimation] = useState<AnimationClip[] | null>(null);
  const [progress, setProgress] = useState<number>(0);
  const [loadingComplete, setLoadingComplete] = useState<boolean>(false);

  /* Mixer */
  const [mixer] = useState(() => new THREE.AnimationMixer(null));

  const { size } = useThree();
  const scale = Math.min(size.width, size.height) / 100;

  // Play the animation when the component mounts
  useEffect(() => {
    const manager = new THREE.LoadingManager();
    manager.onProgress = (url, itemsLoaded, itemsTotal) => {
      const progressPercentage = (itemsLoaded / itemsTotal) * 100;
      setProgress(progressPercentage);
    };
    const loader = new GLTFLoader(manager);
    loader.load(
      "/models/scene.gltf",
      async (gltf) => {
        const nodes = await gltf.parser.getDependencies("node");
        const animations = await gltf.parser.getDependencies("animation");
        setModel(nodes[0]);
        setAnimation(animations);
        setLoadingComplete(true);
      },
      (progressEvent) => {
        const progressPercentage =
          (progressEvent.loaded / progressEvent.total) * 100;
        setProgress(progressPercentage);
      }
    );
  }, []);

  /* Set animation */
  useEffect(() => {
    if (animation && typeof group.current != "undefined") {
      actions.current = {
        idle: mixer.clipAction(animation[0], group.current as Object3D),
      };
      actions.current.idle.play();
      return () => animation.forEach((clip) => mixer.uncacheClip(clip));
    }
  }, [animation]);

  /* Animation update */
  useFrame((_, delta) => mixer.update(delta));
  /* Rotation */
  // useFrame(() => {
  //   if (typeof group.current != "undefined")
  //     return (group.current.rotation.y += 0.01);
  // });

  return (
    <>
      {model ? (
        <primitive
          ref={group}
          object={model}
          scale={[scale, scale, scale]}
          position={[-0.5, -2.5, 0]}
          dispose={null}
        />
      ) : (
        <Html
          className="flex mx-auto w-full justify-center items-center"
          position={[0, 0, 0]}
        >
          <p>Loading... {Math.round(progress)}%</p>
        </Html>
      )}
    </>
  );
}
