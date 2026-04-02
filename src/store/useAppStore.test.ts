import { describe, it, expect, beforeEach } from "vitest";
import { useAppStore } from "./useAppStore";

describe("useAppStore", () => {
  beforeEach(() => {
    useAppStore.setState({
      activeObject: null,
      isTransitioning: false,
      isLoaded: false,
      performanceTier: "high",
    });
  });

  it("initializes with correct defaults", () => {
    const state = useAppStore.getState();
    expect(state.activeObject).toBeNull();
    expect(state.isTransitioning).toBe(false);
    expect(state.isLoaded).toBe(false);
    expect(state.performanceTier).toBe("high");
  });

  it("setActiveObject sets key and marks transitioning", () => {
    useAppStore.getState().setActiveObject("train");
    const state = useAppStore.getState();
    expect(state.activeObject).toBe("train");
    expect(state.isTransitioning).toBe(true);
  });

  it("reset clears active object and marks transitioning", () => {
    useAppStore.getState().setActiveObject("robot");
    useAppStore.getState().reset();
    const state = useAppStore.getState();
    expect(state.activeObject).toBeNull();
    expect(state.isTransitioning).toBe(true);
  });

  it("setActiveObject to different object while one is active", () => {
    useAppStore.getState().setActiveObject("train");
    useAppStore.getState().setTransitioning(false);
    useAppStore.getState().setActiveObject("robot");
    const state = useAppStore.getState();
    expect(state.activeObject).toBe("robot");
    expect(state.isTransitioning).toBe(true);
  });

  it("setActiveObject to null clears the selection", () => {
    useAppStore.getState().setActiveObject("globe");
    useAppStore.getState().setActiveObject(null);
    expect(useAppStore.getState().activeObject).toBeNull();
  });

  it("setPerformanceTier changes the tier", () => {
    useAppStore.getState().setPerformanceTier("low");
    expect(useAppStore.getState().performanceTier).toBe("low");
    useAppStore.getState().setPerformanceTier("high");
    expect(useAppStore.getState().performanceTier).toBe("high");
  });

  it("setLoaded marks loading complete", () => {
    useAppStore.getState().setLoaded(true);
    expect(useAppStore.getState().isLoaded).toBe(true);
  });
});
