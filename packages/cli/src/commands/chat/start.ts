import { CommandDefinition } from '../../registry/types.js';

const command: CommandDefinition = {
  namespace: 'chat',
  name: 'start',
  description: 'Start an interactive chat session with the default AI provider',
  aliases: ['chat'],
  handler: async () => {
    // This command is handled specially in App.tsx
    // because it requires switching the Ink UI mode.
  }
};

export default command;
