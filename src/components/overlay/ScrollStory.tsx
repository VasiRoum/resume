import { useEffect, useMemo, useRef } from "react";
import { sceneObjects } from "@/data/scene-config";
import SummaryPanel from "./panels/SummaryPanel";
import WorkExperiencePanel from "./panels/WorkExperiencePanel";
import SideProjectsPanel from "./panels/SideProjectsPanel";
import EducationPanel from "./panels/EducationPanel";
import { useAppStore } from "@/store/useAppStore";

type SectionKey = keyof typeof sceneObjects;

interface StorySection {
  id: string;
  objectKey: SectionKey | null;
  label: string;
  accentColor: string;
  title: string;
  eyebrow: string;
  render: () => React.ReactNode;
}

const sections: StorySection[] = [
  {
    id: "intro",
    objectKey: null,
    label: "Overview",
    accentColor: "#60a5fa",
    title: "Scroll through the desk to move across the resume.",
    eyebrow: "Interactive Resume",
    render: () => (
      <div className="space-y-4 text-sm leading-relaxed text-white/70">
        <p>
          The scene now follows a guided story. Scroll to move the camera, reveal each section,
          and explore the resume as a sequence instead of a static landing page.
        </p>
        <p>
          Clicking an object still works and will jump the story rail to the matching section.
        </p>
      </div>
    ),
  },
  {
    id: "macbook",
    objectKey: "macbook",
    label: sceneObjects.macbook.label,
    accentColor: sceneObjects.macbook.accentColor,
    title: "Profile",
    eyebrow: "Start Here",
    render: () => <SummaryPanel />,
  },
  {
    id: "robot",
    objectKey: "robot",
    label: sceneObjects.robot.label,
    accentColor: sceneObjects.robot.accentColor,
    title: "AI systems and agentic product work",
    eyebrow: "Featured Work",
    render: () => <WorkExperiencePanel section="ai" accentColor={sceneObjects.robot.accentColor} />,
  },
  {
    id: "wrench",
    objectKey: "wrench",
    label: sceneObjects.wrench.label,
    accentColor: sceneObjects.wrench.accentColor,
    title: "Enterprise delivery across real-world constraints",
    eyebrow: "Featured Work",
    render: () => (
      <WorkExperiencePanel section="enterprise" accentColor={sceneObjects.wrench.accentColor} />
    ),
  },
  {
    id: "train",
    objectKey: "train",
    label: sceneObjects.train.label,
    accentColor: sceneObjects.train.accentColor,
    title: "Logistics systems built for operational speed",
    eyebrow: "Earlier Work",
    render: () => (
      <WorkExperiencePanel section="logistics" accentColor={sceneObjects.train.accentColor} />
    ),
  },
  {
    id: "medicine",
    objectKey: "medicine",
    label: sceneObjects.medicine.label,
    accentColor: sceneObjects.medicine.accentColor,
    title: "Domain-heavy product engineering in pharma",
    eyebrow: "Earlier Work",
    render: () => (
      <WorkExperiencePanel section="pharma" accentColor={sceneObjects.medicine.accentColor} />
    ),
  },
  {
    id: "boxing",
    objectKey: "boxing",
    label: sceneObjects.boxing.label,
    accentColor: sceneObjects.boxing.accentColor,
    title: "Projects beyond client work",
    eyebrow: "Side Projects",
    render: () => <SideProjectsPanel />,
  },
  {
    id: "globe",
    objectKey: "globe",
    label: sceneObjects.globe.label,
    accentColor: sceneObjects.globe.accentColor,
    title: "Academic foundation and languages",
    eyebrow: "Education",
    render: () => <EducationPanel />,
  },
];

