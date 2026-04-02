import { summary, contact, techSkills } from "@/data/resume";

export default function SummaryPanel() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white">Vasilis Roumeliotis</h2>
        <p className="mt-1 text-sm text-blue-300">AI Software Engineer</p>
      </div>

      <p className="leading-relaxed text-white/80">{summary}</p>

      <div>
        <h3 className="mb-2 text-sm font-semibold text-white/60 uppercase">Contact</h3>
        <div className="space-y-1 text-sm">
          <a
            href={`mailto:${contact.email}`}
            className="block text-blue-300 hover:text-blue-200"
            target="_blank"
            rel="noopener noreferrer"
          >
            {contact.email}
          </a>
          <a
            href={`https://${contact.linkedin}`}
            className="block text-blue-300 hover:text-blue-200"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
          <a
            href={`https://${contact.github}`}
            className="block text-blue-300 hover:text-blue-200"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
          <p className="text-white/60">{contact.location}</p>
        </div>
      </div>

      <div>
        <h3 className="mb-3 text-sm font-semibold text-white/60 uppercase">Tech Skills</h3>
        <div className="space-y-3">
          {Object.entries(techSkills).map(([category, skills]) => (
            <div key={category}>
              <p className="mb-1 text-xs font-medium text-white/40 capitalize">{category}</p>
              <div className="flex flex-wrap gap-1.5">
                {skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full bg-white/10 px-2.5 py-0.5 text-xs text-white/80"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
