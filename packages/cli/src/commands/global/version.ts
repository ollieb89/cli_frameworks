import { CommandDefinition } from '../../registry/types.js';
import { VERSION, APP_NAME } from '@gemini-cli/shared';

const versionCommand: CommandDefinition = {
  namespace: 'global',
  name: 'version',
  description: 'Displays the current version of the CLI suite',
  handler: async (args, context) => {
    context.log(`${APP_NAME} v${VERSION}`);
  }
};

export default versionCommand;
