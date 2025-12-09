import Image from "next/image";
import Link from "next/link";
import ThemeToggle from "../shared/buttons/ThemeToggle";
import { getPlaceholderForImage } from "@/src/lib/placeholders";

const navigation = [
  { name: "Home", href: "/" },
  { name: "About", href: "/resume" },
  { name: "Blog", href: "/blog" },
];

export default async function Navbar() {
  const profileImagePath = "/images/ill_prof.jpeg";
  const blurDataURL = await getPlaceholderForImage(profileImagePath);

  return (
    <header className="sticky top-0 z-40 bg-opacity-70 backdrop-blur py-4 h-[64px]">
      <div className="size-full mx-auto max-w-7xl relative px-4 sm:px-8 lg:px-12 flex items-center justify-between">
        <div className="flex flex-1">
          <Link href="/" className="pointer-events-auto">
            <Image
              src={profileImagePath}
              alt="profileLogo"
              width={36}
              height={36}
              priority
              className="size-8 rounded-full object-cover"
              placeholder={blurDataURL ? "blur" : undefined}
              blurDataURL={blurDataURL}
            />
          </Link>
        </div>

        <div className="md:flex-1 md:justify-center">
          <nav className="pointer-events-auto">
            <ul className="justify-center items-center flex rounded-full px-3 text-sm font-medium text-zinc-800 backdrop-blur  dark:text-zinc-200">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  prefetch={true}
                  className="relative block px-3 py-2 transition hover:text-neutral-500 dark:hover:text-neutral-400"
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
