import Link from "next/link";

const menuItems = [
  { label: "Home", url: "/" },
  { label: "About", url: "/resume" },
  { label: "Blog", url: "/blog" },
];

const Footer = () => {
  return (
    <footer className="mt-32 backdrop-blur w-full border-t border-zinc-100 py-8 dark:border-zinc-700/40">
      <div className="mx-auto max-w-7xl px-4 sm:px-8 lg:px-12">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          <nav className="flex gap-6 text-sm font-medium text-zinc-800 dark:text-zinc-200">
            {menuItems.map((item) => (
              <Link
                key={item.url}
                className="transition hover:text-cyan-500 dark:hover:text-cyan-400"
                href={item.url}
                prefetch
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <p className="text-sm text-zinc-400 dark:text-zinc-500">
            © {new Date().getFullYear()} Jaeung Kim. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
