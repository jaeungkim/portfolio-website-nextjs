import Layout from "@/components/shared/layout";
import { FiClock, FiTag } from "react-icons/fi";
import { projectsData } from "@/data/projectsData";
import BackButton from "@/app/components/BackButton";

function ProjectSingle(props) {
  return (
    <Layout>
      <BackButton />
      {/* Header */}
      <div>
        <p className="font-general-medium text-left text-3xl sm:text-4xl font-bold text-zinc-900 dark:text-zinc-100 mt-14 sm:mt-16 mb-7">
          {props.project.ProjectHeader.title}
        </p>
        <div className="flex">
          <div className="flex items-center mr-10">
            <FiClock className="text-xl text-zinc-600 dark:text-zinc-400" />
            <span className="font-general-regular ml-2 leading-none text-zinc-600 dark:text-zinc-400">
              {props.project.ProjectHeader.publishDate}
            </span>
          </div>
          <div className="flex items-center">
            <FiTag className="w-4 h-4 text-zinc-600 dark:text-zinc-400" />
            <span className="font-general-regular ml-2 leading-none text-zinc-600 dark:text-zinc-400">
              {props.project.ProjectHeader.tags}
            </span>
          </div>
        </div>
      </div>

      {/* Gallery */}
      <div className="grid grid-cols-1 sm:grid-cols-3 sm:gap-10 mt-12">
        {props.project.ProjectImages.map((project) => {
          return (
            <div className="mb-10 sm:mb-0" key={project.id}>
              <img
                src={project.img}
                className="rounded-xl  shadow-lg sm:shadow-none"
                alt={project.title}
                key={project.id}
              />
            </div>
          );
        })}
      </div>

      {/* Info */}
      <div className="block sm:flex gap-0 sm:gap-10 mt-14">
        <div className="w-full sm:w-1/3 text-left">
          <div className="mb-7">
            <p className="font-general-regular text-2xl font-semibold text-zinc-800 dark:text-zinc-100 mb-2">
              {props.project.ProjectInfo.ClientHeading}
            </p>
            <ul className="leading-loose">
              {props.project.ProjectInfo.CompanyInfo.map((info) => {
                return (
                  <li
                    className="font-general-regular text-zinc-600 dark:text-zinc-400"
                    key={info.id}
                  >
                    <span>{info.title}: </span>
                    <a
                      target={"_blank"}
                      href={info.title === "Website" ? info.details : null}
                      className={
                        info.title === "Website" || info.title === "Phone"
                          ? "hover:underline hover:text-cyan-500 dark:hover:text-cyan-400  duration-300"
                          : ""
                      }
                      aria-label="Project Website and Phone"
                    >
                      {info.details}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Single project objectives */}
          <div className="mb-7">
            <p className="font-general-regular text-2xl font-semibold text-zinc-800 dark:text-zinc-100 mb-2">
              {props.project.ProjectInfo.ObjectivesHeading}
            </p>
            <p className="font-general-regular text-zinc-600 dark:text-zinc-400">
              {props.project.ProjectInfo.ObjectivesDetails}
            </p>
          </div>

          {/* Single project technologies */}
          <div className="mb-7">
            <p className="font-general-regular text-2xl font-semibold text-zinc-800 dark:text-zinc-100 mb-2">
              {props.project.ProjectInfo.Technologies[0].title}
            </p>
            <p className="font-general-regular text-zinc-600 dark:text-zinc-400">
              {props.project.ProjectInfo.Technologies[0].techs.join(", ")}
            </p>
          </div>
        </div>

        {/*  Single project right section details */}
        <div className="w-full sm:w-2/3 text-left mt-10 sm:mt-0">
          <p className="text-zinc-800 dark:text-zinc-100 text-2xl font-bold mb-7">
            {props.project.ProjectInfo.ProjectDetailsHeading}
          </p>
          {props.project.ProjectInfo.ProjectDetails.map((details) => {
            return (
              <p
                key={details.id}
                className="font-general-regular mb-5 text-lg text-zinc-600 dark:text-zinc-400"
              >
                {details.details}
              </p>
            );
          })}
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps({ query }) {
  const { id } = query;
  return {
    props: {
      project: projectsData.filter((project) => project.id === parseInt(id))[0],
    },
  };
}

export default ProjectSingle;
