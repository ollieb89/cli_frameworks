import { CommandDefinition } from '../../registry/types.js';
import { ConfigManager } from '../../config/ConfigManager.js';

const addCommand: CommandDefinition = {
  namespace: 'mcp',
  name: 'add',
  description: 'Add a new MCP server to your project configuration',
  args: [
    { name: 'serverId', description: 'ID for the new server', required: true },
    { name: 'command', description: 'Command to run the server (e.g., npx)', required: true },
    { name: 'args', description: 'Arguments for the command', required: false }
  ],
  handler: async (args, context) => {
    // args._ contains the positional arguments
    const positional = args._ || [];
    if (positional.length < 2) {
      context.error('Usage: /mcp:add <serverId> <command> [args...]');
      return;
    }

    const [serverId, command, ...serverArgs] = positional;
    const config = ConfigManager.getMcpConfig();
    
    const newServer = {
      transport: 'stdio' as const,
      command,
      args: serverArgs,
      autoStart: true
    };

    const newConfig = {
      ...config,
      servers: {
        ...(config.servers || {}),
        [serverId]: newServer
      }
    };

    ConfigManager.saveMcpConfig(newConfig);
    context.log(`✅ Successfully added MCP server: ${serverId}`);
    context.log('Restart the CLI to connect to the new server.');
  }
};

export default addCommand;
