import type { Vector3Tuple } from "three";

export interface ObjectConfig {
  key: string;
  label: string;
  position: Vector3Tuple;
  rotation?: Vector3Tuple;
  scale?: number;
  cameraPosition: Vector3Tuple;
  cameraTarget: Vector3Tuple;
  accentColor: string;
  section: string;
}

export const overviewCamera = {
  position: [5, 4, 5] as Vector3Tuple,
  target: [0, 0.5, 0] as Vector3Tuple,
};

export const sceneObjects: Record<string, ObjectConfig> = {
  macbook: {
    key: "macbook",
    label: "About Me",
    position: [0, 0.75, 0],
    scale: 1,
    cameraPosition: [0, 2.5, 3],
    cameraTarget: [0, 0.8, 0],
    accentColor: "#60a5fa",
    section: "summary",
  },
  train: {
    key: "train",
    label: "Rail Logistics",
    position: [-2, 0.75, 0.5],
    scale: 0.6,
    cameraPosition: [-2, 2, 2.5],
    cameraTarget: [-2, 0.8, 0.5],
    accentColor: "#f97316",
    section: "logistics",
  },
  medicine: {
    key: "medicine",
    label: "Pharma",
    position: [2, 0.75, 0.5],
    scale: 0.5,
    cameraPosition: [2, 2, 2.5],
    cameraTarget: [2, 0.8, 0.5],
    accentColor: "#22c55e",
    section: "pharma",
  },
  robot: {
    key: "robot",
    label: "AI & Agents",
    position: [-1.5, 0.75, -1.5],
    scale: 0.6,
    cameraPosition: [-1.5, 2.5, 0.5],
    cameraTarget: [-1.5, 0.8, -1.5],
    accentColor: "#a78bfa",
    section: "ai",
  },
  wrench: {
    key: "wrench",
    label: "Enterprise Apps",
    position: [1.5, 0.75, -1.5],
    scale: 0.5,
    cameraPosition: [1.5, 2.5, 0.5],
    cameraTarget: [1.5, 0.8, -1.5],
    accentColor: "#facc15",
    section: "enterprise",
  },
  boxing: {
    key: "boxing",
    label: "Side Projects",
    position: [-3, 0.75, -0.5],
    scale: 0.5,
    cameraPosition: [-3, 2, 1.5],
    cameraTarget: [-3, 0.8, -0.5],
    accentColor: "#ef4444",
    section: "sideProjects",
  },
  globe: {
    key: "globe",
    label: "Education",
    position: [3, 0.75, -0.5],
    scale: 0.5,
    cameraPosition: [3, 2, 1.5],
    cameraTarget: [3, 0.8, -0.5],
    accentColor: "#06b6d4",
    section: "education",
  },
};

export const coffeePosition: Vector3Tuple = [1.8, 0.75, 1.5];
