# Specification: Command Autocomplete Popover

**Track ID:** `cmd_autocomplete_20260112`
**Type:** Feature
**Status:** Approved

## 1. Overview
Enhance the `ChatView` component to provide a real-time command autocomplete experience. When a user begins their input with the `/` character, a popover menu should appear displaying available commands from the `CommandRegistry`, along with their descriptions.

## 2. Functional Requirements

### 2.1 Trigger & Visibility
- The autocomplete menu MUST appear when the input starts with `/`.
- The menu MUST disappear if the user deletes the leading `/` or presses `Esc`.
- The menu MUST be positioned inline, directly above the text input area.

### 2.2 Presentation
- Each list item MUST display the full command name (formatted as `namespace:command`) and its description.
- The currently selected item MUST be visually highlighted.
- The list should be limited to a maximum height (e.g., 5-8 items) with scrolling if more matches exist.

### 2.3 Filtering Logic
- Matches MUST be filtered in real-time as the user types after the `/`.
- Filtering MUST use fuzzy matching against the command name, namespace, and defined aliases.

### 2.4 Interaction & Navigation
- **Arrow Keys**: `Up` and `Down` keys navigate the selection within the list.
- **Tab**: Cycles through the filtered options.
- **Enter (Selection)**:
    - **Context-Aware Action**:
        - If the command requires no arguments, it MUST execute immediately.
        - If the command requires arguments, it MUST autofill the input field with the command name (e.g., `/global:config `) and maintain focus for the user to type further.

## 3. Technical Requirements
- **Registry Integration**: Use `CommandRegistry.list()` to source the command data.
- **TUI Framework**: Implement using `Ink` components. This will require managing focus/key-interception manually or using a specialized component if available.
- **Fuzzy Matching**: Implement a simple fuzzy match utility or use a lightweight library.

## 4. Acceptance Criteria
- [ ] Typing `/` in the chat input opens the autocomplete list.
- [ ] Typing `/he` filters the list down to commands matching "he" (e.g., `/global:help`).
- [ ] Navigating with arrow keys updates the highlighted selection.
- [ ] Pressing `Enter` on a command with no arguments (like `/global:version`) executes it immediately.
- [ ] Pressing `Enter` on a command needing arguments (like `/global:config`) fills the input and keeps the cursor active.

## 5. Out of Scope
- Autocompleting command arguments (e.g., specific config keys or file paths).
- Deep customization of the autocomplete theme (standard cyan/gray palette).
