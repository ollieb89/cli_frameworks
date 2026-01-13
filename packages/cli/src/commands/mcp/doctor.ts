import { CommandDefinition } from '../../registry/types.js';
import { McpManager } from '@gemini-cli/mcp';
import os from 'os';

const doctorCommand: CommandDefinition = {
  namespace: 'mcp',
  name: 'doctor',
  description: 'Check the health of the MCP subsystem',
  handler: async (_args, context) => {
    context.log('🏥 MCP Health Check');
    context.log('-------------------');
    
    // Runtime Info
    context.log(`Node.js: ${process.version}`);
    context.log(`Platform: ${process.platform} (${os.arch()})`);
    
    // Manager Info
    const manager = McpManager.getInstance();
    const servers = manager.listServers();
    context.log(`Connected Servers: ${servers.length}`);
    
    if (servers.length > 0) {
      context.log('Servers:');
      servers.forEach(id => context.log(` - ${id}: ✅ Connected`));
    } else {
      context.log('⚠️ No servers connected. Check your mcp.json configuration.');
    }
    
    context.log('-------------------');
    context.log('✅ System ready.');
  }
};

export default doctorCommand;
