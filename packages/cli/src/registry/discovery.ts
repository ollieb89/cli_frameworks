import fg from 'fast-glob';
import path from 'path';
import { CommandDefinition } from './types.js';

export async function discoverCommands(commandsDir: string): Promise<CommandDefinition[]> {
  const files = await fg('**/*.{ts,js}', { 
    cwd: commandsDir,
    absolute: true,
    ignore: ['**/*.test.{ts,js}', '**/*.d.ts']
  });

  // console.log(`Found ${files.length} potential command files in ${commandsDir}`);

  const commands: CommandDefinition[] = [];

  for (const file of files) {
    try {
      const module = await import(file);
      if (module.default && module.default.name && module.default.handler) {
         commands.push(module.default);
      } else {
          // console.warn(`File ${file} is not a valid command module (missing name or handler)`);
      }
    } catch (e) {
      // console.error(`Error loading command from ${file}:`, e);
    }
  }

  return commands;
}
