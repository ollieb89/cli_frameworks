import { describe, it, expect, vi } from 'vitest';
import addCommand from './add.js';
import { ConfigManager } from '../../config/ConfigManager.js';

vi.mock('../../config/ConfigManager.js', () => ({
  ConfigManager: {
    getMcpConfig: vi.fn().mockReturnValue({ servers: {} }),
    saveMcpConfig: vi.fn()
  }
}));

describe('mcp:add command', () => {
  it('should add a new server to the config', async () => {
    const logSpy = vi.fn();
    const context = { log: logSpy, error: vi.fn() };
    
    // args: { _: ['add', 'my-server', 'npx', '@mcp/server-my'] }
    // Wait, parseCommand might pass args differently. 
    // In App.tsx: cmd.handler({ _: parsed.args }, context)
    await addCommand.handler({ _: ['my-server', 'npx', '@mcp/server-my'] }, context);
    
    expect(ConfigManager.saveMcpConfig).toHaveBeenCalledWith(expect.objectContaining({
      servers: expect.objectContaining({
        'my-server': expect.objectContaining({
          transport: 'stdio',
          command: 'npx'
        })
      })
    }));
    expect(logSpy).toHaveBeenCalledWith(expect.stringContaining('Successfully added MCP server: my-server'));
  });
});
