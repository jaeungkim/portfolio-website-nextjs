import Pill from "@/src/components/shared/Pill";
import ResumeTitle from "./ResumeTitle";

export default function ResumeSkill() {
  return (
    <>
      <ResumeTitle title="Skills" />

      <div className="mt-8 space-y-8">
        {/* Frontend */}
        <div className="md:grid md:grid-cols-4 md:gap-2">
          <div className="text-2xl font-medium text-muted-foreground mb-2 md:mb-0">
            Frontend
          </div>
          <ul className="col-span-3 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-1 pl-5 list-disc text-base">
            <li>Next.js</li>
            <li>React</li>
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

        {/* Backend */}
        <div className="md:grid md:grid-cols-4 md:gap-2">
          <div className="text-2xl font-medium text-muted-foreground mb-2 md:mb-0">
            Backend
          </div>
          <ul className="col-span-3 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-1 pl-5 list-disc text-base">
            <li>Node.js</li>
            <li>Nest.js</li>
            <li>Express.js</li>
            <li>PostgreSQL</li>
            <li>MongoDB</li>
          </ul>
        </div>

        {/* DevOps */}
        <div className="md:grid md:grid-cols-4 md:gap-2">
          <div className="text-2xl font-medium text-muted-foreground mb-2 md:mb-0">
            DevOps
          </div>
          <ul className="col-span-3 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-1 pl-5 list-disc text-base">
            <li>AWS</li>
            <li>Docker</li>
            <li>Jenkins</li>
          </ul>
        </div>
      </div>
    </>
  );
}
