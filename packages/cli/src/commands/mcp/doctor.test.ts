import { describe, it, expect, vi } from 'vitest';
import doctorCommand from './doctor.js';
import { McpManager } from '@gemini-cli/mcp';

vi.mock('@gemini-cli/mcp', () => ({
  McpManager: {
    getInstance: vi.fn().mockReturnValue({
      listServers: vi.fn().mockReturnValue(['test-server'])
    })
  }
}));

describe('mcp:doctor command', () => {
  it('should report system health and node version', async () => {
    const logSpy = vi.fn();
    const context = { log: logSpy, error: vi.fn() };
    await doctorCommand.handler({}, context);
    
    expect(logSpy).toHaveBeenCalledWith(expect.stringContaining('MCP Health Check'));
    expect(logSpy).toHaveBeenCalledWith(expect.stringContaining('Node.js:'));
    expect(logSpy).toHaveBeenCalledWith(expect.stringContaining('Connected Servers: 1'));
  });
});
