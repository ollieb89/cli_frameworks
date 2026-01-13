# Definition of Done

Before considering a task complete:
1. **Build Success:** `pnpm build` must pass for the affected packages (and ideally the root).
2. **Tests Pass:** `pnpm test` must pass (Vitest).
3. **Linting:** `pnpm lint` must pass (ESLint).
4. **Dist:** Output `dist` folders must be generated if compilation logic was changed.
