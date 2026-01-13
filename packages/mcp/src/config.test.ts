import { describe, it, expect } from 'vitest';
import { mcpConfigSchema } from './config.js';

describe('MCP Configuration Schema', () => {
  it('should validate a correct configuration', () => {
    const config = {
      servers: {
        filesystem: {
          transport: 'stdio',
          command: 'npx',
          args: ['@modelcontextprotocol/server-filesystem'],
        }
      },
      policy: {
        default: 'confirm',
        allowlist: [
          { server: 'filesystem', tool: 'read_file' }
        ]
      }
    };

    const result = mcpConfigSchema.safeParse(config);
    expect(result.success).toBe(true);
  });

  it('should fail on invalid transport', () => {
    const config = {
      servers: {
        bad: {
          transport: 'invalid',
          command: 'echo'
        }
      }
    };

    const result = mcpConfigSchema.safeParse(config);
    expect(result.success).toBe(false);
  });
});
