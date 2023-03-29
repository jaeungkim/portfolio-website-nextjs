import { useGLTF } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { GLTF } from "three/examples/jsm/loaders/GLTFLoader";

type ModelProps = JSX.IntrinsicElements["group"];

export default function Model(props: ModelProps) {
  const { scene } = useGLTF("/models/panda.glb") as GLTF;
  const { size } = useThree();
  const scale = Math.min(size.width, size.height) / 5;

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
