import { describe, it, expect } from 'vitest';
import { ToolNormalizer } from './ToolNormalizer.js';

describe('ToolNormalizer', () => {
  it('should normalize an MCP tool to internal format', () => {
    const mcpTool = {
      name: 'read_file',
      description: 'Read a file from disk',
      inputSchema: {
        type: 'object',
        properties: {
          path: { type: 'string', description: 'Path to the file' },
        },
        required: ['path'],
      },
    };

    const serverId = 'filesystem';
    const normalized = ToolNormalizer.normalize(serverId, mcpTool);

    expect(normalized.name).toBe('mcp__filesystem__read_file');
    expect(normalized.description).toBe('Read a file from disk');
    expect(normalized.parameters).toBeDefined();
    expect(normalized.parameters.properties.path).toBeDefined();
  });

  it('should denormalize a tool name correctly', () => {
    const normalizedName = 'mcp__filesystem__read_file';
    const { serverId, originalName } = ToolNormalizer.denormalize(normalizedName);

    expect(serverId).toBe('filesystem');
    expect(originalName).toBe('read_file');
  });

  it('should handle tool names with multiple underscores', () => {
    const normalizedName = 'mcp__git__list_untracked_files';
    const { serverId, originalName } = ToolNormalizer.denormalize(normalizedName);

    expect(serverId).toBe('git');
    expect(originalName).toBe('list_untracked_files');
  });
});
