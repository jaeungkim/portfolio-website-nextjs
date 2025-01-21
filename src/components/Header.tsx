import Navbar from "./Navbar";

function Header() {
  return (
    <header className="sticky top-0 bg-opacity-70 backdrop-blur pointer-events-none flex flex-col py-4 z-40">
      <Navbar />
    </header>
  );
}

export default Header;
