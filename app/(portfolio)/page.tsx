import {
  FaGithub,
  FaLinkedin,
  FaInstagram,
  FaRegFilePdf,
} from "react-icons/fa";

import SocialIcon from "@/app/components/shared/SocialIcon";
import ModelContainer from "@/app/components/model/ModelContainer";
import CrypticText from "@/app/components/CrypticText";

export default function Page() {
  return (
    <div className="md:flex w-full">
      <div className="w-full relative md:basis-2/6 lg:basis-3/6 py-4 h-96 md:h-auto md:py-1 md:pr-4 max-h-[350px] md:mt-12">
        <ModelContainer />
      </div>

      <article className="md:basis-4/6 lg:basis-3/6">
        <h2 className="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
          <CrypticText
            text="Hello I'm Jay Kim"
            delay={0.1}
            classNames="fadein"
          />
        </h2>

        <p className="mt-4 mb-4 text-base text-zinc-600 dark:text-zinc-400">
          Hey, I'm Jae. I've graduated from{" "}
          <a
            href="https://www.ubc.ca/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#0055B7]"
          >
            University of British Columbia{" "}
          </a>
          with a Computer Science degree back in 2020, and since then, I've been
          working as a software developer.
        </p>

        <p className="text-base text-zinc-600 dark:text-zinc-400 mb-4">
          This is my personal space on the internet dedicated to showcasing my
          writing, various projects, tutorials, and any other content I'm
          passionate about sharing. Dive into the blog or check out the projects
          page for a glimpse of my work.
        </p>

        <p className="text-base text-zinc-600 dark:text-zinc-400 mb-4">
          Currently, I am living in South Korea working at
          <a
            href="https://e8ight.co.kr/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-cyan-500"
          >
            {" "}
            E8ight{" "}
          </a>
          as a frontend developer, located at Lotte World Tower, the
          sixth-tallest building in the world.
        </p>

        {/* Social Links */}
        <div className="mt-6 flex gap-6">
          <SocialIcon
            href="https://github.com/jaeungkim"
            IconComponent={FaGithub}
          />
          <SocialIcon
            href="https://www.linkedin.com/in/jaeungkim0526/"
            IconComponent={FaLinkedin}
          />
          {/* <SocialIcon
            href="https://www.instagram.com/jaekiim/"
            IconComponent={FaInstagram}
          /> */}
          <SocialIcon href="/resume" IconComponent={FaRegFilePdf} />
        </div>
      </article>
    </div>
  );
}
