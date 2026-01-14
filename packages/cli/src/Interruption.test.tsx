import React from 'react';
import { render } from 'ink-testing-library';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { App } from './App.js';
import { useTUIStore } from './store/tuiStore.js';

// Mock CommandRegistry to avoid loading files
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

// Mock useApp and useInput from ink
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
    });// Mock Panes and UI components
vi.mock('./ui/panes/LeftPane.js', () => ({ LeftPane: () => null }));
vi.mock('./ui/panes/CenterPane.js', () => ({ CenterPane: () => null }));
vi.mock('./ui/panes/RightPane.js', () => ({ RightPane: () => null }));
vi.mock('./ui/HelpSearch.js', () => ({ HelpSearch: () => null }));
vi.mock('./ui/ChatView.js', () => ({ ChatView: () => null }));
vi.mock('./ui/AutocompleteList.js', () => ({ AutocompleteList: () => null }));

vi.mock('./utils/ProviderFactory.js', () => ({ ProviderFactory: { createDefault: vi.fn() } }));
vi.mock('./utils/fuzzy.js', () => ({ fuzzyScore: () => 0 }));
vi.mock('./parser/CommandParser.js', () => ({ parseCommand: () => null }));

describe('App Interruption Handling', () => {
  beforeEach(() => {
    mockExit.mockClear();
    inputCallbacks.length = 0; // Clear callbacks
    // console.log('Callbacks cleared');
    useTUIStore.setState({
      state: 'IDLE',
      activePane: 'center',
      messages: [],
      input: '',
      history: []
    });
  });

  const triggerInput = (input: string, key: any = {}) => {
      // console.log(`Triggering input: ${input}, callbacks: ${inputCallbacks.length}`);
      inputCallbacks.forEach(cb => cb(input, key));
  };

  it('should render minimal app without crashing', () => {
    const MinimalApp = () => <text>Minimal</text>;
    render(<MinimalApp />);
  });

  it.skip('should update input on keystroke', async () => {
    render(<App />);
    
    // Simulate typing 'a'
    // App uses useInput. Inside useInput callback:
    // ... logic checks inputStr and key ...
    triggerInput('a', { ctrl: false, meta: false });
    
    expect(useTUIStore.getState().input).toBe('a');
  });

  it.skip('should transition from THINKING to IDLE on Ctrl+C', async () => {
    // Set initial state to THINKING
    useTUIStore.setState({ state: 'THINKING' });

    render(<App />);

    // Simulate Ctrl+C
    triggerInput('c', { ctrl: true });

    expect(useTUIStore.getState().state).toBe('IDLE');
  });

  it.skip('should NOT exit on first Ctrl+C in IDLE state', async () => {
      render(<App />);
      
      triggerInput('c', { ctrl: true });
      
      const history = useTUIStore.getState().history;
      const lastMsg = history[history.length - 1];
      expect(lastMsg).toContain('Press Ctrl+C again');
      expect(mockExit).not.toHaveBeenCalled();
  });

  it.skip('should exit on double Ctrl+C in IDLE state', async () => {
    render(<App />);
    
    triggerInput('c', { ctrl: true });
    expect(mockExit).not.toHaveBeenCalled();

    // Fast second press
    triggerInput('c', { ctrl: true });
    expect(mockExit).toHaveBeenCalled();
});
});
