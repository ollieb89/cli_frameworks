# Implementation Plan: Agent Orchestration System & Core Agents

## Phase 1: Foundation & Agent Registry [checkpoint: 750603a]
Goal: Implement the core infrastructure to discover, load, and register agents from the filesystem.

- [x] Task: Define Agent Definition Schemas (Zod) for Personas, Skills, and Commands.
- [x] Task: Implement `AgentRegistry` in `packages/core` to scan `agents/` directory.
- [x] Task: Create `AgentLoader` to parse Markdown-based agent definitions.
- [x] Task: Write unit tests for registry and loader (TDD Red Phase).
- [x] Task: Implement registry and loader logic (TDD Green Phase).
- [x] Task: Conductor - User Manual Verification 'Phase 1: Foundation & Agent Registry' (Protocol in workflow.md) b8d1e2f

## Phase 2: Agent Execution Engine & Tool Mapping [checkpoint: f44b005]
Goal: Build the engine that manages agent state, handles prompts, and maps skills to executable tools.

- [x] Task: Implement `AgentExecutor` to handle the execution loop and prompt construction. 750603a
- [x] Task: Create `SkillMapper` to link agent `SKILL.md` definitions to MCP tools. 750603a
- [x] Task: Implement Skill-to-Tool resolution logic with validation. 750603a
- [x] Task: Write unit tests for executor and skill mapping (TDD Red Phase). 750603a
- [x] Task: Implement executor and skill mapping logic (TDD Green Phase). 750603a
- [x] Task: Conductor - User Manual Verification 'Phase 2: Agent Execution Engine & Tool Mapping' (Protocol in workflow.md) f44b005

## Phase 3: Core Agent Integration
Goal: Load and configure the three core agents with their specific personas and initial skill sets.

- [ ] Task: Configure `context-manager` with file aggregation and memory skills.
- [ ] Task: Configure `backend-architect` with API design and architecture patterns skills.
- [ ] Task: Configure `docs-architect` with documentation generation skills.
- [ ] Task: Implement basic internal tools for file summarization and memory access.
- [ ] Task: Write verification tests for each core agent's persona loading.
- [ ] Task: Conductor - User Manual Verification 'Phase 3: Core Agent Integration' (Protocol in workflow.md)

## Phase 4: Interface Integration (CLI & TUI)
Goal: Expose the agent system through the command line and the interactive "Glass Cockpit" TUI.

- [ ] Task: Implement `omnicode agent list` and `omnicode agent run` commands.
- [ ] Task: Integrate agent selection/mentions (@agent) into the TUI Chat pane.
- [ ] Task: Update `tuiStore` to handle agent-specific state and streaming responses.
- [ ] Task: Write integration tests for CLI commands and TUI store updates.
- [ ] Task: Implement CLI/TUI integration logic.
- [ ] Task: Conductor - User Manual Verification 'Phase 4: Interface Integration (CLI & TUI)' (Protocol in workflow.md)

## Phase 5: Validation & Final Verification
Goal: Ensure the entire system works end-to-end and meets the acceptance criteria.

- [ ] Task: Create a comprehensive validation script for agent skill execution.
- [ ] Task: Perform end-to-end manual testing of all 3 agents in the TUI.
- [ ] Task: Verify code coverage for new agent modules is >80%.
- [ ] Task: Conductor - User Manual Verification 'Phase 5: Validation & Final Verification' (Protocol in workflow.md)
