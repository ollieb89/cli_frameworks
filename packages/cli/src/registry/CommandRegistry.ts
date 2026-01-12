import { CommandDefinition } from './types.js';
import { discoverCommands } from './discovery.js';

export class CommandRegistry {
  private static commands: Map<string, CommandDefinition> = new Map();
  private static aliases: Map<string, string> = new Map();

  static register(command: CommandDefinition) {
    const key = this.getKey(command.namespace, command.name);
    this.commands.set(key, command);

    if (command.aliases) {
      for (const alias of command.aliases) {
        this.aliases.set(this.getKey(command.namespace, alias), key);
      }
    }
  }

  static get(namespace: string, name: string): CommandDefinition | undefined {
    const key = this.getKey(namespace, name);
    if (this.commands.has(key)) {
      return this.commands.get(key);
    }
    
    // Check alias
    if (this.aliases.has(key)) {
      const realKey = this.aliases.get(key)!;
      return this.commands.get(realKey);
    }

    return undefined;
  }

  static list(): CommandDefinition[] {
    return Array.from(this.commands.values());
  }

  static clear() {
    this.commands.clear();
    this.aliases.clear();
  }

  static async loadFrom(path: string) {
    const commands = await discoverCommands(path);
    for (const cmd of commands) {
      this.register(cmd);
    }
  }

  private static getKey(namespace: string, name: string): string {
    return `${namespace}:${name}`;
  }
}
