import React from 'react';
import { render } from 'ink-testing-library';
import { describe, it, expect, vi } from 'vitest';
import { MCPToolGuard } from './MCPToolGuard.js';

describe('MCPToolGuard', () => {
  it('should render tool request', () => {
    const { lastFrame } = render(
      <MCPToolGuard 
        activeTool={{ name: 'test-tool', args: { foo: 'bar' } }} 
        status="pending"
        isActive={true}
        onApprove={vi.fn()}
        onDeny={vi.fn()}
      />
    );

    expect(lastFrame()).toContain('APPROVAL REQUIRED');
    expect(lastFrame()).toContain('test-tool');
    expect(lastFrame()).toContain('foo');
  });

  it.skip('should handle approval input (y)', () => {
    const onApprove = vi.fn();
    const onDeny = vi.fn();
    const { stdin, lastFrame } = render(
      <MCPToolGuard 
        activeTool={{ name: 'test-tool', args: {} }} 
        status="pending"
        isActive={true}
        onApprove={onApprove}
        onDeny={onDeny}
      />
    );

    expect(lastFrame()).toContain('Press y to approve');
    
    stdin.write('y');
    expect(onApprove).toHaveBeenCalled();
    expect(onDeny).not.toHaveBeenCalled();
  });

  it.skip('should handle denial input (n)', () => {
    const onApprove = vi.fn();
    const onDeny = vi.fn();
    const { stdin } = render(
      <MCPToolGuard 
        activeTool={{ name: 'test-tool', args: {} }} 
        status="pending"
        isActive={true}
        onApprove={onApprove}
        onDeny={onDeny}
      />
    );

    stdin.write('n');
    expect(onDeny).toHaveBeenCalled();
    expect(onApprove).not.toHaveBeenCalled();
  });

  it('should ignore input if isActive is false', () => {
    const onApprove = vi.fn();
    const { stdin } = render(
      <MCPToolGuard 
        activeTool={{ name: 'test-tool', args: {} }} 
        status="pending"
        isActive={false}
        onApprove={onApprove}
        onDeny={vi.fn()}
      />
    );

    stdin.write('y');
    expect(onApprove).not.toHaveBeenCalled();
  });
});
