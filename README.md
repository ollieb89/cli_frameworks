# OmniCode CLI Suite

A modern, extensible AI-powered CLI framework with support for multiple AI providers, featuring an interactive terminal UI and Model Context Protocol (MCP) integration.

[![TypeScript](https://img.shields.io/badge/TypeScript-5.9+-blue.svg)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-18.x+-green.svg)](https://nodejs.org/)
[![License: ISC](https://img.shields.io/badge/License-ISC-yellow.svg)](LICENSE)

## What is OmniCode CLI Suite?

OmniCode CLI Suite is an optimized unified AI CLI framework that provides a consistent, modular, and extensible command-line interface for AI-powered development workflows. Built with a Framework Abstraction Layer (FAL), it currently supports Google OmniCode with forward compatibility for Claude, OpenAI, and other AI providers.

### Key Features

- 🎯 **Namespace Command System** - Organized command hierarchy (`/auth`, `/mcp`, `/chat`, `/dev`) for intuitive navigation
- 🔌 **MCP Integration** - Full Model Context Protocol support as an MCP host with human-in-the-loop approvals
- 💬 **Interactive Chat Mode** - Real-time streaming AI conversations with context awareness
- 🔐 **Multi-Provider Authentication** - OAuth 2.0 support for Google, with API key management for OpenAI and Anthropic
- ⚡ **Dynamic Command Registry** - Automatic command discovery and registration from the filesystem
- 🎨 **Modern Terminal UI** - React-based interface using Ink with autocomplete and fuzzy search
- 📦 **Monorepo Architecture** - Turborepo-powered workspace with modular packages

## Quick Start

### Prerequisites

- **Node.js** 18.x or higher
- **pnpm** 10.27.0 or higher (recommended)

### Installation

```bash
# Clone the repository
git clone https://github.com/ollieb89/cli_frameworks.git
cd cli_frameworks

# Install dependencies
pnpm install

# Build all packages
pnpm build
```

### Running the CLI

```bash
# Navigate to the CLI package
cd packages/cli

# Start the CLI
pnpm start
```

## Usage Examples

### Getting Help

```bash
# List all available commands
/global: help

# Interactive help search
/global:help -i
```

### Authentication

```bash
# Login with Google OAuth
/auth:login google

# Check authentication status
/auth:status

# Configure API keys for other providers
/global:config set secrets.openai.apiKey YOUR_KEY
/global:config set secrets. anthropic.apiKey YOUR_KEY
```

### Chat Mode

```bash
# Start an interactive AI chat session
/chat:start
```

### MCP Server Management

```bash
# List connected MCP servers
/mcp: list

# Add a new MCP server
/mcp:add server-id npx @modelcontextprotocol/server-filesystem

# Inspect server capabilities
/mcp:inspect server-id

# Run health check
/mcp:doctor
```

### Configuration

```bash
# List all configuration
/global:config list

# Get specific config value
/global:config get google.clientId

# Set configuration value
/global:config set google. clientId YOUR_CLIENT_ID
```

## Architecture

### Monorepo Structure

```
cli_frameworks/
├── packages/
│   ├── cli/           # Terminal UI and command interface (Ink-based)
│   ├── core/          # Core logic, FAL, and AI provider integrations
│   ├── mcp/           # Model Context Protocol implementation
│   └── shared/        # Shared types and utilities
├─�� conductor/         # Project documentation and planning
├── docs/              # Additional documentation
└── scripts/           # Build and utility scripts
```

### Core Packages

- **`@omnicode-cli/cli`** - Interactive terminal interface with command registry and UI components
- **`@omnicode-cli/core`** - Framework Abstraction Layer (FAL) and AI provider clients
- **`@omnicode-cli/mcp`** - MCP host implementation with server management
- **`@omnicode-cli/shared`** - Shared constants, types, and utilities

## Development

### Build the Project

```bash
# Build all packages (uses Turbo pipeline)
pnpm build
```

### Run Tests

```bash
# Run tests across all packages
pnpm test

# Run tests in watch mode (CI-aware)
CI=true pnpm test
```

### Linting & Formatting

```bash
# Run ESLint
pnpm lint

# Format code with Prettier
pnpm format
```

### Type Checking

```bash
# Run TypeScript type checking
cd packages/cli
pnpm typecheck
```

## Tech Stack

| Category | Technology |
|----------|-----------|
| **Language** | TypeScript 5.9+ (NodeNext) |
| **Runtime** | Node.js 18.x+ |
| **Package Manager** | pnpm 10.27.0+ |
| **Monorepo** | Turborepo 2.7+ |
| **Terminal UI** | Ink 5.2+ (React-based) |
| **AI Integration** | @google/generative-ai |
| **Authentication** | google-auth-library, OAuth 2.0 |
| **MCP SDK** | @modelcontextprotocol/sdk |
| **Testing** | Vitest 4.0+ |
| **Linting** | ESLint 9+ with TypeScript support |
| **Formatting** | Prettier 3.7+ |

## Configuration

The CLI uses JSON configuration files stored in `~/.omnicde-cli/`:

- **`config.json`** - General configuration and preferences
- **`secrets.json`** - Encrypted credentials and API keys (gitignored)
- **`mcp.json`** - MCP server definitions and settings

## Contributing

We welcome contributions! Please see our [contribution guidelines](CONTRIBUTING.md) for details on:

- Code style and conventions
- Test-driven development workflow
- Pull request process
- Development principles

### Key Development Principles

1. **The Plan is the Source of Truth** - All work tracked in `conductor/plan.md`
2. **Test-Driven Development** - Write tests before implementation
3. **High Code Coverage** - Target >80% coverage for all modules
4. **User Experience First** - Prioritize UX in all decisions

## Project Documentation

- **[Product Vision](conductor/product. md)** - Overview of goals and roadmap
- **[Tech Stack](conductor/tech-stack. md)** - Detailed technology decisions
- **[Workflow Guide](conductor/workflow.md)** - Development workflow and task lifecycle
- **[Style Guide](.serena/memories/style_guide.md)** - Code conventions

## Getting Help

- 📖 **Documentation**:  Browse the [docs/](docs/) directory
- 🐛 **Issues**: Report bugs or request features via [GitHub Issues](https://github.com/ollieb89/cli_frameworks/issues)
- 💬 **Discussions**: Join the conversation in [GitHub Discussions](https://github.com/ollieb89/cli_frameworks/discussions)

## Maintainers

- **ollieb89** - Project Owner

## License

ISC License - see [LICENSE](LICENSE) file for details. 

## Roadmap

### Current Phase (Phase 1-2)
- ✅ Core foundation with monorepo setup
- ✅ Command namespace system with autocomplete
- ✅ OmniCode API integration
- ✅ MCP host implementation
- ✅ OAuth 2.0 authentication
- 🔄 Interactive chat mode with streaming

### Future Phases
- **Phase 3-4**: Claude Code integration and extended thinking support
- **Phase 5**: OpenAI Codex CLI with GPT-4 integration
- **Phase 6+**: Semantic memory, task orchestration, specialized AI agents

---

Built with ❤️ for the future of AI-assisted development
