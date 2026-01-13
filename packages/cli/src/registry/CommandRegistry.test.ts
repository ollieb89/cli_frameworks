import { describe, it, expect, beforeEach } from 'vitest';
import { CommandRegistry } from './CommandRegistry.js';
import { CommandDefinition } from './types.js';

describe('CommandRegistry', () => {
  const mockCommand: CommandDefinition = {
    namespace: 'test',
    name: 'run',
    description: 'Run test',
    handler: async (args, context) => {}
  };

  beforeEach(() => {
    CommandRegistry.clear();
  });

  it('should register and retrieve commands', () => {
    CommandRegistry.register(mockCommand);
    const retrieved = CommandRegistry.get('test', 'run');
    expect(retrieved).toBe(mockCommand);
  });

  it('should list all commands with metadata', () => {
    CommandRegistry.register(mockCommand);
    const all = CommandRegistry.list();
    expect(all).toHaveLength(1);
    expect(all[0]).toEqual(expect.objectContaining({
      namespace: 'test',
      name: 'run',
      description: 'Run test'
    }));
  });

  it('should handle aliases', () => {
    const aliasedCommand = { ...mockCommand, aliases: ['r'] };
    CommandRegistry.register(aliasedCommand);
    
    expect(CommandRegistry.get('test', 'r')).toBe(aliasedCommand);
  });
});
