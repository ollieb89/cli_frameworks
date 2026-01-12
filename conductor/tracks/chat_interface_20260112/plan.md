# Plan: Chat Interface & AI Streaming

## Phase 1: AI Client & Streaming logic
- [ ] **Task: Streaming Support in FAL**
    - [ ] Subtask: Add `streamMessage` to `ProviderAdapter` interface.
    - [ ] Subtask: Implement streaming in `GeminiAdapter`.
- [ ] **Task: Provider Initialization**
    - [ ] Subtask: Create a utility to auto-initialize the correct adapter based on `auth:status`.

## Phase 2: Chat TUI Implementation
- [ ] **Task: Create `ChatView` Component**
    - [ ] Subtask: Design a reactive layout for messages.
    - [ ] Subtask: Handle streaming state updates in the UI.
- [ ] **Task: Input & Scrolling**
    - [ ] Subtask: Integrate `TextInput` for multi-line (or single-line) chat.

## Phase 3: Integration & Global Command
- [ ] **Task: `/chat` Command**
    - [ ] Subtask: Implement the command to switch the App mode to `chat`.
    - [ ] Subtask: Wire up the message history state.
