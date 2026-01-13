import { z } from 'zod';

export const mcpServerConfigSchema = z.object({
  transport: z.enum(['stdio', 'sse']),
  command: z.string().optional(),
  args: z.array(z.string()).optional(),
  url: z.string().optional(),
  env: z.record(z.string()).optional(),
  disabled: z.boolean().optional(),
});

export const mcpPolicyEntrySchema = z.object({
  server: z.string(),
  tool: z.string(),
});

export const mcpPolicySchema = z.object({
  default: z.enum(['allow', 'deny', 'confirm']),
  allowlist: z.array(mcpPolicyEntrySchema).optional(),
  denylist: z.array(mcpPolicyEntrySchema).optional(),
});

export const mcpConfigSchema = z.object({
  servers: z.record(mcpServerConfigSchema),
  policy: mcpPolicySchema.optional(),
});

export type McpConfig = z.infer<typeof mcpConfigSchema>;
