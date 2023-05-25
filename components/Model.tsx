import { useAnimations, useGLTF, Html } from "@react-three/drei";
import { useLoader, useThree, useFrame } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GLTF, GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { AnimationAction, Object3D } from "three";
import { AnimationClip } from "three";

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

  /* Mixer */
  const [mixer] = useState(() => new THREE.AnimationMixer(null));

  const { size } = useThree();
  const scale = Math.min(size.width, size.height) / 5;

  // Play the animation when the component mounts
  useEffect(() => {
    const loader = new GLTFLoader();
    loader.load("/models/dragon.glb", async (gltf) => {
      const nodes = await gltf.parser.getDependencies("node");
      const animations = await gltf.parser.getDependencies("animation");
      setModel(nodes[0]);
      setAnimation(animations);
    });
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
          position={[0, 2, 0]}
          dispose={null}
        />
      ) : (
        <Html>Loading...</Html>
      )}
    </>
  );
}
