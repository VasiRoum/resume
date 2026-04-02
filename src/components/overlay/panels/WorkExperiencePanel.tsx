import { memo } from "react";
import { workExperience } from "@/data/resume";

interface Props {
  section: keyof typeof workExperience;
  accentColor: string;
}

export default memo(function WorkExperiencePanel({ section, accentColor }: Props) {
  const entries = workExperience[section];
  return (
    <div className="space-y-6">
      {entries.map((entry) => (
        <div key={entry.company}>
          <h2 className="text-xl font-bold text-white">{entry.role}</h2>
          <p className="mt-1 text-sm" style={{ color: accentColor }}>
            {entry.company} &middot; {entry.period}
          </p>
          <ul className="mt-4 space-y-2">
            {entry.bullets.map((b, i) => (
              <li key={i} className="flex gap-2 text-sm leading-relaxed text-white/80">
                <span
                  className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full"
                  style={{ backgroundColor: accentColor }}
                />
                {b}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
});
