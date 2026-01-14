import { describe, it, expect, vi, beforeEach } from 'vitest';
import { AgentLoader } from './loader.js';
import fs from 'fs/promises';

vi.mock('fs/promises');

describe('AgentLoader', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should load and parse a valid agent markdown file', async () => {
    const mockContent = `---\nid: test-agent\nname: Test Agent\ndescription: A test agent\nskills:\n  - skill-1\ncommands:\n  - cmd-1\n---\nYou are a test agent.\nAnswer concisely.\n`;
    vi.mocked(fs.readFile).mockResolvedValue(mockContent);

    const agent = await AgentLoader.load('/path/to/agent.md');

    // Trim check for body is good practice
    expect(agent).toEqual({
      id: 'test-agent',
      name: 'Test Agent',
      description: 'A test agent',
      systemPrompt: 'You are a test agent.\nAnswer concisely.',
      skills: ['skill-1'],
      commands: ['cmd-1']
    });
  });

  it('should throw validation error for invalid schema', async () => {
    const mockContent = `---\nname: Invalid Agent\n---\nBody\n`;
    vi.mocked(fs.readFile).mockResolvedValue(mockContent);

    await expect(AgentLoader.load('/path/to/invalid.md')).rejects.toThrow();
  });
});
