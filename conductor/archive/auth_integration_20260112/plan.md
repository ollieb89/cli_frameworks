# Plan: Provider Authentication & Credential Management

## Phase 1: Config Persistence & Storage
- [x] **Task: Implement File-based Config Persistence**
    - [x] Subtask: Update `ConfigManager` to load/save from `~/.gemini/config.json`.
    - [x] Subtask: Add `setSecret` / `getSecret` methods (abstracting storage).
    - [x] Subtask: Test persistence across CLI restarts.

## Phase 2: Google OAuth Implementation
- [x] **Task: OAuth Loopback Server**
    - [x] Subtask: Add dependencies (`open`, `google-auth-library` or `http` logic).
    - [x] Subtask: Implement `GoogleAuthProvider` class in `packages/core`.
    - [x] Subtask: Create logic to launch browser and handle callback.
- [x] **Task: Integration with GeminiAdapter**
    - [x] Subtask: Update `GeminiAdapter` to accept OAuth tokens (or API keys derived from them).

## Phase 3: API Key Providers (OpenAI/Claude)
- [x] **Task: Generic Key Provider**
    - [x] Subtask: Implement logic to prompt for and validate API keys.
    - [x] Subtask: Add simple validation endpoints (e.g., fetch models) to verify keys.

## Phase 4: CLI Commands & UI
- [x] **Task: `/auth` Namespace**
    - [x] Subtask: Implement `/auth:login`, `/auth:logout`, `/auth:status`.
    - [x] Subtask: Create Interactive Login UI (Select provider list).
