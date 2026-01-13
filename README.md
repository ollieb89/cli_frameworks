# OmniCode (alias `oc`)

OmniCode is an optimized unified AI CLI suite featuring a Framework Abstraction Layer (FAL) to support multiple AI providers (Gemini, Claude, OpenAI).

## Features

- **Namespace Command System:** Intuitive navigation (e.g., `/dev`, `/test`, `/auth`).
- **Dynamic Command Registry:** Automatic discovery of commands.
- **Interactive Chat Mode:** TUI-based streaming AI conversations.
- **MCP Support:** Full implementation as an MCP Host.

## Setup

1. Install dependencies:
   ```bash
   pnpm install
   ```

2. Build the project:
   ```bash
   pnpm build
   ```

3. Run the CLI:
   ```bash
   node packages/cli/dist/index.js
   ```

## Development

- **Monorepo:** Turborepo + pnpm.
- **Language:** TypeScript.
- **UI:** Ink (React-based).
- **Testing:** Vitest.

## License

MIT
