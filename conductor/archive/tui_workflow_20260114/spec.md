# Spec: OmniCode TUI Workflow & Architecture Implementation

## 1. Overview
This track implements the core interaction logic and state management for the OmniCode TUI, as defined in `TUI_WF_OMNI.md`. It transforms the static 3-pane layout into a functional, reactive "Glass Cockpit" that handles AI streaming, tool approvals, and context navigation.

## 2. Functional Requirements

### 2.1 State Management & FSM
- **Standalone `useTUIStateMachine` Hook:** Implement a hook that manages transitions between `IDLE`, `PLANNING`, `THINKING`, `APPROVAL`, `EXECUTING`, and `ERROR` states.
- **Zustand Integration:** The hook will subscribe to the TUI store and trigger side effects (e.g., shifting focus) on state changes.

### 2.2 Global Interaction & Interruption
- **Safe Interruption (`Ctrl+C`):** 
  - Intercept `ctrl+c` using Ink's `useInput`.
  - If in `THINKING` or `EXECUTING` state, transition to `PAUSED` (sub-state of `IDLE`) and stop the AI stream instead of exiting.
  - Require a second `ctrl+c` or specific confirmation to fully exit the application.
- **Pane Navigation:** Implement `Tab` key handling to cycle focus between Left, Center, and Right panes.

### 2.3 Workflow Implementations
- **Thinking Indicator:** Update `<ThinkingIndicator />` to display a granular log of AI "thoughts" (e.g., "Reading file X...").
- **Tool Approval Flow:** 
  - When the AI requests a tool, automatically shift focus to the **Right Pane**.
  - Enable keyboard shortcuts in the Right Pane: `y` (Approve), `n` (Deny), `m` (Modify).
- **Context Management (Left Pane):**
  - Enable file list scrolling using arrow keys when the Left Pane is focused.
  - **Hybrid Viewer/Editor:** 
    - Press `Enter` to view a file preview in a TUI modal (Read-only).
    - Press `o` to open the file in the system's default editor (launching `open` or `xdg-open` in a non-blocking manner).

## 3. Non-Functional Requirements
- **Performance:** Use Ink's `<Static>` component for chat history to maintain 60FPS-like responsiveness during streaming.
- **Observability:** Ensure the current state and active agent are always visible in the Left Pane.

## 4. Acceptance Criteria
- [ ] Pressing `Ctrl+C` during generation stops the generation but keeps the app running.
- [ ] Pressing `Tab` cycles focus through all three panes with visual border changes.
- [ ] AI tool requests trigger a focus shift to the Right Pane.
- [ ] Pressing `o` on a file in the Context Well opens it in an external editor.
- [ ] The TUI remains responsive (no input lag) during high-speed token streaming.

## 5. Out of Scope
- Integrated terminal emulator inside the TUI.
- Complex multi-file diff editor (V1 will use simplified text diffs).
