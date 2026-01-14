import { describe, it, expect, vi } from 'vitest';
import runCommand from './run.js';

vi.mock('@omnicode/core', () => {
  return {
    AgentRegistry: class {
      scan = vi.fn().mockResolvedValue(undefined);
      getAgent = vi.fn().mockReturnValue({ id: 'agent1', name: 'Agent 1' });
    },
    AgentExecutor: class {
      execute = vi.fn().mockResolvedValue('Agent Response');
    },
    SkillMapper: class {
      scan = vi.fn().mockResolvedValue(undefined);
    },
    ProviderRegistry: {
      getDefault: vi.fn().mockReturnValue({
          chat: vi.fn()
      })
    }
  };
});

describe('agent:run command', () => {
  it('should run an agent and log response', async () => {
    const logSpy = vi.fn();
    const context = { log: logSpy, error: vi.fn() };
    await runCommand.handler({ agentId: 'agent1', task: 'Test task' }, context);
    
    expect(logSpy).toHaveBeenCalledWith(expect.stringContaining('Running agent "Agent 1"'));
    expect(logSpy).toHaveBeenCalledWith(expect.stringContaining('Agent Response'));
  });
});
