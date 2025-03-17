import { Html, useProgress } from "@react-three/drei";

export default function Loader() {
  const { progress } = useProgress();

  return (
    <Html center>
      <div className="flex flex-col justify-center items-center bg-white/80 p-4 rounded-md">
        <p className="text-black text-sm">Loading... {progress.toFixed(0)}%</p>
      </div>
    </Html>
  );
}
