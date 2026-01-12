# Plan: Chat Interface & AI Streaming

## Phase 1: AI Client & Streaming logic
- [x] **Task: Streaming Support in FAL**
    - [x] Subtask: Add `streamMessage` to `ProviderAdapter` interface.
    - [x] Subtask: Implement streaming in `GeminiAdapter`.
- [x] **Task: Provider Initialization**
    - [x] Subtask: Create a utility to auto-initialize the correct adapter based on `auth:status`.

## Phase 2: Chat TUI Implementation
- [x] **Task: Create `ChatView` Component**
    - [x] Subtask: Design a reactive layout for messages.
    - [x] Subtask: Handle streaming state updates in the UI.
- [x] **Task: Input & Scrolling**
    - [x] Subtask: Integrate `TextInput` for multi-line (or single-line) chat.

## Phase 3: Integration & Global Command
- [x] **Task: `/chat` Command**
    - [x] Subtask: Implement the command to switch the App mode to `chat`.
    - [x] Subtask: Wire up the message history state.
