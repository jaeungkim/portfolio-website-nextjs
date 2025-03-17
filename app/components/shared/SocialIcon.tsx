export default function SocialIcon({ href, IconComponent }) {
  return (
    <a
      className="group -m-1 p-1"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
    >
      <IconComponent className="size-6 transition group-hover:fill-zinc-600 dark:fill-zinc-400 dark:group-hover:fill-zinc-300" />
    </a>
  );
}
