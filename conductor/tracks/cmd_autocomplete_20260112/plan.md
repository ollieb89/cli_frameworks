# Implementation Plan: Command Autocomplete Popover

**Track ID:** `cmd_autocomplete_20260112`

## Phase 1: Foundation & Utilities
- [x] [bac9b0b] Task: Create fuzzy matching utility
    - [x] Create `packages/cli/src/utils/fuzzy.ts`
    - [x] Implement `fuzzyMatch(input: string, candidate: string): boolean`
    - [x] Implement scoring/sorting logic (optional but recommended for better UX)
    - [x] Unit Test: `packages/cli/src/utils/fuzzy.test.ts`
- [x] [48c53b2] Task: Update `CommandRegistry` to expose simplified list for UI
    - [x] Ensure `CommandRegistry.list()` returns necessary metadata (name, namespace, description, args definition).
- [x] Task: Conductor - User Manual Verification 'Phase 1: Foundation & Utilities' (Protocol in workflow.md)

## Phase 2: Autocomplete Component (TUI)
- [x] [19d8e6c] Task: Create `AutocompleteList` component
    - [x] Create `packages/cli/src/ui/AutocompleteList.tsx`
    - [x] Props: `items: CommandDefinition[]`, `filter: string`, `onSelect: (cmd) => void`
    - [x] Implement rendering loop with slice for max height (e.g., show top 5)
    - [x] Add visual highlighting for active index
- [ ] Task: Conductor - User Manual Verification 'Phase 2: Autocomplete Component (TUI)' (Protocol in workflow.md)

## Phase 3: ChatView Integration
- [x] [e5b07b8] Task: Integrate State in `ChatView.tsx`
    - [x] Add state for `isAutocompleteOpen`
    - [x] Add state for `selectedIndex`
    - [x] Detect `/` input trigger in `useInput` or existing `TextInput` change handler
- [x] [e5b07b8] Task: Handle Key Events
    - [x] Intercept Up/Down arrows when autocomplete is open to change `selectedIndex`
    - [x] Intercept Enter to trigger selection logic
- [x] [e5b07b8] Task: Implement Selection Logic
    - [x] Logic: Check if command has required args.
    - [x] Case A (No Args): Call `handleSubmit` logic immediately with command string.
    - [x] Case B (Args): Set `input` value to command string + space, close autocomplete.
- [ ] Task: Conductor - User Manual Verification 'Phase 3: ChatView Integration' (Protocol in workflow.md)

## Phase 4: Verification & Polish
- [ ] Task: Manual Verification
    - [ ] Verify popover appears on `/`
    - [ ] Verify fuzzy filtering works
    - [ ] Verify "Enter" behavior for both args and no-args commands
- [ ] Task: Run full test suite `pnpm test`
- [ ] Task: Conductor - User Manual Verification 'Phase 4: Verification & Polish' (Protocol in workflow.md)
