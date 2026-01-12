import { CommandDefinition } from '../../registry/types.js';
import { ConfigManager } from '../../config/ConfigManager.js';

const configCommand: CommandDefinition = {
  namespace: 'global',
  name: 'config',
  description: 'Manage CLI configuration',
  args: [
    { name: 'action', description: 'Action to perform (list, get, set)', required: true },
    { name: 'key', description: 'Configuration key', required: false },
    { name: 'value', description: 'Configuration value', required: false }
  ],
  handler: async (args) => {
    const subArgs = args._ || [];
    const action = subArgs[0];

    if (action === 'list') {
      console.log('Current Configuration:');
      console.log(JSON.stringify(ConfigManager.list(), null, 2));
    } else if (action === 'set') {
      const key = subArgs[1];
      const value = subArgs[2];
      if (key && value) {
        ConfigManager.set(key, value);
        console.log(`Set ${key}=${value}`);
      } else {
        console.error('Usage: /config set <key> <value>');
      }
    } else if (action === 'get') {
      const key = subArgs[1];
      if (key) {
        console.log(ConfigManager.get(key));
      } else {
        console.error('Usage: /config get <key>');
      }
    } else {
      console.error('Unknown action. Use list, get, or set.');
    }
  }
};

export default configCommand;
