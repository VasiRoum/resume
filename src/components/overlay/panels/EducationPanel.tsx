import { memo } from "react";
import { education, languages } from "@/data/resume";

export default memo(function EducationPanel() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="mb-3 text-sm font-semibold text-white/60 uppercase">Education</h3>
        {education.map((entry) => (
          <div key={entry.institution}>
            <h2 className="text-lg font-bold text-white">{entry.degree}</h2>
            <p className="mt-0.5 text-sm text-cyan-300">
              {entry.institution} &middot; {entry.period}
            </p>
            {entry.details && (
              <ul className="mt-3 space-y-2">
                {entry.details.map((d, i) => (
                  <li key={i} className="flex gap-2 text-sm leading-relaxed text-white/80">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-400" />
                    {d}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>

      <div>
        <h3 className="mb-3 text-sm font-semibold text-white/60 uppercase">Languages</h3>
        <div className="space-y-2">
          {languages.map((lang) => (
            <div key={lang.language} className="flex items-center justify-between text-sm">
              <span className="text-white/80">{lang.language}</span>
              <span className="text-cyan-300">{lang.level}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
});
