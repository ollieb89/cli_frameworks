# Specification: Provider Authentication & Credential Management

## Objective
Enable secure and user-friendly authentication for major AI providers (Google, OpenAI, Anthropic) directly within the CLI.

## Scope
1.  **Google (Gemini):** Implement an OAuth 2.0 Loopback flow to authenticate the user and obtain credentials.
2.  **OpenAI & Anthropic:** Implement a secure "login" prompt to accept and validate API Keys.
3.  **Storage:** Persist credentials securely on the local filesystem.
4.  **Interface:** Provide `/auth` namespace commands for managing sessions.

## Technical Architecture

### 1. Persistence Layer (`ConfigManager` Upgrade)
- **Current State:** In-memory only.
- **Requirement:** Persist configuration to `~/.gemini-cli/config.json` (or similar).
- **Security:** Sensitive values (tokens/keys) should ideally be stored in the system keychain (using `keytar` or similar) or, for MVP, in a restricted-permission file.
- **Decision:** For Phase 1, we will implement **Config Persistence** to a local JSON file.

### 2. Google OAuth Flow
- **Library:** `google-auth-library` or raw HTTP requests + `open`.
- **Flow:**
    1.  CLI generates an authorization URL.
    2.  Opens user's default browser.
    3.  User consents.
    4.  Redirects to `localhost:PORT`.
    5.  CLI captures auth code and exchanges for tokens.
    6.  Tokens are stored.

### 3. API Key Providers
- **Flow:**
    1.  User runs `/auth:login openai`.
    2.  CLI prompts (masked input) for API Key.
    3.  CLI performs a "dry run" validation request (e.g., list models).
    4.  If valid, key is stored.

## Commands (`/auth`)
- `/auth:login [provider]` - Start interactive login flow.
- `/auth:logout [provider]` - Remove credentials.
- `/auth:status` - List configured providers and connection status.
- `/auth:list` - Alias for status.

## UX Design
- **Interactive:** If `/auth:login` is run without args, show a selection list (Ink).
- **Feedback:** "Logging in to Google...", "Browser opened...", "Success! Welcome user@gmail.com".
