# 3D Resume Website

## Commands
- `bun dev` — start dev server
- `bun run build` — production build
- `bun run preview` — preview production build

## Stack
- Vite + React 19 + TypeScript
- React Three Fiber + drei + postprocessing
- maath/easing for animations (damping, not tweening)
- Zustand for state (getState() in useFrame, no React subscriptions in render loop)
- Framer Motion for DOM overlay animations
- Tailwind CSS v4

## Conventions
- Path alias: `@/` maps to `src/`
- 3D components in `src/components/canvas/`
- DOM overlays in `src/components/overlay/`
- Object components in `src/components/canvas/objects/`
- Scene config and resume data in `src/data/`
- Zustand store in `src/store/`
- Models in `public/models/` (GLB format)
- Use `easing.damp` / `easing.damp3` from maath in useFrame — never snap values
- `toneMapped={false}` on emissive materials for bloom pickup
- Read Zustand with `getState()` inside useFrame, not subscriptions