export default function ScrollStory() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});
  const rafRef = useRef<number | null>(null);
  const currentSectionRef = useRef("intro");
  const pointerInPanel = useRef(false);
  const activeObject = useAppStore((s) => s.activeObject);
  const reset = useAppStore((s) => s.reset);
  const setActiveObject = useAppStore((s) => s.setActiveObject);

  const sectionByObject = useMemo(
    () =>
      Object.fromEntries(
        sections
          .filter((section) => section.objectKey)
          .map((section) => [section.objectKey, section.id]),
      ) as Record<SectionKey, string>,
    [],
  );

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const updateActiveSection = () => {
      rafRef.current = null;

      // Don't update while camera is still flying to a target
      if (useAppStore.getState().isTransitioning) return;

      const viewportCenter = window.innerHeight / 2;
      let nextSectionId = currentSectionRef.current;
      let smallestDistance = Number.POSITIVE_INFINITY;

      for (const section of sections) {
        const element = sectionRefs.current[section.id];
        if (!element) continue;
        const rect = element.getBoundingClientRect();
        const sectionCenter = rect.top + rect.height / 2;
        const distance = Math.abs(sectionCenter - viewportCenter);
        if (distance < smallestDistance) {
          smallestDistance = distance;
          nextSectionId = section.id;
        }
      }

      if (nextSectionId === currentSectionRef.current) return;

      currentSectionRef.current = nextSectionId;
      const nextSection = sections.find((section) => section.id === nextSectionId);
      if (!nextSection) return;

      if (nextSection.objectKey) {
        setActiveObject(nextSection.objectKey);
      } else {
        reset();
      }
    };

    const onScroll = () => {
      if (rafRef.current !== null) return;
      rafRef.current = window.requestAnimationFrame(updateActiveSection);
    };

    container.addEventListener("scroll", onScroll, { passive: true });
    updateActiveSection();

    return () => {
      container.removeEventListener("scroll", onScroll);
      if (rafRef.current !== null) {
        window.cancelAnimationFrame(rafRef.current);
      }
    };
  }, [reset, setActiveObject]);

  // Forward wheel events to the scroll container only when pointer is over the panel.
  // This avoids hijacking Three.js CameraControls dolly/zoom on the canvas.
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const onWheel = (event: WheelEvent) => {
      if (!pointerInPanel.current) return;
      container.scrollBy({ top: event.deltaY, behavior: "auto" });
    };

    window.addEventListener("wheel", onWheel, { passive: true });

    return () => {
      window.removeEventListener("wheel", onWheel);
    };
  }, []);

  useEffect(() => {
    const nextSectionId = activeObject ? sectionByObject[activeObject] : "intro";
    if (!nextSectionId || nextSectionId === currentSectionRef.current) return;

    currentSectionRef.current = nextSectionId;
    sectionRefs.current[nextSectionId]?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [activeObject, sectionByObject]);

  return (
    <div className="pointer-events-none fixed inset-0 z-10">
      <div
        ref={containerRef}
        onPointerEnter={() => { pointerInPanel.current = true; }}
        onPointerLeave={() => { pointerInPanel.current = false; }}
        className="pointer-events-auto h-dvh overflow-y-auto overscroll-y-contain md:w-[min(42rem,48vw)]"
      >
        <div className="absolute inset-y-0 left-0 w-full bg-gradient-to-r from-black via-black/80 to-transparent md:w-[min(44rem,55vw)]" />
        <div className="relative snap-y snap-mandatory">
          {sections.map((section) => {
            const isActive = activeObject === section.objectKey;
            const isOverview = !activeObject && section.objectKey === null;

            return (
              <section
                key={section.id}
                ref={(node) => {
                  sectionRefs.current[section.id] = node;
                }}
                className="snap-start flex min-h-screen items-center px-6 py-24 md:px-8 lg:px-10"
              >
                <article
                  className="w-full max-w-xl rounded-[2rem] border p-6 backdrop-blur-xl transition-colors md:p-8"
                  style={{
                    borderColor: `${section.accentColor}${isActive || isOverview ? "66" : "22"}`,
                    backgroundColor:
                      isActive || isOverview ? "rgba(5, 7, 10, 0.78)" : "rgba(5, 7, 10, 0.58)",
                    boxShadow:
                      isActive || isOverview
                        ? `0 20px 80px ${section.accentColor}22`
                        : "0 20px 80px rgba(0, 0, 0, 0.18)",
                  }}
                >
                  <p
                    className="mb-3 text-xs font-semibold tracking-[0.28em] uppercase"
                    style={{ color: section.accentColor }}
                  >
                    {section.eyebrow}
                  </p>
                  <div className="mb-6 space-y-3">
                    <h2 className="max-w-lg text-3xl font-semibold tracking-tight text-white md:text-4xl">
                      {section.title}
                    </h2>
                    <p className="text-sm font-medium tracking-[0.22em] text-white/45 uppercase">
                      {section.label}
                    </p>
                  </div>
                  {section.render()}
                </article>
              </section>
            );
          })}
        </div>
      </div>
    </div>
  );
}
