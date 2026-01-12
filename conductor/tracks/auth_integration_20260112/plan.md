# Plan: Provider Authentication & Credential Management

## Phase 1: Config Persistence & Storage
- [ ] **Task: Implement File-based Config Persistence**
    - [ ] Subtask: Update `ConfigManager` to load/save from `~/.gemini/config.json`.
    - [ ] Subtask: Add `setSecret` / `getSecret` methods (abstracting storage).
    - [ ] Subtask: Test persistence across CLI restarts.

## Phase 2: Google OAuth Implementation
- [ ] **Task: OAuth Loopback Server**
    - [ ] Subtask: Add dependencies (`open`, `google-auth-library` or `http` logic).
    - [ ] Subtask: Implement `GoogleAuthProvider` class in `packages/core`.
    - [ ] Subtask: Create logic to launch browser and handle callback.
- [ ] **Task: Integration with GeminiAdapter**
    - [ ] Subtask: Update `GeminiAdapter` to accept OAuth tokens (or API keys derived from them).

## Phase 3: API Key Providers (OpenAI/Claude)
- [ ] **Task: Generic Key Provider**
    - [ ] Subtask: Implement logic to prompt for and validate API keys.
    - [ ] Subtask: Add simple validation endpoints (e.g., fetch models) to verify keys.

## Phase 4: CLI Commands & UI
- [ ] **Task: `/auth` Namespace**
    - [ ] Subtask: Implement `/auth:login`, `/auth:logout`, `/auth:status`.
    - [ ] Subtask: Create Interactive Login UI (Select provider list).
