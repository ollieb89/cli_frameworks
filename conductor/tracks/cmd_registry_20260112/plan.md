# Execution Plan: Command Namespace Registry & Global Commands

## Phase 1: Registry Foundation & Discovery [checkpoint: 8915862]

- [x] Task: Define Command Interfaces 9840112
  - [x] Subtask: Write Tests (Define `CommandDefinition` and `Registry` types)
  - [x] Subtask: Implement Feature (Create `packages/cli/src/registry/types.ts`)
- [x] Task: Implement Dynamic Discovery Logic 4845fed
  - [x] Subtask: Write Tests (Mock file system to verify glob-based loading)
  - [x] Subtask: Implement Feature (Use `glob` and dynamic imports to scan `src/commands`)
- [x] Task: Create `CommandRegistry` Singleton fe84ed5
  - [x] Subtask: Write Tests (Register, retrieve, and list commands)
  - [x] Subtask: Implement Feature (Core registry logic in `packages/cli/src/registry/CommandRegistry.ts`)
- [x] Task: Conductor - User Manual Verification 'Registry Foundation & Discovery' 8915862

## Phase 2: Global Commands Implementation

- [ ] Task: Implement `/version` Command
  - [ ] Subtask: Write Tests (Verify output contains shared version info)
  - [ ] Subtask: Implement Feature (Standard command export in `src/commands/global/version.ts`)
- [ ] Task: Implement `/config` Command (Basic)
  - [ ] Subtask: Write Tests (Verify get/set logic)
  - [ ] Subtask: Implement Feature (Store config in `packages/cli/src/config/ConfigManager.ts` and expose via command)
- [ ] Task: Conductor - User Manual Verification 'Global Commands Implementation' (Protocol in workflow.md)

## Phase 3: Help System & Interactive UI

- [ ] Task: Implement `/help` Rich Table
  - [ ] Subtask: Write Tests (Verify table rendering logic)
  - [ ] Subtask: Implement Feature (Use `cli-table3` or `ink-table` for the static view)
- [ ] Task: Implement `/help` Interactive Search
  - [ ] Subtask: Write Tests (Verify filtering logic in Ink component)
  - [ ] Subtask: Implement Feature (Create `HelpSearch` Ink component in `packages/cli/src/ui/HelpSearch.tsx`)
- [ ] Task: Integrate Registry with REPL
  - [ ] Subtask: Write Tests (Verify `/help` triggers registry lookup)
  - [ ] Subtask: Implement Feature (Update `App.tsx` to use the dynamic registry instead of hardcoded checks)
- [ ] Task: Conductor - User Manual Verification 'Help System & Interactive UI' (Protocol in workflow.md)
