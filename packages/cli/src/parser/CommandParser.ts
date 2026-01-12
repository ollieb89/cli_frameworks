export interface ParsedCommand {
  namespace: string;
  command: string;
  args: string[];
  raw: string;
}

/**
 * Parses a command string in the format /namespace:command [args...]
 */
export function parseCommand(input: string): ParsedCommand | null {
  const trimmed = input.trim();
  if (!trimmed.startsWith('/')) {
    return null;
  }

  // Regex to match /namespace:command
  const match = trimmed.match(/^\/([a-zA-Z0-9]+):([a-zA-Z0-9]+)(?:\s+(.*))?$/);
  if (!match) {
    return null;
  }

  const [, namespace, command, rest] = match;
  const args = rest ? rest.split(/\s+/).filter(Boolean) : [];

  return {
    namespace,
    command,
    args,
    raw: trimmed
  };
}
