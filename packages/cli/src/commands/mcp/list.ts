import { CommandDefinition } from '../../registry/types.js';
import { McpManager } from '@omnicode/mcp';
import Table from 'cli-table3';

const listCommand: CommandDefinition = {
  namespace: 'mcp',
  name: 'list',
  description: 'List connected MCP servers and their status',
  handler: async (_args, context) => {
    const manager = McpManager.getInstance();
    const servers = manager.listServers();
    
    if (servers.length === 0) {
      context.log('No MCP servers connected.');
      return;
    }

    const table = new Table({
      head: ['Server ID', 'Status', 'Tools', 'Resources', 'Prompts'],
      style: { head: ['cyan'] }
    });

    for (const id of servers) {
      try {
        const tools = await manager.getTools(id);
        // For now, we only get tools. Resources and prompts can be added later or left as N/A
        table.push([id, '✅ Connected', `${tools.length} tools`, '-', '-']);
      } catch (error: any) {
        table.push([id, `❌ Error: ${error.message}`, '-', '-', '-']);
      }
    }

    context.log('\n📦 Connected MCP Servers:');
    context.log(table.toString());
  }
};

export default listCommand;
