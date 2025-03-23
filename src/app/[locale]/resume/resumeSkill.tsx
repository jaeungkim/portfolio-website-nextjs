export default function ResumeSkill() {
  return (
    <>
      <div className="mb-11 font-semibold text-cyan-500 text-3xl uppercase">
        SKill
      </div>

      <div className="md:grid md:grid-cols-4 md:gap-4 mb-8">
        <div className="text-2xl font-medium text-[#808080] md:text-right md:px-4">
          Frontend
        </div>
        <div className="col-span-3">
          <ul className="text-base font-normal pl-8 list-disc grid grid-cols-4 gap-2">
            <li>React</li>
            <li>Next.js</li>
            <li>React Query</li>
            <li>Recoil</li>
            <li>Zustand</li>
            <li>Redux</li>
            <li>JavaScript</li>
            <li>TypeScript</li>
            <li>WebGL</li>
            <li>Three.js</li>
            <li>GSAP</li>
            <li>Tailwind</li>
            <li>Storybook</li>
            <li>Figma</li>
          </ul>
        </div>
      </div>

      <div className="md:grid md:grid-cols-4 md:gap-4 mb-8">
        <div className="text-2xl font-medium text-[#808080] md:text-right md:px-4">
          Backend
        </div>
        <div className="col-span-3">
          <ul className="text-base font-normal pl-8 list-disc grid grid-cols-4 gap-2">
            <li>Node.js</li>
            <li>Nest.js</li>
            <li>Express.js</li>
            <li>PostgreSQL</li>
            <li>MongoDB</li>
          </ul>
        </div>
      </div>

      <div className="md:grid md:grid-cols-4 md:gap-4 mb-8">
        <div className="text-2xl font-medium text-[#808080] md:text-right md:px-4">
          DevOps
        </div>
        <div className="col-span-3">
          <ul className="text-base font-normal pl-8 list-disc grid grid-cols-4 gap-2">
            <li>AWS</li>
            <li>NGINX</li>
            <li>Docker</li>
            <li>Jenkins</li>
          </ul>
        </div>
      </div>

      <div className="md:grid md:grid-cols-4 md:gap-4">
        <div className="text-2xl font-medium text-[#808080] md:text-right md:px-4">
          Misc.
        </div>
        <div className="col-span-3">
          <ul className="text-base font-normal pl-8 list-disc grid grid-cols-4 gap-2">
            <li>Java</li>
            <li>Agile/Scrum</li>
            <li>Jira</li>
            <li>Confluence</li>
            <li>Git</li>
            <li>GitHub</li>
            <li>GitLab</li>
            <li>BitBucket</li>
            <li>Slack</li>
            <li>VS Code</li>
          </ul>
        </div>
      </div>
      <hr className="my-11 h-px bg-gray-200 border-0 dark:bg-gray-700"></hr>
    </>
  );
}
