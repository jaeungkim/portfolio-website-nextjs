import { Canvas, useFrame } from "@react-three/fiber";
import React, { useRef } from "react";
import * as THREE from "three";

function Background() {
  return (
    <mesh>
      <boxBufferGeometry args={[50, 50, 50]} />
      <meshStandardMaterial color={new THREE.Color(0x4287f5)} />
    </mesh>
  );
}

export default function ParticleBackground() {
  return (
    <Canvas camera={{ position: [0, 0, 100] }}>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <Background />
    </Canvas>
  );
}
