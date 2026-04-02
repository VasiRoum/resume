import { AnimatePresence, motion } from "framer-motion";
import { useAppStore } from "@/store/useAppStore";
import { sceneObjects } from "@/data/scene-config";
import SummaryPanel from "./panels/SummaryPanel";
import WorkExperiencePanel from "./panels/WorkExperiencePanel";
import SideProjectsPanel from "./panels/SideProjectsPanel";
import EducationPanel from "./panels/EducationPanel";
type PanelRenderer = (accentColor: string) => React.ReactNode;

const panelMap: Record<string, PanelRenderer> = {
  macbook: () => <SummaryPanel />,
  train: (c) => <WorkExperiencePanel section="logistics" accentColor={c} />,
  medicine: (c) => <WorkExperiencePanel section="pharma" accentColor={c} />,
  robot: (c) => <WorkExperiencePanel section="ai" accentColor={c} />,
  wrench: (c) => <WorkExperiencePanel section="enterprise" accentColor={c} />,
  boxing: () => <SideProjectsPanel />,
  globe: () => <EducationPanel />,
};

export default function ContentPanel() {
  const activeObject = useAppStore((s) => s.activeObject);
  const reset = useAppStore((s) => s.reset);

  const renderPanel = activeObject ? panelMap[activeObject] : null;
  const config = activeObject ? sceneObjects[activeObject] : null;

  return (
    <div className="pointer-events-none fixed inset-0 z-10">
      <AnimatePresence mode="wait">
        {renderPanel && config && (
          <motion.div
            key={activeObject}
            // Desktop: slide from right. Mobile: slide from bottom.
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="pointer-events-auto absolute
              /* Mobile: bottom sheet */
              bottom-0 right-0 left-0 max-h-[60vh] w-full overflow-y-auto rounded-t-2xl border-t border-white/10 bg-black/85 p-6 backdrop-blur-xl
              /* Desktop: side panel */
              md:top-0 md:left-auto md:h-full md:max-h-full md:w-full md:max-w-md md:rounded-none md:border-t-0 md:border-l md:p-8"
            style={{
              boxShadow: `inset 2px 0 20px ${config.accentColor}20`,
            }}
          >
            {/* Close button */}
            <button
              onClick={() => reset()}
              className="absolute top-4 right-4 flex h-10 w-10 items-center justify-center rounded-full text-white/60 transition-colors hover:bg-white/10 hover:text-white md:h-8 md:w-8"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            {/* Mobile drag handle */}
            <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-white/20 md:hidden" />

            {/* Section label */}
            <div
              className="mb-6 text-xs font-semibold tracking-widest uppercase"
              style={{ color: config.accentColor }}
            >
              {config.label}
            </div>

            {renderPanel(config.accentColor)}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
