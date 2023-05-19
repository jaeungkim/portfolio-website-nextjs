import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";

function SocialIcon({ href, IconComponent }) {
  return (
    <a className="group -m-1 p-1" href={href}>
      <IconComponent className="h-6 w-6 fill-zinc-500 transition group-hover:fill-zinc-600 dark:fill-zinc-400 dark:group-hover:fill-zinc-300" />
    </a>
  );
}

export default function About() {
  return (
    <article>
      {/* <h1 className="mb-4 text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
      </h1> */}
      <h2 className="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-4xl">
        About
      </h2>
      {/* <p className="my-6 text-base text-zinc-600 dark:text-zinc-400">
        You can also call me Jae 🙂.
      </p> */}
      <p className="my-6 text-base text-zinc-600 dark:text-zinc-400">
        I am a highly motivated and collaborative software engineer with 2 years
        of experience in designing, building, and maintaining software for
        startup companies. I primarily focus on full-stack web development but I
        also have experiences working as a designer and product owner depending
        on the needs of the company.
      </p>
      <div className="mt-6 flex gap-6">
        <SocialIcon
          href="https://github.com/jaeungkim"
          IconComponent={FaGithub}
        />
        <SocialIcon
          href="https://www.linkedin.com/in/jaeungkim0526/"
          IconComponent={FaLinkedin}
        />
        <SocialIcon
          href="https://www.instagram.com/jaekiim/"
          IconComponent={FaInstagram}
        />
      </div>
    </article>
  );
}
