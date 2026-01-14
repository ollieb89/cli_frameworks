# TUI & CLI Research: Best Practices for AI Coding Agents (2025-2026)

## 1. Executive Summary: The "Agentic TUI" Era
In 2025-2026, the Command Line Interface (CLI) is no longer just a text stream; it is an **interactive workspace**. For AI coding agents, the TUI must bridge the gap between *natural language intent* and *deterministic code execution*.

**The Core Philosophy:** "Speak Human, See Machine."
Users want to converse naturally but verify outcomes rigorously through diffs, status checks, and structured plans.

## 2. Visual Design Trends (2025-2026)

### 2.1. "Post-Neumorphism" in the Terminal
Gone are flat, high-contrast block interfaces. Modern TUIs use depth and hierarchy to manage complex context.
*   **Depth & Layering:** Using subtle background color shifts (e.g., `bg-gray-900` vs `bg-gray-800`) and box-shadow simulations (using specific Unicode block characters) to distinguish "active" panels from background tasks.
*   **Tactility:** Borders are not just lines; they are state indicators. A pulsing border implies active generation; a solid border implies a paused state; a double border implies user input required.
*   **Typography:** Large, bold headers for sectioning (using libraries like `figlet` or high-resolution font rendering in modern terminals like Alacritty/Ghostty).

### 2.2. Purposeful Motion
Animations are functional, not decorative.
*   **Micro-interactions:** A quick flash on a file name when it is written.
*   **Fluid Streaming:** LLM tokens shouldn't just "appear"; they should flow. Smooth scrolling is mandatory (often requiring GPU-accelerated rendering).
*   **State Transitions:** When switching from "Planning" to "Executing", the UI should visually morph (e.g., the plan panel collapses to a sidebar, the terminal output expands).

## 3. UX Patterns for AI Coding Agents

### 3.1. The "Orchestrator" Layout
A single-column text stream is insufficient for multi-step agentic workflows. The 2026 standard layout is the **Three-Pane Dashboard**:

| Pane | Purpose | Content Type |
| :--- | :--- | :--- |
| **Left: The Plan** | High-level roadmap | Checkbox tree, current phase highlighted. |
| **Center: The Conversation** | User interaction | Chat bubble stream, rich text, code blocks. |
| **Right/Bottom: The Workbench** | "Raw" execution | Shell logs, diff views, active file context. |

### 3.2. Observability & Trust
*   **"Thinking" Visibility:** Never show a static spinner for >2 seconds. Show the *thought process* (e.g., "Reading file X...", "Analyzing dependency Y...", "Running tests...").
*   **Context Wells:** A designated area showing *what* the AI currently "knows" (loaded files, active memory). This prevents the "hallucination anxiety" where users wonder if the AI read the file.
*   **Cost/Token Meters:** Real-time visibility into session cost and context window usage.

### 3.3. "Interruptibility" First
*   **The Big Red Button:** Users must be able to pause execution (`Ctrl+C` or `Esc`) without killing the session. The agent should pause, summarize state, and ask for direction.
*   **Steerability:** While streaming code, a user should be able to type "Wait, use the other library" and have the agent immediately halt and pivot.

### 3.4. Input: Hybrid Command Palette
*   **Natural Language:** "Fix the bug in auth."
*   **Slash Commands:** `/test`, `/undo`, `/diff`.
*   **@-Mentions:** `@file:utils.ts`, `@symbol:AuthClass`.
*   **Autocomplete:** Predictive text for commands *and* file paths, powered by local embedding search.

## 4. Technical Architecture Best Practices

### 4.1. Headless Core + TUI Adapter
Don't couple logic to the UI.
*   **Core:** Emits structured events (`jsonl` stream) via `stdout` or a local socket.
    *   `{ "type": "plan_update", "data": [...] }`
    *   `{ "type": "token", "content": "function" }`
    *   `{ "type": "tool_call", "tool": "write_file", "status": "pending" }`
*   **TUI Layer:** Reads the stream and renders. This allows you to swap the TUI for a web view or IDE plugin later without rewriting the agent.

### 4.2. Recommended Tech Stack
*   **Node.js/TypeScript:**
    *   **Ink:** React-based TUI. Excellent for complex state management and component reusability. Best for "web developers building CLI tools."
    *   **Pastel:** For simple styling.
*   **Go:**
    *   **Bubble Tea:** The "Gold Standard" for performance and strict Model-Update-View architecture.
*   **Rust:**
    *   **Ratatui:** Unbeatable performance. Best for high-frequency updates (e.g., concurrent multi-file editing).
*   **Python:**
    *   **Textual:** CSS-like styling in Python. Very rapid prototyping.

## 5. Inspiration Gallery (References)
*   **Lazygit:** For modal management and keybinding hints.
*   **K9s:** For density of information and resource monitoring dashboards.
*   **Supermaven / Cursor Terminal:** For "ghost text" and inline diffs.
*   **Claude Code (Headless):** For the structured JSON output pattern facilitating tool integration.

## 6. Actionable "Next Steps" for OmniCode
1.  **Implement the "Context Well":** A UI component that always shows currently loaded files.
2.  **Adopt "Thinking" Logs:** Replace generic spinners with granular status updates.
3.  **Headless-First Protocol:** Ensure all agent outputs are structured JSON events first, rendered by the TUI second.
