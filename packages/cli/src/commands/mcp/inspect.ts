import { CommandDefinition } from '../../registry/types.js';
import { McpManager } from '@gemini-cli/mcp';

const inspectCommand: CommandDefinition = {
  namespace: 'mcp',
  name: 'inspect',
  description: 'Inspect a specific MCP server for tools, resources, and prompts',
  args: [
    { name: 'serverId', description: 'The ID of the server to inspect', required: true }
  ],
  handler: async (args, context) => {
    const { serverId } = args;
    if (!serverId) {
      context.error('Usage: /mcp:inspect <serverId>');
      return;
    }

    const manager = McpManager.getInstance();
    
    try {
      context.log('🔍 Inspecting MCP Server: ' + serverId);
      context.log('-------------------');
      
      const tools = await manager.getTools(serverId);
      context.log('🛠️ Tools (' + tools.length + '):');
      tools.forEach(t => {
        context.log(' - ' + t.name + ': ' + (t.description || 'No description'));
      });
      
      const client = manager.getClient(serverId);
      if (client) {
        try {
          const resources = await client.listResources();
          context.log('\n📄 Resources (' + (resources.resources?.length || 0) + '):');
          resources.resources?.forEach(r => {
            context.log(' - ' + r.uri + ': ' + r.name);
          });
        } catch (e) {
          context.log('\n📄 Resources: Not supported or failed to list');
        }

        try {
          const prompts = await client.listPrompts();
          context.log('\n💡 Prompts (' + (prompts.prompts?.length || 0) + '):');
          prompts.prompts?.forEach(p => {
            context.log(' - ' + p.name + ': ' + (p.description || 'No description'));
          });
        } catch (e) {
          context.log('\n💡 Prompts: Not supported or failed to list');
        }
      }
      
      context.log('-------------------');
    } catch (error: any) {
      context.error('Failed to inspect server ' + serverId + ': ' + error.message);
    }
  }
};

export default inspectCommand;
