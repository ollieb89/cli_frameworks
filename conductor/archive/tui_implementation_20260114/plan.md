# Plan: OmniCode TUI Implementation

**Objective:** Transform the current simple CLI interface into a reactive, 3-pane "Glass Cockpit" dashboard using Ink and React, as defined in `TUI_RESEARCH_OMNICODE.md` and `TUI_WF_OMNI.md`.

## Phase 1: Foundation & Layout
- [x] **State Management Setup:** Install `zustand` and create the global TUI store (`useTUIStore`).
- [x] **Layout Scaffolding:** Create the root 3-column `Flex` layout in `App.tsx`.
- [x] **Pane Components:** Create placeholder components for `LeftPane`, `CenterPane`, and `RightPane`.

## Phase 2: Core Components
- [x] **Context Well (Left Pane):** Implement `ContextWell` to display loaded files from the store.
- [x] **Chat Stream (Center Pane):** specific `ChatStream` component with `React.memo` optimization.
- [x] **Input Area (Center Pane):** sticky bottom input with focus management.
- [x] **Thinking Indicator:** Implement the granular `<ThinkingIndicator />` (replacing static spinners).

## Phase 3: Advanced Integrations
- [x] **MCP Tool Guard (Right Pane):** Implement the visual state for tool calls (Pending -> Running -> Complete).
- [x] **FAL Switcher:** Visual indicator for the active model (Gemini/Claude) with color coding.
- [x] **Keyboard Shortcuts:** Implement global `useInput` hooks for pane navigation (`Tab`) and command palette (`Ctrl+P`).

## Phase 4: Polish & Refinement
- [x] **Visuals:** Apply `ink-gradient` and `lucide-react` icons.
- [x] **Performance Tuning:** Verify re-render counts and optimize `Static` vs `Box` usage.
- [x] **Integration Tests:** Verify the TUI renders correctly under test harness.

