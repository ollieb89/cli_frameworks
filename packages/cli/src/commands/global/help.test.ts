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
      handler: async (args, context) => {}
    });
  });

  it('should render a table with registered commands', async () => {
    const logSpy = vi.fn();
    const context = { log: logSpy, error: vi.fn() };
    await helpCommand.handler({}, context);
    
    // Check if output contains headers and data
    expect(logSpy).toHaveBeenCalledWith(expect.stringContaining('Namespace'));
    expect(logSpy).toHaveBeenCalledWith(expect.stringContaining('Command'));
    expect(logSpy).toHaveBeenCalledWith(expect.stringContaining('test'));
    expect(logSpy).toHaveBeenCalledWith(expect.stringContaining('cmd'));
  });
});
