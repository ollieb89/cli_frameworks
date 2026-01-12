# Track Specification: Command Namespace Registry & Global Commands

## Overview
This track implements the robust `CommandRegistry` for the Gemini CLI, enabling dynamic discovery and registration of commands from the file system. It also establishes the core "Global" namespace with essential utility commands (`/help`, `/version`, `/config`), providing users with tools to navigate and configure the suite.

## Functional Requirements

### 1. Dynamic Command Registry
- **Discovery:** The registry must scan `packages/cli/src/commands` (and potentially other configured paths) to automatically load command modules.
- **Registration:** Commands must export a standardized interface (metadata + handler) to be registered.
- **Namespace Organization:** Commands must be grouped by namespace (e.g., `global`, `dev`, `chat`).
- **Aliasing:** Support aliases for commands (e.g., `/h` for `/help`).

### 2. Global Commands
- **`/version`:** Displays the current version of the CLI suite and the active FAL provider version.
- **`/config`:**
  - `list`: Shows current configuration.
  - `set <key> <value>`: Updates a configuration value.
  - `get <key>`: Retrieves a specific value.
- **`/help`:**
  - **Default View:** Displays a **Rich Table** of all available commands, grouped by namespace, with descriptions.
  - **Interactive Mode:** When invoked with a flag (e.g., `--interactive` or just `/help -i`), launches an **Interactive Search** UI (using Ink) to filter commands.

### 3. Architecture
- **Module:** `packages/cli/src/registry/*`
- **Pattern:** Singleton Registry or Dependency Injection token.
- **Metadata Interface:**
  ```typescript
  interface CommandDefinition {
    namespace: string;
    name: string;
    description: string;
    args?: CommandArgument[];
    handler: (args: any) => Promise<void>;
  }
  ```

## Non-Functional Requirements
- **Performance:** Command discovery should not noticeably delay CLI startup (consider caching if necessary).
- **Error Handling:** Gracefully handle malformed command modules during discovery without crashing the entire CLI.
- **UX:** The `/help` table must be responsive to terminal width.

## Acceptance Criteria
- [ ] `CommandRegistry` successfully scans and loads commands from the filesystem.
- [ ] `/version` returns correct package version.
- [ ] `/config` commands persist changes (mocked or file-based).
- [ ] `/help` renders a formatted table of all registered commands.
- [ ] `/help -i` opens a searchable, interactive list.
