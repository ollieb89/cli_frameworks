import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { McpManager } from './McpManager.js';

// Mock the SDK
vi.mock('@modelcontextprotocol/sdk/client/index.js', () => {
  return {
    Client: vi.fn().mockImplementation(function() {
      return {
        connect: vi.fn().mockResolvedValue(undefined),
      };
    }),
  };
});

vi.mock('@modelcontextprotocol/sdk/client/stdio.js', () => {
  return {
    StdioClientTransport: vi.fn().mockImplementation(function() {
      return {};
    }),
  };
});

describe('McpManager', () => {
  let manager: McpManager;

  beforeEach(() => {
    manager = McpManager.getInstance();
  });

  afterEach(async () => {
    await manager.disconnectAll();
    vi.clearAllMocks();
  });

  it('should be a singleton', () => {
    const anotherManager = McpManager.getInstance();
    expect(manager).toBe(anotherManager);
  });

  it('should connect to a stdio server', async () => {
    const config = {
      id: 'test-server',
      transport: 'stdio' as const,
      command: 'node',
      args: ['server.js'],
    };

    await manager.connect(config);
    expect(manager.listServers()).toContain('test-server');
  });

  it('should not reconnect if already connected', async () => {
    const config = {
      id: 'test-server',
      transport: 'stdio' as const,
      command: 'node',
    };

    await manager.connect(config);
    await manager.connect(config);
    expect(manager.listServers().length).toBe(1);
  });
});
