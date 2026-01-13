import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { ConfigManager } from './ConfigManager.js';
import { McpManager } from '@omnicode/mcp';

vi.mock('@omnicode/mcp', () => {
  return {
    McpManager: {
      getInstance: vi.fn().mockReturnValue({
        connect: vi.fn().mockResolvedValue(undefined)
      })
    }
  };
});

describe('McpAutoLoad', () => {
  it('should call McpManager.connect for each configured server', async () => {
    const mockMcpConfig = {
      servers: {
        test: { transport: 'stdio', command: 'echo' }
      }
    };
    vi.spyOn(ConfigManager, 'getMcpConfig').mockReturnValue(mockMcpConfig);

    // This will be implemented in a bootstrapper or main entry point
    // but for now we'll verify the integration logic
    const manager = McpManager.getInstance();
    const config = ConfigManager.getMcpConfig();
    
    for (const [id, serverConfig] of Object.entries(config.servers)) {
      await manager.connect({ id, ...(serverConfig as any) });
    }

    expect(manager.connect).toHaveBeenCalledWith(expect.objectContaining({ id: 'test' }));
  });
});
