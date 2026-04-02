# Interactive 3D Resume

An interactive 3D portfolio website presenting Vasilis Roumeliotis's resume as a desk scene. A MacBook sits at the center surrounded by miniature objects — a toy train, medicine bottle, robot figurine, boxing gloves, and more — each representing a career chapter.

Click an object to trigger a cinematic camera fly-in, a playful animation, and a content panel revealing the full story.

## Quick Start

```bash
bun install
bun dev
```

Open [http://localhost:5173](http://localhost:5173).

## Stack

- **Rendering** — React Three Fiber + drei + postprocessing
- **Animation** — maath/easing (damping, not tweening) for all camera and object motion
- **State** — Zustand (single store, `getState()` in render loops)
- **Overlays** — Framer Motion panels outside the Canvas
- **Styling** — Tailwind CSS v4
- **Build** — Vite + TypeScript + React 19

## Project Structure

```
src/
  components/
    canvas/            # 3D scene (lighting, atmosphere, post-processing)
      objects/         # Individual desk objects (Train, Robot, Globe, etc.)
    overlay/           # DOM panels, navigation, loading screen
      panels/          # Resume content panels
  data/                # Resume data + scene config (positions, cameras, colors)
  hooks/               # useCameraTransition, useInteraction, useResponsive
  store/               # Zustand app store
public/
  models/              # GLB model files (when sourced)
  fonts/               # Typeface files
```

## How It Works

1. **Scene config** (`src/data/scene-config.ts`) maps object keys to positions, camera angles, and accent colors
2. **InteractiveObject** wrapper applies hover scale, opacity dimming, and click handling via `useInteraction` hook
3. **Camera transitions** use drei `CameraControls` with programmatic `setLookAt()` — damping handles mid-flight retargeting
4. **Content panels** slide in as DOM overlays (Framer Motion) — side panel on desktop, bottom sheet on mobile
5. **Performance tiers** adapt automatically via `PerformanceMonitor` — low-end devices skip bloom and depth-of-field

## Adding a New Career Object

1. Add an entry to `sceneObjects` in `src/data/scene-config.ts`
2. Add the resume data to `src/data/resume.ts`
3. Create the object component in `src/components/canvas/objects/`
4. Register it in the `objectComponents` map in `DeskScene.tsx`
5. Add a panel entry in `ContentPanel.tsx`

## Testing

```bash
bun run test
```

19 tests covering store transitions, resume data completeness, and scene-config key consistency.

## Deployment

Configured for Vercel with SPA rewrites and model caching headers. See `vercel.json`.

```bash
vercel deploy
```

## License

MIT
