# Implementation Plan: Command Autocomplete Popover

**Track ID:** `cmd_autocomplete_20260112`

## Phase 1: Foundation & Utilities
- [x] [bac9b0b] Task: Create fuzzy matching utility
    - [ ] Create `packages/cli/src/utils/fuzzy.ts`
    - [ ] Implement `fuzzyMatch(input: string, candidate: string): boolean`
    - [ ] Implement scoring/sorting logic (optional but recommended for better UX)
    - [ ] Unit Test: `packages/cli/src/utils/fuzzy.test.ts`
- [ ] Task: Update `CommandRegistry` to expose simplified list for UI
    - [ ] Ensure `CommandRegistry.list()` returns necessary metadata (name, namespace, description, args definition).
- [ ] Task: Conductor - User Manual Verification 'Phase 1: Foundation & Utilities' (Protocol in workflow.md)

## Phase 2: Autocomplete Component (TUI)
- [ ] Task: Create `AutocompleteList` component
    - [ ] Create `packages/cli/src/ui/AutocompleteList.tsx`
    - [ ] Props: `items: CommandDefinition[]`, `filter: string`, `onSelect: (cmd) => void`
    - [ ] Implement rendering loop with slice for max height (e.g., show top 5)
    - [ ] Add visual highlighting for active index
- [ ] Task: Conductor - User Manual Verification 'Phase 2: Autocomplete Component (TUI)' (Protocol in workflow.md)

## Phase 3: ChatView Integration
- [ ] Task: Integrate State in `ChatView.tsx`
    - [ ] Add state for `isAutocompleteOpen`
    - [ ] Add state for `selectedIndex`
    - [ ] Detect `/` input trigger in `useInput` or existing `TextInput` change handler
- [ ] Task: Handle Key Events
    - [ ] Intercept Up/Down arrows when autocomplete is open to change `selectedIndex`
    - [ ] Intercept Enter to trigger selection logic
- [ ] Task: Implement Selection Logic
    - [ ] Logic: Check if command has required args.
    - [ ] Case A (No Args): Call `handleSubmit` logic immediately with command string.
    - [ ] Case B (Args): Set `input` value to command string + space, close autocomplete.
- [ ] Task: Conductor - User Manual Verification 'Phase 3: ChatView Integration' (Protocol in workflow.md)

## Phase 4: Verification & Polish
- [ ] Task: Manual Verification
    - [ ] Verify popover appears on `/`
    - [ ] Verify fuzzy filtering works
    - [ ] Verify "Enter" behavior for both args and no-args commands
- [ ] Task: Run full test suite `pnpm test`
- [ ] Task: Conductor - User Manual Verification 'Phase 4: Verification & Polish' (Protocol in workflow.md)
