import { useAppStore } from "@/store/useAppStore";
import { contact } from "@/data/resume";

export default function Navigation() {
  const activeObject = useAppStore((s) => s.activeObject);

  return (
    <div
      className="pointer-events-none fixed inset-x-0 top-0 z-20 flex items-start justify-between p-6 transition-opacity duration-300"
      style={{ opacity: activeObject ? 0.4 : 1 }}
    >
      <div>
        <h1 className="text-lg font-bold tracking-tight text-white">Vasilis Roumeliotis</h1>
        <p className="text-xs text-white/50">AI Software Engineer</p>
      </div>

      <div className="pointer-events-auto flex gap-4">
        <a
          href={`mailto:${contact.email}`}
          className="text-xs text-white/40 transition-colors hover:text-white/80"
          target="_blank"
          rel="noopener noreferrer"
        >
          Email
        </a>
        <a
          href={`https://${contact.linkedin}`}
          className="text-xs text-white/40 transition-colors hover:text-white/80"
          target="_blank"
          rel="noopener noreferrer"
        >
          LinkedIn
        </a>
        <a
          href={`https://${contact.github}`}
          className="text-xs text-white/40 transition-colors hover:text-white/80"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </a>
      </div>
    </div>
  );
}
