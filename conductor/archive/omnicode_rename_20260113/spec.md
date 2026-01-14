# Track Specification: Rename Project to OmniCode

## Overview
Rebrand the "Gemini CLI" suite to "OmniCode" (alias `oc`) to establish an independent tool identity. This is a comprehensive breaking change that removes all references to the original name across binaries, packages, configurations, and environment variables.

## Functional Requirements
1.  **CLI Executable:** 
    - Rename binary from `gemini` to `omnicode`.
    - Provide `oc` as the primary alias/shortcut.
2.  **Monorepo Packages:**
    - Update all `@gemini-cli/*` package scopes to `@omnicode/*` in `package.json` files.
    - Update cross-package dependency references.
3.  **Persistence & Config:**
    - Change local configuration directory from `~/.gemini/` to `~/.omnicode/`.
    - Update logic for path resolution to point to the new directory.
4.  **Environment Variables:**
    - Rename all environment variables prefixed with `GEMINI_CLI_` (e.g., `GEMINI_CLI_API_KEY`) to `OMNICODE_` (e.g., `OMNICODE_API_KEY`).
5.  **User Interface:**
    - Update all text references in TUI components, logs, and help menus to "OmniCode".
6.  **Infrastructure:**
    - Update `pnpm-workspace.yaml`, `turbo.json`, and `tsconfig.json` as necessary.
    - Update git remote origins if applicable/requested.

## Non-Functional Requirements
- **Identity Purge:** Zero occurrences of "Gemini CLI" in source code strings or metadata.
- **Consistency:** Ensure `oc` and `omnicode` are interchangeable in the CLI entry points.

## Acceptance Criteria
- [ ] `oc --version` returns OmniCode version information.
- [ ] Config files are successfully saved/read from `~/.omnicode/`.
- [ ] Application fails to start if `GEMINI_CLI_` variables are used without `OMNICODE_` counterparts (enforcing the rename).
- [ ] All package imports (e.g., `import { ... } from '@omnicode/shared'`) resolve correctly.

## Out of Scope
- Backward compatibility for old config files or environment variables.
