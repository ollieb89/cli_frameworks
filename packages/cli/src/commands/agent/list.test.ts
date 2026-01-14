import { describe, it, expect, vi } from 'vitest';
import listCommand from './list.js';

vi.mock('@omnicode/core', () => {
  return {
    AgentRegistry: class {
      scan = vi.fn().mockResolvedValue(undefined);
      listAgents = vi.fn().mockReturnValue([
          { id: 'agent1', name: 'Agent 1', description: 'Desc 1' }
      ]);
    }
  };
});

describe('agent:list command', () => {
  it('should list available agents', async () => {
    const logSpy = vi.fn();
    const context = { log: logSpy, error: vi.fn() };
    await listCommand.handler({}, context);
    
    expect(logSpy).toHaveBeenCalledWith(expect.stringContaining('Available Agents'));
    expect(logSpy).toHaveBeenCalledWith(expect.stringContaining('agent1'));
    expect(logSpy).toHaveBeenCalledWith(expect.stringContaining('Agent 1'));
  });
});
