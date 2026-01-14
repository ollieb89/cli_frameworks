# OmniCode TUI Workflow & Architecture (`TUI_WF_OMNI.md`)

> **Reference:** `TUI_RESEARCH_OMNICODE.md`
> **Purpose:** Detailed Workflow (WF) and Interaction Specification for the OmniCode TUI.
> **Scope:** User Journeys, State Machine, and Data Flow.

## 1. System Architecture & State Machine

The TUI is driven by a finite state machine (FSM) managed in `Zustand`. This ensures the UI is always in a deterministic state.

### 1.1. Core States (`TUIState`)

| State | Description | Active Pane | Allowed Interactions |
| :--- | :--- | :--- | :--- |
| **`IDLE`** | Waiting for user input. | **Center** (Input) | Type, History Scroll, Switch Pane |
| **`PLANNING`** | AI is determining intent (Router). | **Center** (Stream) | *Interrupt (`Ctrl+C`)* |
| **`THINKING`** | AI is generating a response/code. | **Center** (Stream) | *Interrupt*, Expand Thought Log |
| **`APPROVAL`** | MCP Tool requires permission. | **Right** (Guard) | `y` (Yes), `n` (No), `m` (Modify) |
| **`EXECUTING`** | Tool is running (e.g., writing file). | **Right** (Workbench)| *Interrupt* |
| **`ERROR`** | Critical failure or rejection. | **Any** | Dismiss, Retry |

### 1.2. Data Flow (Unidirectional)

1.  **User Input** (`InputArea`) → **Action** (`submitMessage`)
2.  **FAL** (Core) processes request → **Stream Events** (`jsonl`)
3.  **TUI Store** (`zustand`) receives events → Updates `state` & `messages`
4.  **React Components** (`App.tsx`) re-render specific panes based on `state`

---

## 2. Detailed User Workflows

### 2.1. Workflow A: The "Knowledge Query" (Chat)
*User asks a question that requires no tools.*

1.  **User:** Types "Explain how the router works" in `CenterPane`.
2.  **UI Transition:** `IDLE` → `THINKING`.
3.  **Visuals:**
    *   **Left Pane:** Shows `Agent: Chat` (Blue).
    *   **Center Pane:** Input disabled. Streaming text appears. `<ThinkingIndicator>` pulses: "Retrieving context...".
4.  **Completion:** Stream ends. State → `IDLE`. Input autofocuses.

### 2.2. Workflow B: The "Refactor" (Tool Execution)
*User asks for a file modification.*

1.  **User:** Types "Rename `utils.ts` to `helpers.ts`" in `CenterPane`.
2.  **UI Transition:** `IDLE` → `PLANNING` → `THINKING`.
3.  **Router:** Selects `FileAgent`.
4.  **Visuals:**
    *   **Left Pane:** Update `Agent: FileAgent` (Orange).
    *   **Center Pane:** Displays "I will rename the file..."
5.  **Tool Call Trigger:** AI attempts `move_file`.
6.  **UI Transition:** `THINKING` → **`APPROVAL`**.
    *   **Focus:** Shifts to **Right Pane** (`MCPToolGuard`).
    *   **Right Pane:** Displays:
        ```text
        Tool: move_file
        Args: { src: "utils.ts", dest: "helpers.ts" }
        [y] Approve  [n] Deny  [m] Modify
        ```
7.  **User Action:** Presses `y`.
8.  **UI Transition:** `APPROVAL` → `EXECUTING`.
    *   **Right Pane:** Shows spinner "Moving...".
9.  **Completion:** Tool returns success. State → `IDLE`.
    *   **Center Pane:** "Done. File renamed."

### 2.3. Workflow C: The "Interruption" (Pivot)
*User realizes they made a mistake mid-generation.*

1.  **State:** `THINKING` (AI is streaming a long code block).
2.  **User Action:** Presses `Ctrl+C`.
3.  **UI Transition:** `THINKING` → `PAUSED` (special sub-state of `IDLE`).
4.  **Visuals:**
    *   Stream stops immediately.
    *   **Center Pane:** Appends `[Interrupted by User]`.
    *   **Input:** Re-appears with text: "Generate the rest?" (Pre-filled or empty).
5.  **User:** Types "Wait, use `fs-extra` instead."
6.  **System:** Adds context "User interrupted and corrected: ..." → Resumes `PLANNING`.

### 2.4. Workflow D: Context Management
*User wants to check what files are loaded.*

1.  **State:** `IDLE`.
2.  **User Action:** Presses `Tab` to cycle focus.
3.  **Focus:** **Left Pane** (`ContextWell`).
4.  **User Action:** `Up/Down` arrows to scroll file list.
5.  **Visuals:** Highlighted file shows metadata (size, lines) in a tooltip/footer.
6.  **User Action:** Press `Enter` on a file.
7.  **System:** Opens file in default `$EDITOR` (optional feature).

---

## 3. Component Interaction Specifications

### 3.1. `<App />` (Layout Orchestrator)
*   **Responsibility:** Mounts the 3 panes and handles global shortcuts (`Tab`, `Ctrl+C`).
*   **Props:** None (connects to Store).

### 3.2. `<ThinkingIndicator />`
*   **Logic:**
    *   Receives a stream of "thoughts".
    *   Displays only the *current* active thought.
    *   Keeps a history of past thoughts in a collapsed state (expandable via `Ctrl+T`?).
*   **Animation:** Simple framing dots `...` or `⠋⠙⠹`.

### 3.3. `<MCPToolGuard />`
*   **Modes:**
    *   `Idle`: Empty or "Ready".
    *   `Request`: Yellow border. Shows JSON args.
    *   `Running`: Blue border. Spinner.
    *   `Success`: Green border. Checkmark.
    *   `Error`: Red border. Error message.

### 3.4. `<ChatStream />`
*   **Virtualization:**
    *   Store keeps `messages[]`.
    *   Component renders `messages.slice(-50)` to prevent DOM heaviness in Ink.
    *   Uses `<Static>` for "old" messages that won't change.

---

## 4. Implementation Roadmap (Refined)

1.  **Store Implementation:** Define `TUIState` and Actions in `zustand`.
2.  **FSM Hook:** Create `useTUIStateMachine` to handle transitions.
3.  **Layout & Pane Wiring:** Connect panes to the Store.
4.  **Input & Focus Loop:** Implement the `Tab` cycle logic.
5.  **Event Stream Connection:** Hook up `FAL` events to Store Actions.
