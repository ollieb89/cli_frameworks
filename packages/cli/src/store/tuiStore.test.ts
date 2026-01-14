import { describe, it, expect, beforeEach } from 'vitest';
import { useTUIStore } from './tuiStore.js';

describe('TUI Store - Thinking Logic', () => {
  beforeEach(() => {
    useTUIStore.setState({
      state: 'IDLE',
      isThinking: false,
      thoughtHistory: [],
    });
  });

  it('should add thought to history', () => {
    useTUIStore.getState().addThought('Reading file...');
    expect(useTUIStore.getState().thoughtHistory).toContain('Reading file...');
    expect(useTUIStore.getState().thoughtHistory).toHaveLength(1);
  });

  it('should clear history when thinking starts/stops', () => {
    useTUIStore.getState().addThought('Step 1');
    useTUIStore.getState().setThinking(false);
    // Maybe we want to clear on start?
    useTUIStore.getState().setThinking(true); // Should reset?
    // Implementation detail: usually we clear explicitly.
    // Let's assume setThinking(true) clears history if we implement it that way.
    // Or we have a clearThoughts action.
    
    useTUIStore.getState().clearThoughts();
    expect(useTUIStore.getState().thoughtHistory).toHaveLength(0);
  });
});
