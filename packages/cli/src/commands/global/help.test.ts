import { describe, it, expect, vi, beforeEach } from 'vitest';
import helpCommand from './help.js';
import { CommandRegistry } from '../../registry/CommandRegistry.js';

describe('Help Command (Table)', () => {
  beforeEach(() => {
    CommandRegistry.clear();
    CommandRegistry.register({
      namespace: 'test',
      name: 'cmd',
      description: 'Test command',
      handler: async () => {}
    });
  });

  it('should render a table with registered commands', async () => {
    const consoleSpy = vi.spyOn(console, 'log');
    await helpCommand.handler({});
    
    // Check if output contains headers and data
    expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('Namespace'));
    expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('Command'));
    expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('test'));
    expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('cmd'));
    
    consoleSpy.mockRestore();
  });
});
