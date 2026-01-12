# Specification: Chat Interface & AI Streaming

## Objective
Provide a rich, interactive chat experience within the CLI that leverages the authenticated Gemini/OpenAI/Claude providers.

## Scope
1.  **AI Provider Integration:** Use stored OAuth tokens or API keys to initialize adapters.
2.  **Streaming:** Support character-by-character or chunk-by-chunk streaming of responses.
3.  **UI:** A dedicated Chat view (using Ink) that overlays or replaces the REPL during active sessions.
4.  **State:** Basic session-based history for multi-turn chat.

## Technical Details

### 1. Adapter Refactoring
- Ensure `ProviderAdapter` supports a `streamMessage(message, callback)` method.
- Update `GeminiAdapter` to use the Generative AI SDK's streaming capabilities (or the REST equivalent for OAuth).

### 2. UI Component (`ChatView.tsx`)
- Display user messages on the right, AI on the left (or distinct colors).
- Real-time text appending for the active AI stream.
- Keyboard shortcuts: `ESC` to exit, `ENTER` to send.

### 3. Command Integration (`/chat`)
- `/chat` starts a new session.
- Optional: `/chat --model gemini-1.5-pro`.
- Optional: `/chat:clear` to reset history.
