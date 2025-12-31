import Link from "next/link";
import ThemeToggle from "../shared/ThemeToggle";
import AnimatedProfileLogo from "../shared/AnimatedProfileLogo";

const navigation = [
  { name: "Home", href: "/" },
  { name: "About", href: "/resume" },
  { name: "Blog", href: "/blog" },
];

export default async function Navbar() {
  return (
    <header className="sticky top-0 z-40 bg-opacity-70 backdrop-blur py-4 h-[64px]">
      <div className="size-full mx-auto max-w-5xl relative px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <div className="flex flex-1">
          <Link href="/" className="pointer-events-auto">
            <AnimatedProfileLogo className="h-6 w-auto text-foreground" />
          </Link>
        </div>

        <div className="md:flex-1 md:justify-center">
          <nav className="pointer-events-auto">
            <ul className="justify-center items-center flex rounded-full px-3 text-sm font-medium text-foreground backdrop-blur">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  prefetch={true}
                  className="relative block px-3 py-2 transition hover:text-muted-foreground"
                >
                  {item.name}
                </Link>
              ))}
            </ul>
          </nav>
        </div>

        <div className="flex gap-2 justify-end flex-1">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
