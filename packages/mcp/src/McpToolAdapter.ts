import { McpManager } from './McpManager.js';
import { ToolNormalizer, NormalizedTool } from './ToolNormalizer.js';
import { PolicyGate } from './PolicyGate.js';

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
   * Dispatches a tool call to the correct MCP server after checking policy.
   */
  public static async handleToolCall(
    normalizedName: string, 
    args: any, 
    policyGate?: PolicyGate
  ): Promise<any> {
    const { serverId, originalName } = ToolNormalizer.denormalize(normalizedName);
    
    if (policyGate) {
      const decision = await policyGate.check({
        serverId,
        toolName: originalName,
        args
      });

      if (decision === 'deny') {
        throw new Error(`Policy Denied: Tool ${originalName} on server ${serverId} is blocked.`);
      }

      if (decision === 'confirm') {
        // In the real app, this should trigger the TUI confirmation.
        // For now, if we reach here and it's confirm, we'll assume it needs handling at the UI layer.
        // But for the adapter, we throw to indicate it's not 'allow'ed yet.
        throw new Error(`CONFIRM_REQUIRED:${serverId}:${originalName}:${JSON.stringify(args)}`);
      }
    }

    const manager = McpManager.getInstance();
    return manager.callTool(serverId, originalName, args);
  }
}
