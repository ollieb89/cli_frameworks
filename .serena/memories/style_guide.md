# Style Guide & Conventions

**Language:** TypeScript (NodeNext module resolution).
**Linter:** ESLint (configuration in root `eslint.config.mjs`).
**Formatter:** Prettier (configuration in root `.prettierrc`).
**Frameworks:**
- **TUI:** Ink (React-based) for CLI UI.
- **Testing:** Vitest.
**Structure:**
- Monorepo using Turborepo.
- Code resides in `packages/<package-name>/src`.
- Output goes to `dist/`.
- Scoped packages `@gemini-cli/*`.
**Versioning:** `pnpm` workspace protocol `workspace:*`.
