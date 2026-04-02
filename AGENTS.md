# AGENTS.md

## Critical Rules

- **Never snap values in useFrame.** All motion uses `easing.damp` / `easing.damp3` / `easing.dampE` from maath. Direct assignment (e.g. `position.x = target`) breaks the damping feel.
- **Never use React subscriptions inside useFrame.** Read Zustand with `useAppStore.getState()` in animation loops. React subscriptions cause re-renders that kill frame rate.
- **All emissive materials must set `toneMapped={false}`.** Without this, bloom post-processing can't pick up the glow.
- **Scene-config is the single source of truth for object positions.** Object components must not hardcode their own position — it comes from `InteractiveObject` via `scene-config.ts`.

## Architecture

### Interaction Flow
```
Click object → Zustand setActiveObject(key)
  → CameraControls.setLookAt() (damped transition)
  → InteractiveObject dims non-active objects (opacity damp)
  → Object plays its select animation (useFrame)
  → ContentPanel slides in (Framer Motion)
```

### Key Files
- `src/data/scene-config.ts` — Object positions, camera angles, accent colors. Edit here to reposition objects.
- `src/data/resume.ts` — All resume content. Panels read from this, not hardcoded text.
- `src/components/canvas/InteractiveObject.tsx` — Wraps every clickable object. Provides hover, click, scale, and opacity behavior via `useInteraction` hook.
- `src/components/canvas/DeskScene.tsx` — Composes the desk, all objects, and mouse parallax.
- `src/store/useAppStore.ts` — Single Zustand store: activeObject, transitions, loading, performance tier.

### Adding Objects
When adding a new interactive object, 5 files must stay in sync:
1. `scene-config.ts` — position, camera, color
2. `resume.ts` — content data
3. `objects/NewObject.tsx` — 3D component
4. `DeskScene.tsx` — register in `objectComponents` map
5. `ContentPanel.tsx` — register in `panelMap`

Tests in `scene-config.test.ts` validate that all keys in `sceneObjects` have matching data.

## Testing
```bash
bun run test          # vitest run (19 tests)
bun run test:watch    # vitest watch mode
```

Tests cover store state transitions, resume data completeness, and scene-config/panel key consistency. No Three.js mocking needed — tests target data layer and store only.
