import Link from "next/link";

const menuItems = [
  { label: "Home", url: "/" },
  { label: "About", url: "/resume" },
  { label: "Blog", url: "/blog" },
];

export function Footer() {
  return (
    <footer className="mt-32 backdrop-blur w-full border-t border-border py-8">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          <nav className="flex gap-6 text-sm font-medium text-foreground">
            {menuItems.map((item) => (
              <Link
                key={item.url}
                className="transition hover:text-primary"
                href={item.url}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <p className="text-sm text-muted-foreground">
            © Jaeung Kim. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
