# Project Overview

**Project Name:** cli_frameworks
**Purpose:** An optimized unified AI CLI suite (initially Gemini-focused) featuring a Framework Abstraction Layer (FAL) to support multiple AI providers (Gemini, Claude, OpenAI). It aims to provide a consistent, modular, and extensible command-line interface for developers.
**Architecture:**
- **Monorepo:** Turborepo + pnpm
- **Packages:**
    - `@gemini-cli/core`: Core logic and FAL.
    - `@gemini-cli/cli`: The terminal interface (using Ink).
    - `@gemini-cli/mcp`: MCP implementation.
    - `@gemini-cli/shared`: Shared utilities.
- **Key Features:** Command Namespace Registry, Agent Router, Interactive TUI.
