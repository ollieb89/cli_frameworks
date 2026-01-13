# Suggested Commands

## Development
- `pnpm install`: Install dependencies.
- `pnpm build`: Build all packages (Turbo pipeline).
- `pnpm test`: Run tests (Vitest).
- `pnpm lint`: Run ESLint.
- `pnpm run dev`: Start development mode (watch mode).

## CLI Execution
- Run local CLI from package:
  `cd packages/cli && pnpm start`

## Package Specific
- Each package in `packages/` has its own `build`, `test`, `lint` scripts callable via `pnpm run <script>` inside the directory.
