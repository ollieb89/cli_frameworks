# Plan: MCP Core Integration (Host/Client First)

## Objective
Implement a robust Model Context Protocol (MCP) Host implementation for Gemini CLI, enabling it to connect to external MCP servers (filesystem, git, postgres, etc.) and expose their tools to the internal agent router. This serves as the foundation for the "Framework Abstraction Layer" tool plane.

## Phase 1: Foundation & Core Packages [checkpoint: b0c1741]
**Goal:** Establish the `packages/mcp` package and core infrastructure.
- [x] **Task 1:** Initialize `packages/mcp` workspace package with `@modelcontextprotocol/sdk`. [0013c9a]
- [x] **Task 2:** Implement `McpManager` (Singleton) in `packages/mcp`. [e78b953]
    -   Support `stdio` transport.
    -   Handle connection lifecycle (connect, disconnect, health).
- [x] **Task 3:** Implement `ToolNormalizer`. [ab193d2]
    -   Convert MCP Tool schemas to internal `Tool` interface.
    -   Enforce Zod schema validation.
- [x] **Task 4:** Implement `PolicyGate`. [edbc8d4]
    -   Define `Policy` interface (allowlist, confirmation rules).
    -   Implement permission check logic.

## Phase 2: Configuration & Discovery [checkpoint: 551f191]
**Goal:** Allow users to configure MCP servers via standard config files.
- [x] **Task 1:** Define `McpConfig` schema (`servers`, `globalPolicy`). [1eede4b]
- [x] **Task 2:** Update `ConfigManager` (in `packages/cli`) to load `mcp.json` hierarchically: [44e1fbe]
    -   Global: `~/.gemini-cli/mcp.json`
    -   Project: `./.gemini/mcp.json`
- [x] **Task 3:** Integrate `McpManager` with `ConfigManager` to auto-load servers on startup. [dfeb6d3]

## Phase 3: CLI Commands (/mcp Namespace) [checkpoint: e276ccf]
**Goal:** Provide user-facing management of the MCP subsystem.
- [x] **Task 1:** Create `packages/cli/src/commands/mcp/` directory. [6411629]
- [x] **Task 2:** Implement `/mcp:doctor` (Health check, SDK version, Node path). [ed92bc5]
- [x] **Task 3:** Implement `/mcp:list` (Show connected servers, status, tool count). [c7fb424]
- [x] **Task 4:** Implement `/mcp:inspect <server>` (JSON dump of tools/resources/prompts). [c96f90b]
- [x] **Task 5:** Implement `/mcp:add` (Interactive Ink wizard to append to config). [56f60ab]

## Phase 4: Integration & Security UX [checkpoint: 0bb3d6e]
**Goal:** Connect the tools to the Agent and provide a secure UI.
- [x] **Task 1:** Create `McpToolAdapter` to bridge `McpManager` tools to the existing `CommandRegistry` or `Agent` tool list. [18f44c2]
- [x] **Task 2:** Implement Ink `ToolApproval` component. [493008a]
    -   Show tool name, server, params.
    -   Options: "Allow Once", "Always Allow", "Deny".
- [x] **Task 3:** Wire `PolicyGate` into the tool execution flow (pre-execution hook). [42c95f0]

## Phase 5: Verification
- [x] **Task 1:** Verify connection to a standard MCP server (e.g., `sqlite` or `filesystem`). [c13c47e]
- [ ] **Task 2:** Verify tool execution and output handling.
- [ ] **Task 3:** Verify security gates and configuration loading.
