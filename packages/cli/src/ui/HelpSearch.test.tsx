import React from 'react';
import { render } from 'ink-testing-library';
import { describe, it, expect } from 'vitest';
import { HelpSearch } from './HelpSearch.js';

describe('HelpSearch Component', () => {
  const mockCommands = [
    { namespace: 'test', name: 'cmd1', description: 'Command 1', handler: async () => {} },
    { namespace: 'dev', name: 'status', description: 'Show status', handler: async () => {} }
  ];

  it('should render all commands initially', () => {
    const { lastFrame } = render(<HelpSearch commands={mockCommands} />);
    expect(lastFrame()).toContain('cmd1');
    expect(lastFrame()).toContain('status');
  });

  // Interactive filtering is harder to test with ink-testing-library in this environment
  // but we can verify the initial state.
});
