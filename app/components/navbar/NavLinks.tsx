import Link from "next/link";
import { usePathname } from "next/navigation";

export const navigation = [
  { name: "Home", href: "/" },
  { name: "Blog", href: "/blog" },
  { name: "Project", href: "/project" },
];

export default function NavLinks() {
  const pathname = usePathname();

  return (
    <ul className="flex rounded-full bg-white/90 px-3 text-sm font-medium text-zinc-800 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur dark:bg-zinc-800/90 dark:text-zinc-200 dark:ring-white/10 dark:hover:ring-white/20">
      {navigation.map((item) => (
        <li key={item.name}>
          <Link
            className={`relative block px-3 py-2 transition ${
              pathname === item.href
                ? "text-cyan-500 dark:text-cyan-400"
                : "hover:text-cyan-500 dark:hover:text-cyan-400"
            }`}
            href={item.href}
          >
            {item.name}
          </Link>
        </li>
      ))}
    </ul>
  );
}
