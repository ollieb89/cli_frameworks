import { describe, it, expect, vi, beforeEach } from 'vitest';
import { AgentRegistry } from './registry.js';
import { AgentLoader } from './loader.js';
import fs from 'fs/promises';
import path from 'path';
import glob from 'fast-glob';

vi.mock('fs/promises');
vi.mock('./loader.js');
vi.mock('fast-glob');

describe('AgentRegistry', () => {
  let registry: AgentRegistry;
  const mockBasePath = '/mock/agents';

  beforeEach(() => {
    registry = new AgentRegistry(mockBasePath);
    vi.clearAllMocks();
  });

  it('should register and retrieve an agent', () => {
    const agent = { id: 'test-agent', name: 'Test', description: 'D', systemPrompt: 'S' };
    registry.registerAgent(agent as any);
    expect(registry.getAgent('test-agent')).toEqual(agent);
  });

  it('should list all agents', () => {
    registry.registerAgent({ id: 'a1' } as any);
    registry.registerAgent({ id: 'a2' } as any);
    expect(registry.listAgents()).toHaveLength(2);
  });

  it('should scan directory and load agents from .md files using glob', async () => {
    vi.mocked(glob).mockResolvedValue(['agent1.md', 'agent2.md'] as any);

    const mockAgent1 = { id: 'agent1', name: 'Agent 1' };
    const mockAgent2 = { id: 'agent2', name: 'Agent 2' };

    vi.mocked(AgentLoader.load).mockImplementation(async (p) => {
        if (p.endsWith('agent1.md')) return mockAgent1 as any;
        if (p.endsWith('agent2.md')) return mockAgent2 as any;
        throw new Error('Unknown file');
    });

    await registry.scan();

    expect(glob).toHaveBeenCalled();
    expect(AgentLoader.load).toHaveBeenCalledTimes(2);
    expect(registry.getAgent('agent1')).toEqual(mockAgent1);
    expect(registry.getAgent('agent2')).toEqual(mockAgent2);
  });
});
