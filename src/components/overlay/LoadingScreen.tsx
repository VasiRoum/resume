import { useEffect, useRef, useState } from "react";
import { useAppStore } from "@/store/useAppStore";

interface Props {
  forceVisible?: boolean;
}

export default function LoadingScreen({ forceVisible = false }: Props) {
  const isLoaded = useAppStore((s) => s.isLoaded);
  const [visible, setVisible] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  const shouldShow = forceVisible || !isLoaded;

  useEffect(() => {
    if (shouldShow) {
      setVisible(true);
      return;
    }

    // Listen for the CSS transition to finish before unmounting
    const el = containerRef.current;
    if (!el) return;

    const onEnd = (e: TransitionEvent) => {
      if (e.propertyName === "opacity") setVisible(false);
    };
    el.addEventListener("transitionend", onEnd);
    return () => el.removeEventListener("transitionend", onEnd);
  }, [shouldShow]);

  if (!visible && !shouldShow) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-neutral-950"
      style={{
        opacity: shouldShow ? 1 : 0,
        pointerEvents: shouldShow ? "auto" : "none",
        transition: "opacity 0.8s ease-in-out",
      }}
    >
      <h1 className="animate-fade-in text-2xl font-bold tracking-tight text-white">
        Vasilis Roumeliotis
      </h1>
      <p className="animate-fade-in-delay mt-2 text-sm text-white/40">AI Software Engineer</p>
      <div className="animate-scale-in mt-6 h-px w-16 origin-left bg-white/20" />
    </div>
  );
}
