import { CommandDefinition } from '../../registry/types.js';
import { CommandRegistry } from '../../registry/CommandRegistry.js';
import Table from 'cli-table3';

const helpCommand: CommandDefinition = {
  namespace: 'global',
  name: 'help',
  description: 'Displays a list of available commands',
  aliases: ['h', '?'],
  handler: async (args, context) => {
    // TODO: Implement interactive search when -i flag is passed
    
    const commands = CommandRegistry.list();
    const table = new Table({
      head: ['Namespace', 'Command', 'Description'],
      colWidths: [15, 20, 50],
      wordWrap: true
    });

    for (const cmd of commands) {
      table.push([cmd.namespace, cmd.name, cmd.description]);
    }

    context.log(table.toString());
  }
};

export default helpCommand;
