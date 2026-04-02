import { describe, it, expect } from "vitest";
import {
  contact,
  summary,
  techSkills,
  workExperience,
  sideProjects,
  education,
  languages,
} from "./resume";

describe("resume data completeness", () => {
  it("contact has all required fields", () => {
    expect(contact.email).toBeTruthy();
    expect(contact.linkedin).toBeTruthy();
    expect(contact.github).toBeTruthy();
    expect(contact.location).toBeTruthy();
  });

  it("summary is non-empty", () => {
    expect(summary.length).toBeGreaterThan(0);
  });

  it("techSkills has all categories with entries", () => {
    for (const [category, skills] of Object.entries(techSkills)) {
      expect(skills.length, `techSkills.${category} should not be empty`).toBeGreaterThan(0);
    }
  });

  it("workExperience has all required sections", () => {
    const required = ["logistics", "pharma", "ai", "enterprise"];
    for (const section of required) {
      expect(workExperience[section], `workExperience.${section} missing`).toBeDefined();
      expect(workExperience[section].length).toBeGreaterThan(0);
    }
  });

  it("every work entry has company, role, period, and bullets", () => {
    for (const [section, entries] of Object.entries(workExperience)) {
      for (const entry of entries) {
        expect(entry.company, `${section} entry missing company`).toBeTruthy();
        expect(entry.role, `${section} entry missing role`).toBeTruthy();
        expect(entry.period, `${section} entry missing period`).toBeTruthy();
        expect(entry.bullets.length, `${section} entry has no bullets`).toBeGreaterThan(0);
      }
    }
  });

  it("sideProjects is non-empty with valid entries", () => {
    expect(sideProjects.length).toBeGreaterThan(0);
    for (const project of sideProjects) {
      expect(project.name).toBeTruthy();
      expect(project.description).toBeTruthy();
      expect(project.bullets.length).toBeGreaterThan(0);
    }
  });

  it("education is non-empty with valid entries", () => {
    expect(education.length).toBeGreaterThan(0);
    for (const entry of education) {
      expect(entry.institution).toBeTruthy();
      expect(entry.degree).toBeTruthy();
      expect(entry.period).toBeTruthy();
    }
  });

  it("languages is non-empty", () => {
    expect(languages.length).toBeGreaterThan(0);
    for (const lang of languages) {
      expect(lang.language).toBeTruthy();
      expect(lang.level).toBeTruthy();
    }
  });
});
