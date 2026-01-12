export interface CommandArgument {
  name: string;
  description: string;
  required?: boolean;
}

export interface CommandDefinition {
  namespace: string;
  name: string;
  description: string;
  args?: CommandArgument[];
  handler: (args: Record<string, any>) => Promise<void>;
  aliases?: string[];
}
