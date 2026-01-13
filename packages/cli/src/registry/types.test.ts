import { describe, it, expectTypeOf } from 'vitest';
import type { CommandDefinition, CommandArgument } from './types.js';

describe('Command Interfaces', () => {
  it('should match the expected CommandDefinition structure', () => {
    // Compile-time check to ensure interface matches requirements
    const mockCommand: CommandDefinition = {
      namespace: 'test',
      name: 'mock',
      description: 'A mock command',
      args: [
        { name: 'arg1', description: 'Argument 1', required: true }
      ],
      handler: async (args, context) => {
        context.log(String(args));
      }
    };

    expectTypeOf(mockCommand).toMatchTypeOf<CommandDefinition>();
    expectTypeOf(mockCommand.namespace).toBeString();
    expectTypeOf(mockCommand.handler).toBeFunction();
  });
});
