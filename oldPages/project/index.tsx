import ProjectsGrid from "@/components/projects/ProjectsGrid";
import Layout from "@/components/shared/layout";
function index() {
  return (
    <Layout>
      <h1 className="mb-4 text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
        Project
      </h1>
      <p className="my-6 text-base text-zinc-600 dark:text-zinc-400">
        Here is the collection of my latest projects that showcase my skills and
        passion for software engineering. From interactive applications to
        dynamic 3D websites, my portfolio features a diverse range of projects
        that highlight my creativity, attention to detail, and ability to bring
        ideas to life. Whether you're looking for inspiration or just want to
        see what I'm capable of, take a look at my portfolio and see the
        projects that I'm most proud of.
      </p>
      <ProjectsGrid />
    </Layout>
  );
}

export default index;
