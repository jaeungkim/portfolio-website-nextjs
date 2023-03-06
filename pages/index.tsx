import { Fragment } from "react";
import Header from "../components/Header";
import About from "../components/About";

export default function Home() {
  return (
    <Fragment>
      <div className="relative">
        <Header />
        <main className="sm:px-8 mt-9 mx-auto max-w-7xl lg:px-8">
          <div className="relative px-4 sm:px-8 lg:px-12 max-w-2xl lg:max-w-5xl mx-auto">
            <About />
          </div>
        </main>
      </div>
    </Fragment>
  );
}
