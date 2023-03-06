import Header from "../components/Header";
import About from "../components/About";
import Layout from "../components/shared/layout";

export default function Home() {
  return (
    <Layout>
      <div className="relative px-4 sm:px-8 lg:px-12 max-w-2xl lg:max-w-5xl mx-auto">
        <About />
      </div>
    </Layout>
  );
}
