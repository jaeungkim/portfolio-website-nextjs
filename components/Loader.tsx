import { useEffect, useState } from "react";

export default function Loader() {
  const [opacityClass, setOpacityClass] = useState("opacity-100");

  useEffect(() => {
    // Start fading out after 3 seconds
    const timer = setTimeout(() => {
      setOpacityClass("opacity-0");
    }, 2500);

    // Clear the timer when the component unmounts
    return () => clearTimeout(timer);
  }, []);
  return (
    <div
      className={`flex justify-center items-center h-screen w-screen absolute top-0 transition-opacity duration-1000 ${opacityClass}`}
    >
      <p className="text-7xl">JAEUNG KIM</p>
    </div>
  );
}
