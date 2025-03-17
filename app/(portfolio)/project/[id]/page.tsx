import BackButton from "@/app/components/BackButton";
import { projectsData } from "@/data/projectsData";
import { FiClock, FiTag } from "react-icons/fi";
import Image from "next/image";
import Link from "next/link";

export default async function ProjectSinglePage({ params }) {
  const { id } = await params;
  const projectId = parseInt(id ?? "", 10);
  const project = projectsData.find((item) => item.id === projectId);

  if (!project) {
    return (
      <>
        <BackButton />
        <div className="mt-20 text-center text-zinc-600 dark:text-zinc-400">
          프로젝트를 찾을 수 없습니다.
        </div>
      </>
    );
  }

  return (
    <>
      <BackButton />

      {/* Header */}
      <div className="mt-14 sm:mt-16 mb-7">
        <p className="font-general-medium text-3xl sm:text-4xl font-bold text-zinc-900 dark:text-zinc-100">
          {project.ProjectHeader.title}
        </p>
        <div className="flex flex-wrap gap-6 mt-4">
          {/* Publish Date */}
          <div className="flex items-center text-zinc-600 dark:text-zinc-400">
            <FiClock className="text-xl mr-2" />
            <span>{project.ProjectHeader.publishDate}</span>
          </div>
          {/* Tags */}
          <div className="flex items-center text-zinc-600 dark:text-zinc-400">
            <FiTag className="text-xl mr-2" />
            <span>{project.ProjectHeader.tags}</span>
          </div>
        </div>
      </div>

      {/* Image Gallery */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-10 mt-12">
        {project.ProjectImages.map((img) => (
          <div key={img.id} className="rounded-xl shadow-lg sm:shadow-none">
            {/* You could replace <img> with <Image> for Next.js optimization */}
            <img
              src={img.img}
              alt={img.title}
              className="rounded-xl object-cover w-full"
            />
          </div>
        ))}
      </div>

      {/* Info Section */}
      <div className="block sm:flex gap-0 sm:gap-10 mt-14">
        {/* Left column: Client Info, Objectives, Technologies */}
        <div className="w-full sm:w-1/3 text-left space-y-8">
          {/* Client Info */}
          <div>
            <p className="font-general-regular text-2xl font-semibold text-zinc-800 dark:text-zinc-100 mb-2">
              {project.ProjectInfo.ClientHeading}
            </p>
            <ul className="leading-loose text-zinc-600 dark:text-zinc-400">
              {project.ProjectInfo.CompanyInfo.map((info) => (
                <li key={info.id}>
                  <span>{info.title}: </span>
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href={info.title === "Website" ? info.details : undefined}
                    className={
                      info.title === "Website" || info.title === "Phone"
                        ? "hover:underline hover:text-cyan-500 dark:hover:text-cyan-400 duration-300"
                        : ""
                    }
                  >
                    {info.details}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Objectives */}
          <div>
            <p className="font-general-regular text-2xl font-semibold text-zinc-800 dark:text-zinc-100 mb-2">
              {project.ProjectInfo.ObjectivesHeading}
            </p>
            <p className="font-general-regular text-zinc-600 dark:text-zinc-400">
              {project.ProjectInfo.ObjectivesDetails}
            </p>
          </div>

          {/* Technologies */}
          <div>
            <p className="font-general-regular text-2xl font-semibold text-zinc-800 dark:text-zinc-100 mb-2">
              {project.ProjectInfo.Technologies[0].title}
            </p>
            <p className="font-general-regular text-zinc-600 dark:text-zinc-400">
              {project.ProjectInfo.Technologies[0].techs.join(", ")}
            </p>
          </div>
        </div>

        {/* Right column: Project Details */}
        <div className="w-full sm:w-2/3 text-left mt-10 sm:mt-0">
          <p className="text-2xl font-bold text-zinc-800 dark:text-zinc-100 mb-7">
            {project.ProjectInfo.ProjectDetailsHeading}
          </p>
          {project.ProjectInfo.ProjectDetails.map((detail) => (
            <p
              key={detail.id}
              className="font-general-regular mb-5 text-lg text-zinc-600 dark:text-zinc-400"
            >
              {detail.details}
            </p>
          ))}
        </div>
      </div>
    </>
  );
}
