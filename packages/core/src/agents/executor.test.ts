import { describe, it, expect, vi, beforeEach } from 'vitest';
import { AgentExecutor } from './executor.js';
import { AgentDefinition } from './schemas.js';

describe('AgentExecutor', () => {
  let mockProvider: any;
  const mockAgent: AgentDefinition = {
    id: 'test-agent',
    name: 'Test Agent',
    description: 'Desc',
    systemPrompt: 'SYSTEM_PROMPT',
    skills: ['s1'],
    commands: []
  };

  beforeEach(() => {
    mockProvider = {
      chat: vi.fn(),
      streamChat: vi.fn()
    };
  });

  it('should construct the full history with system instructions', async () => {
    const executor = new AgentExecutor(mockAgent, mockProvider);
    mockProvider.chat.mockResolvedValue({ role: 'assistant', content: 'Response' });

    await executor.execute('Hello');

    expect(mockProvider.chat).toHaveBeenCalledWith(
        expect.arrayContaining([
            { role: 'system', content: 'SYSTEM_PROMPT' },
            { role: 'user', content: 'Hello' }
        ]),
        expect.any(Array) // Contains INTERNAL_TOOLS
    );
  });

  it('should handle skill tool calls', async () => {
    const mockSkill = { 
        id: 's1', 
        name: 'S1', 
        content: 'Skill Content',
        tool: { name: 'use_skill_s1', description: 'D', parameters: { type: 'object', properties: {} } } 
    };
    const mockSkillMapper = {
        getSkill: vi.fn().mockReturnValue(mockSkill)
    };
    
    const executor = new AgentExecutor(mockAgent, mockProvider, mockSkillMapper as any);
    
    mockProvider.chat.mockResolvedValueOnce({
        role: 'assistant',
        content: '',
        toolCalls: [{ toolName: 'use_skill_s1', args: { query: 'test' } }]
    });
    mockProvider.chat.mockResolvedValueOnce({
        role: 'assistant',
        content: 'Final Answer'
    });

    const result = await executor.execute('Use skill s1');

    expect(result).toBe('Final Answer');
    expect(mockProvider.chat).toHaveBeenCalledTimes(2);
    // Verify tool result was added to history
    const history = executor.getHistory();
    expect(history).toContainEqual(expect.objectContaining({ 
        role: 'tool', 
        toolCallId: 'use_skill_s1',
        content: expect.stringContaining('Skill Content')
    }));
  });

  it('should stream responses via streamChat', async () => {
      const executor = new AgentExecutor(mockAgent, mockProvider);
      mockProvider.streamChat.mockImplementation(async (msgs: any, cb: any) => {
          cb({ text: 'Chunk 1', done: false });
          cb({ text: 'Chunk 2', done: false });
          cb({ text: '', done: true });
      });

      const chunks: string[] = [];
      await executor.stream('Stream me', (chunk) => chunks.push(chunk.text));

      expect(chunks).toEqual(['Chunk 1', 'Chunk 2', '']);
      expect(executor.getHistory()).toContainEqual({ role: 'assistant', content: 'Chunk 1Chunk 2' });
  });
});