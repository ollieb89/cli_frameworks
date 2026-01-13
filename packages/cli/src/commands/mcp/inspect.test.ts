import { describe, it, expect, vi } from 'vitest';
import inspectCommand from './inspect.js';
import { McpManager } from '@gemini-cli/mcp';

vi.mock('@gemini-cli/mcp', () => ({
  McpManager: {
    getInstance: vi.fn().mockReturnValue({
      getTools: vi.fn().mockResolvedValue([{ name: 'tool1', description: 'desc1' }]),
      getClient: vi.fn().mockReturnValue({
        listResources: vi.fn().mockResolvedValue({ resources: [] }),
        listPrompts: vi.fn().mockResolvedValue({ prompts: [] })
      })
    })
  }
}));

describe('mcp:inspect command', () => {
  it('should inspect a specific server', async () => {
    const logSpy = vi.fn();
    const context = { log: logSpy, error: vi.fn() };
    await inspectCommand.handler({ serverId: 'test-server' }, context);
    
    expect(logSpy).toHaveBeenCalledWith(expect.stringContaining('Inspecting MCP Server: test-server'));
    expect(logSpy).toHaveBeenCalledWith(expect.stringContaining('tool1'));
  });

  it('should error if serverId is missing', async () => {
    const errorSpy = vi.fn();
    const context = { log: vi.fn(), error: errorSpy };
    await inspectCommand.handler({}, context);
    
    expect(errorSpy).toHaveBeenCalledWith(expect.stringContaining('Usage: /mcp:inspect <serverId>'));
  });
});
