import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { easing } from "maath";
import type { Group } from "three";
import { useAppStore } from "@/store/useAppStore";
import { sceneObjects, coffeePosition } from "@/data/scene-config";
import InteractiveObject from "./InteractiveObject";
import Desk from "./objects/Desk";
import MacBook from "./objects/MacBook";
import Train from "./objects/Train";
import MedicineBottle from "./objects/MedicineBottle";
import Robot from "./objects/Robot";
import WrenchTablet from "./objects/WrenchTablet";
import BoxingGloves from "./objects/BoxingGloves";
import Globe from "./objects/Globe";
import CoffeeMug from "./objects/CoffeeMug";

const objectComponents: Record<string, React.ComponentType> = {
  macbook: MacBook,
  train: Train,
  medicine: MedicineBottle,
  robot: Robot,
  wrench: WrenchTablet,
  boxing: BoxingGloves,
  globe: Globe,
};

export default function DeskScene() {
  const sceneGroup = useRef<Group>(null);

  // Mouse-follow parallax — subtle tilt toward cursor
  useFrame((state, delta) => {
    if (!sceneGroup.current) return;
    const { activeObject } = useAppStore.getState();
    if (activeObject) return;

    const targetX = state.pointer.y * 0.02;
    const targetY = state.pointer.x * 0.02;
    easing.dampE(sceneGroup.current.rotation, [targetX, targetY, 0], 0.3, delta);
  });

  return (
    <group ref={sceneGroup}>
      <Desk />
      {Object.entries(sceneObjects).map(([key, config]) => {
        const Component = objectComponents[key];
        if (!Component) return null;
        return (
          <InteractiveObject key={key} objectKey={key} position={config.position}>
            <Component />
          </InteractiveObject>
        );
      })}
      <CoffeeMug position={coffeePosition} />
    </group>
  );
}
