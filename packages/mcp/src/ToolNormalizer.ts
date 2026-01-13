export interface NormalizedTool {
  name: string;
  description: string;
  parameters: {
    type: 'object';
    properties: Record<string, any>;
    required?: string[];
  };
  serverId: string;
  originalName: string;
}

export class ToolNormalizer {
  /**
   * Normalizes an MCP tool to the internal tool format.
   * Prefixes the name with 'mcp__{serverId}__' to avoid collisions.
   */
  public static normalize(serverId: string, mcpTool: any): NormalizedTool {
    return {
      name: `mcp__${serverId}__${mcpTool.name}`,
      description: mcpTool.description || '',
      parameters: {
        type: 'object',
        properties: mcpTool.inputSchema?.properties || {},
        required: mcpTool.inputSchema?.required || [],
      },
      serverId,
      originalName: mcpTool.name,
    };
  }

  /**
   * Reconstructs the serverId and original tool name from a normalized tool name.
   */
  public static denormalize(normalizedName: string): { serverId: string; originalName: string } {
    const parts = normalizedName.split('__');
    if (parts.length < 3 || parts[0] !== 'mcp') {
      throw new Error(`Invalid normalized tool name: ${normalizedName}`);
    }

    return {
      serverId: parts[1],
      originalName: parts.slice(2).join('__'),
    };
  }
}
