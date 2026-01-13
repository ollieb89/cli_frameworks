## Core Infrastructure

- **Monorepo:** Turborepo
- **Package Manager:** pnpm
- **Language:** TypeScript (NodeNext)

## Frameworks & Libraries

- **Terminal UI:** Ink (React-based)
- **Command Parsing:** Custom namespace parser + Commander.js
- **Command Discovery:** fast-glob
- **Table Rendering:** cli-table3
- **Interactive Input:** ink-text-input
- **Authentication:** google-auth-library, open
- **MCP Implementation:** @modelcontextprotocol/sdk
- **Schema Validation:** zod
- **AI Integration:** Google Generative AI (@google/generative-ai)
- **Testing:** Vitest

## Programming Language & Runtime

- **TypeScript (v5.3+):** The primary language for core logic, ensuring type safety and modern development patterns.
- **Node.js (v18.x+):** The target runtime for the CLI suite.

## AI Foundation

- **Gemini API (@google/generative-ai):** The primary AI engine. Standard: **Gemini 3.0 Flash** for speed, **Gemini 3.0 Pro** for complex reasoning.
- **Claude API (@anthropic-ai/sdk):** Integrated for forward compatibility. Standard: **Claude 3.5 Sonnet/Opus**.
- **OpenAI API (openai):** Integrated for multi-provider support and function-calling capabilities.
- **OAuth & Browser-Based Login:** Support for secure, browser-based authentication flows for each provider.

## CLI & User Interface

- **Command Parsing:** **commander.js** or **yargs** for robust command-line argument and namespace management.
- **TUI Framework:**
  - **ink:** A React-based component framework for building modern, interactive CLI interfaces.
  - **blessed / blessed-contrib:** For more complex, widget-heavy TUI layouts.
- **Styling & Feedback:** **chalk** for terminal styling and **ora** for elegant spinners and loaders.

## Persistence & Memory

- **Structured State:** **SQLite** for local, structured persistence of project state and user preferences.
- **Semantic Memory:** **Vector DB (e.g., Chroma or local FAISS)** for long-term semantic memory and advanced similarity searches across the codebase.

## Infrastructure & Tooling

- **Build System:** **Turborepo** + **esbuild** for high-performance builds in a monorepo structure.
- **Package Manager:** **pnpm** for efficient dependency management.
- **Testing:** **Jest** or **Vitest** for unit and integration testing.
