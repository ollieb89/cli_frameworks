# Spec: OmniCode TUI Components

## 1. Global State (`store/tuiStore.ts`)
Using `zustand` for high-performance transient updates.

```typescript
interface TUIState {
  // Layout
  activePane: 'left' | 'center' | 'right';
  setActivePane: (pane: 'left' | 'center' | 'right') => void;

  // Context (Left Pane)
  contextFiles: string[];
  setContextFiles: (files: string[]) => void;

  // Chat (Center Pane)
  messages: ChatMessage[];
  addMessage: (msg: ChatMessage) => void;
  isThinking: boolean;
  thinkingStep: string; // "Reading file..."

  // Tools (Right Pane)
  activeTool: ToolCall | null;
  toolStatus: 'pending' | 'running' | 'success' | 'error';
}
```

## 2. Layout Structure (`App.tsx`)

```tsx
<Box flexDirection="row" height="100%">
  <LeftPane width="25%" />
  <CenterPane width="50%" />
  <RightPane width="25%" />
</Box>
```

## 3. Component Details

### `LeftPane`
- **Imports:** `Box`, `Text` (Ink), `File` (Lucide).
- **Behavior:** Lists files. truncates long paths.
- **Style:** Blue border.

### `CenterPane`
- **Imports:** `Box`, `Static`, `TextInput`.
- **Behavior:**
    - Uses `<Static>` for history (performance).
    - Uses `<Box>` for the active streaming message.
    - Input stays fixed at bottom.

### `RightPane`
- **Imports:** `Box`, `Text`.
- **Behavior:**
    - Shows "No Active Tool" when idle.
    - When `activeTool` is set, shows tool name, args (JSON preview), and status.
    - Flashes Green on success, Red on error.

## 4. Typography & Icons
- **Header:** Gradient Text ("OmniCode").
- **Icons:** `lucide-react` (need to check compatibility with Ink, might need a wrapper or plain text fallback if SVG rendering is an issue in specific terminals, but Ink supports custom rendering).
    - *Fallback:* Use Emoji if Lucide is too heavy/incompatible for raw text terminals.
    - *Decision:* Use Emojis for V1 reliability (📂, 🧠, 🛠️).
