import Head from "next/head";
import Layout from "../components/layout";
import Link from "next/link";
import Box from "../components/box";
import { Canvas } from "@react-three/fiber";
export default function Home() {
  return (
    <Layout home>
      <Head>
        <title>Jaeung Kim</title>
      </Head>
      <Canvas>
        <color attach="background" args={["#fff"]} />
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
        <pointLight position={[-10, -10, -10]} />
        <Box position={[-1.2, 0, 0]} />
        <Box position={[1.2, 0, 0]} />
      </Canvas>
      <Link href={`/blog`}>Blog</Link>
    </Layout>
  );
}
