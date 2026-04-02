import { sideProjects } from "@/data/resume";

export default function SideProjectsPanel() {
  return (
    <div className="space-y-6">
      {sideProjects.map((project) => (
        <div key={project.name}>
          <h2 className="text-lg font-bold text-white">{project.name}</h2>
          <p className="mt-0.5 text-sm text-red-300">{project.description}</p>
          <ul className="mt-3 space-y-2">
            {project.bullets.map((b, i) => (
              <li key={i} className="flex gap-2 text-sm leading-relaxed text-white/80">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-red-400" />
                {b}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
