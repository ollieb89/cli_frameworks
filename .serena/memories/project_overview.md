# Project Overview

**Project Name:** OmniCode
**Purpose:** An optimized unified AI CLI suite featuring a Framework Abstraction Layer (FAL) to support multiple AI providers (Gemini, Claude, OpenAI). It aims to provide a consistent, modular, and extensible command-line interface for developers.
**Architecture:**
- **Monorepo:** Turborepo + pnpm
- **Packages:**
    - `@omnicode/core`: Core logic and FAL.
    - `@omnicode/cli`: The terminal interface (using Ink).
    - `@omnicode/mcp`: MCP implementation.
    - `@omnicode/shared`: Shared utilities.
- **Key Features:** Command Namespace Registry, Agent Router, Interactive TUI.
