// import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import React from "react";


function SocialIcon({ href, IconComponent }) {
  return (
    <a className="group -m-1 p-1" href={href}>
      <IconComponent className="h-6 w-6 fill-zinc-500 transition group-hover:fill-zinc-600 dark:fill-zinc-400 dark:group-hover:fill-zinc-300" />
    </a>
  );
}

export default function About() {


  return (
    <div className="md:flex w-full">
      <div className="w-full relative md:basis-2/6 lg:basis-3/6 py-4 h-96 md:h-auto md:py-1 md:pr-4 max-h-[350px] md:mt-12">

      </div>
      <article className="md:basis-4/6 lg:basis-3/6">
        <h2 className="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
          <p>Hello I'm Jay Kim</p>
        </h2>
        <p className="mt-4 mb-4 text-base text-zinc-600 dark:text-zinc-400">
          Hey, I'm Jae. I've graduated from{" "}
          <span>
            <a
              href="https://www.ubc.ca/"
              target="_blank"
              className="hover:text-[#0055B7]"
            >
              University of British Columbia{" "}
            </a>
          </span>
          with Computer Science degree back in 2020, and since then, I've been
          working as a software developer.
        </p>
        <p className="text-base text-zinc-600 dark:text-zinc-400 mb-4">
          This is my personal space on the internet dedicated to showcasing my
          writing, various projects, tutorials, art pieces, and any other
          content I'm passionate about sharing. Dive into the blog or check out
          the projects page for a glimpse of my work.
        </p>
        <p className="text-base text-zinc-600 dark:text-zinc-400 mb-4">
          Currently, I am living in South Korea working at
          <span>
            <a
              href="https://e8ight.co.kr/"
              target="_blank"
              className="hover:text-cyan-500"
            >
              {" "}
              E8ight{" "}
            </a>
          </span>
          as a frontend developer, located at lotte world tower, sixth-tallest
          building in the world.
        </p>

        <div className="mt-6 flex gap-6">
          {/* <SocialIcon
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
          /> */}
        </div>
      </article>
    </div>
  );
}
