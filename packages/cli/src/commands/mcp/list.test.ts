import { describe, it, expect, vi } from 'vitest';
import listCommand from './list.js';
import { McpManager } from '@omnicode/mcp';

vi.mock('@omnicode/mcp', () => ({
  McpManager: {
    getInstance: vi.fn().mockReturnValue({
      listServers: vi.fn().mockReturnValue(['test-server']),
      getTools: vi.fn().mockResolvedValue([{ name: 'tool1' }, { name: 'tool2' }])
    })
  }
}));

describe('mcp:list command', () => {
  it('should list connected servers and tool counts', async () => {
    const logSpy = vi.fn();
    const context = { log: logSpy, error: vi.fn() };
    await listCommand.handler({}, context);
    
    expect(logSpy).toHaveBeenCalledWith(expect.stringContaining('Connected MCP Servers'));
    expect(logSpy).toHaveBeenCalledWith(expect.stringContaining('test-server'));
    expect(logSpy).toHaveBeenCalledWith(expect.stringContaining('2 tools'));
  });
});
