# AI Model Standards

**Rule:** Always check for and use the latest available AI models from all providers in the standard workflow. Do not use deprecated versions.

## Current Standards (as of Jan 2026)
- **Gemini:** Defaults must be `gemini-3.0-flash` (fast) or `gemini-3.0-pro` (reasoning). Avoid 1.5 series.
- **Claude:** Use latest available (e.g., 3.5 Sonnet/Opus).
- **General:** When implementing new providers or updating existing ones, verify the "latest" tag or version documentation first.