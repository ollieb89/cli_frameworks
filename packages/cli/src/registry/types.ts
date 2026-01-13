export interface CommandArgument {
  name: string;
  description: string;
  required?: boolean;
}

export interface CommandContext {
  log: (message: string) => void;
  error: (message: string) => void;
}

export interface CommandDefinition {
  namespace: string;
  name: string;
  description: string;
  args?: CommandArgument[];
  handler: (args: Record<string, any>, context: CommandContext) => Promise<void>;
  aliases?: string[];
}