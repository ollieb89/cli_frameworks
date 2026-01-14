import { describe, it, expect } from 'vitest';
import { AgentSchema, SkillSchema, CommandSchema } from './schemas.js';

describe('Agent Definition Schemas', () => {
  describe('AgentSchema', () => {
    it('should validate a correct agent definition', () => {
      const validAgent = {
        id: 'test-agent',
        name: 'Test Agent',
        description: 'A test agent',
        systemPrompt: 'You are a test agent.',
        skills: ['skill-1', 'skill-2'],
        commands: ['cmd-1']
      };
      const result = AgentSchema.safeParse(validAgent);
      expect(result.success).toBe(true);
    });

    it('should fail if required fields are missing', () => {
      const invalidAgent = {
        name: 'Invalid Agent'
        // Missing id, description, systemPrompt
      };
      const result = AgentSchema.safeParse(invalidAgent);
      expect(result.success).toBe(false);
    });
  });

  describe('SkillSchema', () => {
    it('should validate a correct skill definition', () => {
      const validSkill = {
        id: 'test-skill',
        name: 'Test Skill',
        description: 'Does something useful',
        tool: {
            name: 'test_tool',
            description: 'A test tool',
            inputSchema: {
                type: 'object',
                properties: {
                    arg: { type: 'string' }
                }
            }
        }
      };
      const result = SkillSchema.safeParse(validSkill);
      expect(result.success).toBe(true);
    });
  });

    describe('CommandSchema', () => {
    it('should validate a correct command definition', () => {
      const validCommand = {
        id: 'test-cmd',
        name: 'Test Command',
        description: 'Runs a test workflow',
        workflow: [
            { step: 'action-1', params: {} },
            { step: 'action-2', params: { verbose: true } }
        ]
      };
      const result = CommandSchema.safeParse(validCommand);
      expect(result.success).toBe(true);
    });
  });
});
