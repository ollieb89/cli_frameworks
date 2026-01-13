import { describe, it, expect, vi } from 'vitest';
import { McpToolAdapter } from './McpToolAdapter.js';
import { McpManager } from './McpManager.js';

vi.mock('./McpManager.js', () => ({
  McpManager: {
    getInstance: vi.fn().mockReturnValue({
      listServers: vi.fn().mockReturnValue(['server1']),
      getTools: vi.fn().mockResolvedValue([
        { name: 'read_file', description: 'Read a file', inputSchema: { type: 'object', properties: {} } }
      ]),
      callTool: vi.fn().mockResolvedValue({ content: 'test content' })
    })
  }
}));

describe('McpToolAdapter', () => {
  it('should aggregate tools from all servers', async () => {
    const tools = await McpToolAdapter.getAllTools();
    expect(tools.length).toBe(1);
    expect(tools[0].name).toBe('mcp__server1__read_file');
  });

  it('should check PolicyGate before executing tool', async () => {
    const mockPolicyGate = {
      check: vi.fn().mockResolvedValue('allow')
    };

    const normalizedName = 'mcp__server1__read_file';
    await McpToolAdapter.handleToolCall(normalizedName, { path: 'test.txt' }, mockPolicyGate as any);

    expect(mockPolicyGate.check).toHaveBeenCalledWith(expect.objectContaining({
      serverId: 'server1',
      toolName: 'read_file'
    }));
  });
});
