# Implementation Plan: Rename Project to OmniCode

## Phase 1: Monorepo & Package Identity Renaming [checkpoint: 7d19f5e]
- [x] Task: Rename NPM package scopes from `@gemini-cli/*` to `@omnicode/*` in all `package.json` files. eb23805
- [x] Task: Update `pnpm-workspace.yaml` and `pnpm-lock.yaml` to reflect the new package names. 116e411
- [x] Task: Update all internal import statements across the monorepo to use the new `@omnicode/` scope. abd0c2a
- [x] Task: Conductor - User Manual Verification 'Monorepo & Package Identity Renaming' (Protocol in workflow.md) 7d19f5e

## Phase 2: Configuration & Environment Infrastructure [checkpoint: 916712a]
- [x] Task: Write failing test for configuration path resolution (verifying `~/.omnicode` vs `~/.gemini`). 9000162
- [x] Task: Update `ConfigManager` and path utility constants to use `.omnicode` as the root directory. a687ea3
- [x] Task: Write failing test for environment variable loading (verifying `OMNICODE_` prefix requirement). ad2bcae
- [x] Task: Update environment variable parsing logic to use `OMNICODE_` prefix and remove `GEMINI_CLI_` support. f68a8cf
- [x] Task: Conductor - User Manual Verification 'Configuration & Environment Infrastructure' (Protocol in workflow.md) 916712a

## Phase 3: CLI Entry Points & Binary Configuration
- [x] Task: Update `bin` field in `packages/cli/package.json` to map `oc` and `omnicode` to the entry point. d38e80a
- [x] Task: Update the CLI help text and version command logic to display "OmniCode". 640ae2a
- [x] Task: Update any hardcoded command strings in the `CommandRegistry` or parser. 8b8f493
- [ ] Task: Conductor - User Manual Verification 'CLI Entry Points & Binary Configuration' (Protocol in workflow.md)

## Phase 4: UI Components & Documentation Purge [checkpoint: baad229]
- [x] Task: Perform a systematic search and replace of "Gemini CLI" with "OmniCode" in all React/Ink UI components. cccb682
- [x] Task: Update internal documentation (e.g., `GEMINI.md` to `OMNICODE.md` if necessary, and references within). 9fc5364
- [x] Task: Update repository README and setup guides. 865aed0
- [x] Task: Conductor - User Manual Verification 'UI Components & Documentation Purge' (Protocol in workflow.md) baad229

## Phase 5: Final Validation & Sanity Check
- [ ] Task: Execute full monorepo build and test suite to ensure no broken references remain.
- [ ] Task: Verify that `oc` command works locally after rebuilding.
- [ ] Task: Conductor - User Manual Verification 'Final Validation & Sanity Check' (Protocol in workflow.md)
