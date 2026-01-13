import React from 'react';
import { render } from 'ink-testing-library';
import { describe, it, expect, vi } from 'vitest';
import { ToolApproval } from './ToolApproval.js';

describe('ToolApproval component', () => {
  it('should render tool name and server', () => {
    const onAction = vi.fn();
    const { lastFrame } = render(
      <ToolApproval 
        toolName="read_file" 
        serverId="filesystem" 
        args={{ path: 'test.txt' }} 
        onAction={onAction} 
      />
    );

    expect(lastFrame()).toContain('read_file');
    expect(lastFrame()).toContain('filesystem');
    expect(lastFrame()).toContain('test.txt');
  });
});
