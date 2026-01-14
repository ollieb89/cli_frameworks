# Specification: Agent Orchestration System & Core Agents

## Overview
Implement the "Agent" capability within OmniCode, allowing the CLI to load, manage, and execute specialized AI agents defined by Markdown personas, commands, and skills. This track focuses on building the orchestration engine and integrating the first three core agents: `context-manager`, `backend-architect`, and `docs-architect`.

## Goals
- Build a robust agent execution engine in `packages/core`.
- Provide a hybrid interaction model (CLI commands + TUI chat integration).
- Integrate and validate the three provided agent personas and their associated skills/commands.

## Functional Requirements
### 1. Agent Orchestration Engine
- **Registry:** Dynamically discover and register agents from the `agents/` directory.
- **Execution:** Load agent instructions (system prompts), skills (tool sets), and commands (workflow templates).
- **Tool Integration:** Map agent skills (from `SKILL.md` files) to executable MCP tools or internal functions.

### 2. Core Agent Implementation
- **Context Manager (`context-manager.md`):**
  - Ability to aggregate files, summarize context, and interface with `.serena/memories`.
- **Backend Architect (`backend-architect.md`):**
  - Specialized in scalable API design (REST/GraphQL/gRPC), microservices, and resilience patterns.
- **Docs Architect (`docs-architect.md`):**
  - Capable of generating API documentation, Architecture Decision Records (ADRs), and User Guides.

### 3. Interaction Interface
- **CLI:** Command-based execution (e.g., `omnicode agent run [agent-id] --task "..."`).
- **TUI:** Integration into the Glass Cockpit Chat pane (e.g., via `@agent` mentions).
- **Validation:** Implement a verification suite to ensure agents can successfully use their assigned skills.

## Non-Functional Requirements
- **Performance:** Agent loading and tool resolution should add minimal latency to the chat stream.
- **Extensibility:** The system must allow users to add new agents by simply creating a new Markdown file in the `agents/` directory.

## Acceptance Criteria
- [ ] Users can list available agents via `omnicode agent list`.
- [ ] Agents can be invoked in the TUI chat using `@mentions`.
- [ ] `context-manager` can successfully retrieve and summarize project files.
- [ ] `backend-architect` can provide design recommendations based on its specific persona.
- [ ] `docs-architect` can generate a sample documentation file based on a project segment.
- [ ] Automated validation scripts confirm that agent skills are correctly mapped to tools.

## Out of Scope
- Implementation of the `temporal-python-pro` agent (listed in folder but not requested).
- Multi-agent collaboration (agents talking to other agents) - focused on Single Agent + User interaction for now.
