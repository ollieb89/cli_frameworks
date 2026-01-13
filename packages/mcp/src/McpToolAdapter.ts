import { McpManager } from './McpManager.js';
import { ToolNormalizer, NormalizedTool } from './ToolNormalizer.js';

export class McpToolAdapter {
  /**
   * Aggregates tools from all currently connected MCP servers.
   */
  public static async getAllTools(): Promise<NormalizedTool[]> {
    const manager = McpManager.getInstance();
    const serverIds = manager.listServers();
    const allTools: NormalizedTool[] = [];

    for (const serverId of serverIds) {
      try {
        const mcpTools = await manager.getTools(serverId);
        for (const mcpTool of mcpTools) {
          allTools.push(ToolNormalizer.normalize(serverId, mcpTool));
        }
      } catch (error) {
        console.warn(`Failed to fetch tools from MCP server ${serverId}:`, error);
      }
    }

    return allTools;
  }

  /**
   * Dispatches a tool call to the correct MCP server.
   */
  public static async handleToolCall(normalizedName: string, args: any): Promise<any> {
    const { serverId, originalName } = ToolNormalizer.denormalize(normalizedName);
    const manager = McpManager.getInstance();
    return manager.callTool(serverId, originalName, args);
  }
}
