import Navbar from "./Navbar";

function Header() {
  return (
    <header className="pointer-events-none relative flex flex-col h-full py-6">
      <Navbar />
    </header>
  );
}

export default Header;
