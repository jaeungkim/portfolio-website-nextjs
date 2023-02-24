import Head from "next/head";
import Layout from "../components/layout";
import Link from "next/link";

export default function Home() {
  return (
    <Layout home>
      <Head>
        <title>Jaeung Kim</title>
      </Head>
      <div>
        <p className="text-3xl font-bold underline">Hello</p>
      </div>
      <Link href={`/blog`}>Blog</Link>
    </Layout>
  );
}
