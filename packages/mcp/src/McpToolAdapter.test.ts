import { describe, it, expect, vi } from 'vitest';
import { McpToolAdapter } from './McpToolAdapter.js';
import { McpManager } from './McpManager.js';

vi.mock('./McpManager.js', () => ({
  McpManager: {
    getInstance: vi.fn().mockReturnValue({
      listServers: vi.fn().mockReturnValue(['server1']),
      getTools: vi.fn().mockResolvedValue([
        { name: 'read_file', description: 'Read a file', inputSchema: { type: 'object', properties: {} } }
      ])
    })
  }
}));

describe('McpToolAdapter', () => {
  it('should aggregate tools from all servers', async () => {
    const tools = await McpToolAdapter.getAllTools();
    expect(tools.length).toBe(1);
    expect(tools[0].name).toBe('mcp__server1__read_file');
  });
});
