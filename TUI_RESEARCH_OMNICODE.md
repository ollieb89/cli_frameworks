# OmniCode TUI Architecture & UX Strategy

> **Role:** Senior Frontend Engineer & CLI UX Designer
> **Target:** `@omnicode/cli` (Ink + React)
> **Goal:** Bridge the gap between "Vibe-Coding" flow and Engineering Rigor.

## 1. Design Philosophy: The "Glass Cockpit" for AI

For OmniCode, the TUI isn't just a REPL; it's a **flight deck**. It needs to manage the complexity of multi-agent orchestration (FAL, MCP, Agents) while keeping the developer in a "flow state."

**Core UX Pillars:**
1.  **Transparent Intelligence:** Don't hide the AI. Visualize the *Agent Router*, the *FAL Provider*, and the *MCP Tool Calls*.
2.  **Reactive & Resilient:** The UI must never freeze. Input must always be available (`Ctrl+C` interruptibility).
3.  **Visual Hierarchy via Typography:** Use `lucide-react` icons and bold colors to distinguish *Planning* (Blue/Purple), *Thinking* (Yellow/Orange), and *Executing* (Green/Red).

## 2. The "Omni-Dashboard" Layout (Ink Architecture)

We will implement a reactive **3-Column Flex Layout** using Ink's `<Box>` components.

```tsx
<Box flexDirection="row" height="100%">
  {/* Left: Context & State */}
  <Box width="25%" borderStyle="single" borderColor="blue">
    <AgentStatus />
    <ContextWell />
  </Box>

  {/* Center: The Stream */}
  <Box width="50%" borderStyle="single" borderColor="gray">
    <ChatStream />
    <InputArea />
  </Box>

  {/* Right: The Workbench */}
  <Box width="25%" borderStyle="single" borderColor="green">
    <ActiveTool />
    <FileDiff />
  </Box>
</Box>
```

### 2.1. Left Pane: The "Brain" State
*   **Agent Indicator:** Show active agent (e.g., `RefactorAgent` vs `ChatAgent`) and Provider (Gemini/Claude).
    *   *Icon:* `<Brain />` or `<Bot />` from `lucide-react`.
*   **Context Well:** List of currently loaded files in the context window.
    *   *Component:* `<ContextList items={context.files} />`
*   **Token Meter:** Visual progress bar for context window usage.

### 2.2. Center Pane: The "Flow"
*   **Chat Stream:** The main conversation.
    *   *Optimization:* Use `React.memo` on chat items. Only the last item should re-render during streaming.
*   **Input Area:** Sticky bottom.
    *   *Tech:* `ink-text-input` with auto-growing height.

### 2.3. Right Pane: The "Hand" (Execution)
*   **Tool Activity:** When MCP tools run, they appear here.
    *   *State:* `Pending Approval` (Yellow) -> `Running` (Blue) -> `Complete` (Green).
*   **Mini-Diff:** Small previews of file changes before confirmation.

## 3. Component Strategy (React/Ink)

### 3.1. `<ThinkingIndicator />` (The Anti-Spinner)
Instead of a generic spinner, we stream the *thought process*.
*   **Props:** `steps: string[]`, `currentStep: number`.
*   **Render:**
    ```text
    ✓ Analyzed dependencies
    > Reading src/App.tsx... (pulsing)
      Generating refactor plan
    ```

### 3.2. `<MCPToolGuard />`
A dedicated modal/overlay component for human-in-the-loop approvals.
*   **Behavior:** Intercepts tool calls. Focus shifts to this component.
*   **Controls:** `[y] Approve`, `[n] Deny`, `[m] Modify`.

### 3.3. `<FALSwitcher />`
Visual indicator of the underlying model.
*   **Gemini:** 🔵 Blue/Purple gradient text.
*   **Claude:** 🟠 Orange/Clay colored text.
*   **OpenAI:** 🟢 Green/Teal colored text.
*   *Why?* Reinforces the "Framework Abstraction Layer" concept to the user.

## 4. Technical Implementation Recommendations

### 4.1. State Management
*   **Recommendation:** **Zustand**.
*   *Why?* Redux is too heavy. Context API causes too many re-renders in CLI (where every repaint is expensive). Zustand allows transient updates (updating the TUI without full React render cycles) which is crucial for high-speed token streaming.

### 4.2. Performance Optimization
*   **`static` Mode:** For the chat history, consider using Ink's `<Static>` component for past messages to offload them from the active Flexbox calculation.
*   **Debounced Rendering:** Don't render every single token event. Batch updates (e.g., every 50ms) to keep the terminal responsive.

### 4.3. Input Handling
*   **Global Shortcuts:** Use `useInput` hook at the App root level.
    *   `Tab`: Cycle focus between Panes.
    *   `Ctrl+P`: Open Command Palette (overlay).
    *   `Esc`: Cancel/Back.

## 5. "Vibe-Coding" Polish
*   **Gradients:** Use `ink-gradient` for headers (e.g., "OmniCode").
*   **Micro-Animations:** Use `ink-spinner` only for network handshakes, not for thinking.
*   **Sound (Optional):** Subtle beeps on error or completion (configurable).

## 6. Implementation Roadmap
1.  **Scaffold Layout:** Create the 3-pane `Flex` structure in `App.tsx`.
2.  **Migrate Chat:** Move existing chat logic into the Center Pane.
3.  **Build Context Well:** Connect to the `ContextManager` to list files in Left Pane.
4.  **Implement MCP Guard:** Create the Right Pane visualization for tool calls.
