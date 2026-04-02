# 3D Resume Website

## User Preferences
- Shell: fish
- JS/TS runtime: bun (use for all `.js`, `.ts`, `.tsx` files)
- Python: uv (use for all `.py` files)
- Check today's date before any web research or documentation lookup
- Never edit `.xlsx` files

## Commands
- `bun dev` — start dev server
- `bun run build` — production build
- `bun run preview` — preview production build
- `bun run test` — run vitest (19 tests)
- `bun run test:watch` — vitest watch mode

## Stack
- Vite + React 19 + TypeScript
- React Three Fiber + drei
- maath/easing for animations (damping, not tweening)
- Zustand for state (getState() in useFrame, no React subscriptions in render loop)
- Tailwind CSS v4

## Critical Rules

- **Never snap values in useFrame.** All motion uses `easing.damp` / `easing.damp3` / `easing.dampE` from maath. Direct assignment (e.g. `position.x = target`) breaks the damping feel.
- **Never use React subscriptions inside useFrame.** Read Zustand with `useAppStore.getState()` in animation loops. React subscriptions cause re-renders that kill frame rate.
- **All emissive materials must set `toneMapped={false}`.** Without this, bloom post-processing can't pick up the glow.
- **Scene-config is the single source of truth for object positions.** Object components must not hardcode their own position — it comes from `InteractiveObject` via `scene-config.ts`.

## Conventions
- Path alias: `@/` maps to `src/`
- 3D components in `src/components/canvas/`
- DOM overlays in `src/components/overlay/`
- Object components in `src/components/canvas/objects/`
- Scene config and resume data in `src/data/`
- Zustand store in `src/store/`
- Models in `public/models/` (GLB format)

## Architecture

### Interaction Flow
```
Click object → Zustand setActiveObject(key)
  → CameraControls.setLookAt() (damped transition)
  → InteractiveObject dims non-active objects (opacity damp)
  → Object plays its select animation (useFrame)
  → ScrollStory scrolls to matching section
```

### Key Files
- `src/data/scene-config.ts` — Object positions, camera angles, accent colors. Edit here to reposition objects.
- `src/data/resume.ts` — All resume content. Panels read from this, not hardcoded text.
- `src/components/canvas/InteractiveObject.tsx` — Wraps every clickable object. Provides hover, click, scale, and opacity behavior via `useInteraction` hook.
- `src/components/canvas/DeskScene.tsx` — Composes the desk, all objects, and mouse parallax.
- `src/store/useAppStore.ts` — Single Zustand store: activeObject, hoveredObject, transitions, loading, performance tier.
- `src/components/overlay/ScrollStory.tsx` — Scroll-driven story rail. Syncs scroll position with activeObject.

### Adding Objects
When adding a new interactive object, 5 files must stay in sync:
1. `scene-config.ts` — position, camera, color
2. `resume.ts` — content data
3. `objects/NewObject.tsx` — 3D component
4. `DeskScene.tsx` — register in `objectComponents` map
5. `ScrollStory.tsx` — add entry to `sections` array

Tests in `scene-config.test.ts` validate that all keys in `sceneObjects` have matching data.
