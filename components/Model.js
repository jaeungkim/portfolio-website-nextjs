import { useGLTF } from "@react-three/drei";
import { useThree } from "@react-three/fiber";

export default function Model(props) {
  const { scene } = useGLTF("/models/panda.glb");
  const { size } = useThree();
  const scale = Math.min(size.width, size.height) / 5; // Adjust the scale value here

  return (
    <primitive
      object={scene}
      scale={[scale, scale, scale]}
      position={[0, 2, 0]}
      dispose={null}
      {...props}
    />
  );
}
