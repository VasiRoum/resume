import { describe, it, expect } from "vitest";
import { sceneObjects, overviewCamera } from "./scene-config";
import { workExperience, sideProjects, education } from "./resume";

describe("scene-config consistency", () => {
  it("all sceneObjects have required fields", () => {
    for (const [key, config] of Object.entries(sceneObjects)) {
      expect(config.key, `${key} missing key`).toBe(key);
      expect(config.label, `${key} missing label`).toBeTruthy();
      expect(config.position, `${key} missing position`).toHaveLength(3);
      expect(config.cameraPosition, `${key} missing cameraPosition`).toHaveLength(3);
      expect(config.cameraTarget, `${key} missing cameraTarget`).toHaveLength(3);
      expect(config.accentColor, `${key} missing accentColor`).toMatch(/^#/);
      expect(config.section, `${key} missing section`).toBeTruthy();
    }
  });

  it("overviewCamera has valid positions", () => {
    expect(overviewCamera.position).toHaveLength(3);
    expect(overviewCamera.target).toHaveLength(3);
  });

  it("all section values map to real resume data", () => {
    const validSections: Record<string, boolean> = {
      summary: true,
      logistics: "logistics" in workExperience,
      pharma: "pharma" in workExperience,
      ai: "ai" in workExperience,
      enterprise: "enterprise" in workExperience,
      sideProjects: sideProjects.length > 0,
      education: education.length > 0,
    };

    for (const [key, config] of Object.entries(sceneObjects)) {
      expect(
        validSections[config.section],
        `${key}.section "${config.section}" has no resume data`,
      ).toBe(true);
    }
  });

  it("expected object keys are present", () => {
    const expected = ["macbook", "train", "medicine", "robot", "wrench", "boxing", "globe"];
    for (const key of expected) {
      expect(sceneObjects[key], `sceneObjects missing "${key}"`).toBeDefined();
    }
  });
});
