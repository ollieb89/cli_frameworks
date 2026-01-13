# Initial Concept

## Executive Summary

This project aims to create an **optimized unified AI CLI suite** starting with **OmniCode** as the foundation, with forward compatibility for Claude Code Framework, Copilot CLI, OpenAI Codex CLI, and other AI frameworks.

**Scope:** Analyze 15+ existing implementations of AI CLI customizations and synthesize them into a modular, extensible architecture.

## Key Architectural Patterns

- **CLI Interface Layer:** REPL, Commands, Interactive Modes, IDE Integration
- **Command/Agent Orchestration:** Command Namespace Registry, Agent Router, Skill Dispatcher, Workflow Executor
- **Framework Abstraction Layer (FAL):** Adapters for Gemini, Claude, OpenAI, etc.
- **Core Services Layer:** MCP Integration, Tool Manager, Provider Client, Policy Engine, Memory System, Configuration Manager
- **LLM Provider APIs:** Gemini, Claude, OpenAI

## Multi-Framework Roadmap

1.  **OmniCode Suite (Phase 1-2):** Core foundation, Full Gemini integration, Base commands, Skill system, Task orchestration.
2.  **Claude Code Integration (Phase 3-4):** Claude adapter, Claude Code Skills compatibility, Extended thinking support, Artifact integration.
3.  **OpenAI Codex CLI (Phase 5):** OpenAI adapter, GPT-4/4-Turbo integration, Function calling support.

# Product Vision

A modern, extensible CLI suite for AI-powered development, featuring a Framework Abstraction Layer (FAL) with built-in Gemini support and a reactive terminal interface.

# Target Users

- **Developers and Software Engineers:** Professionals seeking a powerful, command-driven AI assistant for deep technical tasks like refactoring, debugging, and architecture design.
- **Vibe-coding Enthusiasts:** Creative developers who prioritize a high-velocity, expressive, and conversational flow in their coding sessions.

# Core Goals

- **Unified Interface:** Provide a consistent CLI experience regardless of the underlying LLM provider (Gemini, Claude, or OpenAI).
- **Modular Extensibility:** Enable rapid expansion of capabilities through custom commands, specialized agents, and portable skills.
- **Intelligent Orchestration:** Facilitate complex task management and automated development workflows.
- **Advanced Context & Memory:** Leverage semantic memory and sophisticated context management for long-running project awareness.

# Key Features (Initial Release)

- **Namespace Command System:** An organized command hierarchy (e.g., `/dev`, `/test`, `/security`, `/project`) for intuitive navigation and execution.
- **Dynamic Command Registry:** Automatic discovery and registration of commands from the filesystem.
- **Global Utility Commands:** Core commands like `/help`, `/version`, and `/config` for system management.
- **Provider Authentication:** Integrated OAuth 2.0 (Google) and secure credential management for OpenAI and Anthropic.
- **Interactive Chat Mode:** A dedicated TUI for real-time, streaming AI conversations with context awareness.
- **Task Orchestration Engine:** A robust system for decomposing objectives into actionable tasks, integrated directly with Git for history and state management.
- **Model Context Protocol (MCP) Support:** Full implementation as an MCP Host, enabling secure connection to external tools (filesystem, DBs, search) with interactive human-in-the-loop approvals.
- **Specialized AI Agents:** Autonomous agents with focused tool access, such as a Code Quality Suite and a Test Engineer.

# Guiding Principles

- **Framework Agnosticism:** Core logic remains independent of specific LLM providers, ensuring future-proofing and provider flexibility.
- **Performance Optimized:** Built for high-performance interactions, minimizing latency in both local operations and API communication.
- **Rich & Interactive UX:** Utilizing TUI (Terminal User Interface) components for a modern, visual, and highly interactive developer experience.
- **Expressive Personality:** A "vibe-coding" friendly assistant that is conversational, helpful, and adapts to the user's creative pace.
