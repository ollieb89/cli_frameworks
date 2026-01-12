# Track Specification: Core Foundation & Gemini CLI Integration

## Overview

This track focuses on establishing the foundational architecture for the AI CLI Suite. It includes setting up the monorepo structure, implementing the Framework Abstraction Layer (FAL) with a robust Gemini adapter, and creating the initial CLI shell capable of handling namespace commands (specifically `/dev`).

## Core Objectives

- **Repo Setup:** Initialize a Turborepo monorepo with TypeScript, ESLint, and testing infrastructure.
- **FAL Implementation:** Create the `ProviderAdapter` interface and a fully functional `GeminiAdapter` using `@google/generative-ai`.
- **CLI Shell:** Build the interactive REPL using `ink` and `commander.js` that can parse namespace commands.
- **Initial Command:** Implement a basic `/dev:status` command to verify the pipeline.

## Detailed Requirements

### 1. Monorepo Structure

- **Tooling:** Turborepo, pnpm, esbuild.
- **Packages:**
  - `packages/core`: Core logic, FAL, orchestrators.
  - `packages/cli`: The terminal interface and command handlers.
  - `packages/shared`: Shared types, constants, and utilities.

### 2. Framework Abstraction Layer (FAL)

- **Interface:** `ProviderAdapter` defining methods for `sendMessage`, `listModels`, `getCapabilities`.
- **Gemini Adapter:**
  - Implementation of `ProviderAdapter`.
  - Secure handling of API keys.
  - Support for streaming responses.
- **Provider Registry:** Mechanism to register and retrieve adapters (defaulting to Gemini).

### 3. CLI Shell & REPL

- **Framework:** `ink` for the UI, `commander.js` for argument parsing.
- **Interaction:** A continuous REPL loop that accepts user input.
- **Namespace Parsing:** Logic to detect namespace prefixes (e.g., `/dev:`) and route to the correct handler.
- **Error Handling:** Graceful display of errors with helpful context.

### 4. Basic /dev Namespace

- **Command:** `/dev:status`
- **Behavior:** Returns system status, active provider (Gemini), and current model configuration.
- **Purpose:** End-to-end verification of the CLI -> Core -> FAL flow.

## Acceptance Criteria

- [ ] Monorepo builds successfully with `pnpm build`.
- [ ] Unit tests for FAL and Command Registry pass.
- [ ] CLI starts and presents a welcome message.
- [ ] `/dev:status` returns correct provider info.
- [ ] Gemini API calls are successful and responses are displayed.
