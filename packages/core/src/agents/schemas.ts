import { z } from 'zod';

// Define the schema for a Tool definition (simplified MCP tool structure)
const ToolSchema = z.object({
    name: z.string(),
    description: z.string(),
    inputSchema: z.object({
        type: z.string(),
        properties: z.any().optional(),
        required: z.array(z.string()).optional()
    }).passthrough()
});

// Define the schema for a Skill
export const SkillSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  content: z.string().optional(),
  tool: ToolSchema
});


export type SkillDefinition = z.infer<typeof SkillSchema>;

// Define the schema for a Workflow Step
const WorkflowStepSchema = z.object({
    step: z.string(),
    params: z.record(z.any()).optional()
});

// Define the schema for a Command
export const CommandSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  workflow: z.array(WorkflowStepSchema)
});

export type CommandDefinition = z.infer<typeof CommandSchema>;

// Define the schema for an Agent
export const AgentSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  systemPrompt: z.string(),
  skills: z.array(z.string()).optional(), // IDs of skills
  commands: z.array(z.string()).optional() // IDs of commands
});

export type AgentDefinition = z.infer<typeof AgentSchema>;
