import { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { easing } from "maath";
import type { Group, Material } from "three";
import { useAppStore } from "@/store/useAppStore";

const isTouchDevice = typeof window !== "undefined" && "ontouchstart" in window;

export function useInteraction(objectKey: string) {
  const groupRef = useRef<Group>(null);
  const hovered = useRef(false);
  const materialsRef = useRef<Material[]>([]);

  // Cache materials once after mount (avoids traverse every frame)
  useEffect(() => {
    if (!groupRef.current) return;
    const mats: Material[] = [];
    groupRef.current.traverse((child) => {
      const mesh = child as { material?: Material };
      if (mesh.material && "opacity" in mesh.material) {
        mats.push(mesh.material);
      }
    });
    materialsRef.current = mats;
  }, []);

  useFrame((_state, delta) => {
    if (!groupRef.current) return;
    const { activeObject } = useAppStore.getState();
    const isActive = activeObject === objectKey;
    const somethingActive = activeObject !== null;

    // Hover scale (desktop only)
    let targetScale = 1;
    if (isActive) {
      targetScale = 1;
    } else if (hovered.current && !isTouchDevice) {
      targetScale = 1.05;
    } else if (somethingActive) {
      targetScale = 0.95;
    }

    easing.damp3(
      groupRef.current.scale,
      [targetScale, targetScale, targetScale],
      isActive ? 0.4 : 0.15,
      delta,
    );

    // Dim non-active objects via cached materials
    const targetOpacity = somethingActive && !isActive ? 0.3 : 1;
    for (const mat of materialsRef.current) {
      const m = mat as Material & { opacity: number; transparent: boolean };
      m.transparent = true;
      easing.damp(m, "opacity", targetOpacity, 0.3, delta);
    }
  });

  const onPointerOver = () => {
    if (!isTouchDevice) {
      hovered.current = true;
      document.body.style.cursor = "pointer";
    }
  };

  const onPointerOut = () => {
    hovered.current = false;
    document.body.style.cursor = "auto";
  };

  const onClick = () => {
    useAppStore.getState().setActiveObject(objectKey);
  };

  return { groupRef, onPointerOver, onPointerOut, onClick };
}
