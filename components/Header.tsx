import Navbar from "./Navbar";

const Header = () => {
  return (
    <header className="pointer-events-none relative flex flex-col">
      <div className="flex h-full py-6 flex-col">
        <Navbar />
      </div>
    </header>
  );
};

export default Header;
