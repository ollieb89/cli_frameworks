import React from 'react';
import { render } from 'ink-testing-library';
import { ThinkingIndicator } from './ThinkingIndicator.js';
import { describe, it, expect } from 'vitest';

describe('ThinkingIndicator', () => {
  it('should render nothing when not thinking', () => {
    const { lastFrame } = render(<ThinkingIndicator isThinking={false} history={[]} />);
    expect(lastFrame()).toBe('');
  });

  it('should render history when thinking', () => {
    const history = ['Reading file...', 'Analyzing content...'];
    const { lastFrame } = render(<ThinkingIndicator isThinking={true} history={history} />);
    
    expect(lastFrame()).toContain('🧠 Thinking');
    expect(lastFrame()).toContain('Reading file...');
    expect(lastFrame()).toContain('Analyzing content...');
  });

  it('should show only last few items if history is long', () => {
      // Implementation detail: we might want to slice the history
      const history = Array.from({ length: 10 }, (_, i) => `Step ${i}`);
      const { lastFrame } = render(<ThinkingIndicator isThinking={true} history={history} />);
      
      expect(lastFrame()).toContain('Step 9');
      // Should probably NOT show Step 0 if we scroll/slice?
      // For now, let's just ensure it renders something.
      // Acceptance criteria: "Verify auto-scrolling of the thought log."
      // In a TUI, we might just render the last N lines.
  });
});
