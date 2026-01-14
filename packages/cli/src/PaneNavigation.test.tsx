import React from 'react';
import { render } from 'ink-testing-library';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { App } from './App.js';
import { useTUIStore } from './store/tuiStore.js';

// Mock CommandRegistry
vi.mock('./registry/CommandRegistry.js', () => ({
  CommandRegistry: {
    list: () => [],
    get: () => undefined,
    loadFrom: vi.fn()
  }
}));

// Mock ConfigManager
vi.mock('./config/ConfigManager.js', () => ({
  ConfigManager: {
    initialize: vi.fn(),
    getMcpConfig: () => ({ servers: {} })
  }
}));

// Mock Utils
vi.mock('./utils/ProviderFactory.js', () => ({ ProviderFactory: { createDefault: vi.fn() } }));
vi.mock('./utils/fuzzy.js', () => ({ fuzzyScore: () => 0 }));
vi.mock('./parser/CommandParser.js', () => ({ parseCommand: () => null }));

// Mock Panes and UI components
vi.mock('./ui/panes/LeftPane.js', () => ({ LeftPane: () => null }));
vi.mock('./ui/panes/CenterPane.js', () => ({ CenterPane: () => null }));
vi.mock('./ui/panes/RightPane.js', () => ({ RightPane: () => null }));
vi.mock('./ui/HelpSearch.js', () => ({ HelpSearch: () => null }));
vi.mock('./ui/ChatView.js', () => ({ ChatView: () => null }));
vi.mock('./ui/AutocompleteList.js', () => ({ AutocompleteList: () => null }));

// Mock ink
const { mockExit, inputCallbacks } = vi.hoisted(() => ({ 
    mockExit: vi.fn(),
    inputCallbacks: [] as any[]
}));

vi.mock('ink', async (importOriginal) => {
  const actual: any = await importOriginal();
  return {
    ...actual,
    useApp: () => ({ exit: mockExit }),
    useInput: (cb: any) => { 
        inputCallbacks.push(cb);
    },
    Text: () => null,
    Box: () => null,
  };
});

describe('Pane Navigation', () => {
  beforeEach(() => {
    inputCallbacks.length = 0;
    useTUIStore.setState({
      state: 'IDLE',
      activePane: 'center', // Default
      messages: [],
      input: '',
      history: []
    });
  });

  const triggerInput = (input: string, key: any = {}) => {
      inputCallbacks.forEach(cb => cb(input, key));
  };

  it.skip('should cycle panes on Tab press', () => {
    render(<App />);

    // Initial state
    expect(useTUIStore.getState().activePane).toBe('center');

    // Press Tab -> Right
    triggerInput('', { tab: true });
    expect(useTUIStore.getState().activePane).toBe('right');

    // Press Tab -> Left
    triggerInput('', { tab: true });
    expect(useTUIStore.getState().activePane).toBe('left');

    // Press Tab -> Center
    triggerInput('', { tab: true });
    expect(useTUIStore.getState().activePane).toBe('center');
  });
});
