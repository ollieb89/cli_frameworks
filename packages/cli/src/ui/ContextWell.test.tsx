import React from 'react';
import { render } from 'ink-testing-library';
import { describe, it, expect, vi } from 'vitest';
import { ContextWell } from './ContextWell.js';

describe('ContextWell', () => {
  it('should render empty state', () => {
    const { lastFrame } = render(<ContextWell files={[]} isActive={false} selectedIndex={0} onSelect={vi.fn()} />);
    expect(lastFrame()).toContain('No files in context');
  });

  it.skip('should render files', () => {
    const files = ['file1.ts', 'file2.ts'];
    const { lastFrame } = render(<ContextWell files={files} isActive={false} selectedIndex={0} onSelect={vi.fn()} />);
    expect(lastFrame()).toContain('file1.ts');
    expect(lastFrame()).toContain('file2.ts');
  });

  it('should highlight selected file when active', () => {
    const files = ['file1.ts', 'file2.ts'];
    const { lastFrame } = render(<ContextWell files={files} isActive={true} selectedIndex={1} onSelect={vi.fn()} />);
    
    // Check for highlight (cyan color or indicator)
    // Testing colors in ink-testing-library can be tricky with ANSI codes.
    // We can check if the output contains the indicator we choose (e.g. '>')
    // Assuming implementation uses '>' for selected.
    expect(lastFrame()).toContain('> file2.ts');
  });
});
