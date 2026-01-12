export interface ParsedCommand {
  namespace: string;
  command: string;
  args: string[];
  raw: string;
}

/**
 * Parses a command string in the format /namespace:command [args...]
 * Also supports /command [args...] which implies the 'global' namespace.
 */
export function parseCommand(input: string): ParsedCommand | null {
  const trimmed = input.trim();
  if (!trimmed.startsWith('/')) {
    return null;
  }

  // Regex to match /namespace:command
  const nsMatch = trimmed.match(/^\/([a-zA-Z0-9]+):([a-zA-Z0-9]+)(?:\s+(.*))?$/);
  if (nsMatch) {
    const [, namespace, command, rest] = nsMatch;
    const args = rest ? rest.split(/\s+/).filter(Boolean) : [];
    return {
      namespace,
      command,
      args,
      raw: trimmed
    };
  }

  // Regex to match /command (implicit global)
  const globalMatch = trimmed.match(/^\/([a-zA-Z0-9]+)(?:\s+(.*))?$/);
  if (globalMatch) {
    const [, command, rest] = globalMatch;
    // Ensure it's not just a slash followed by space
    if (!command) return null;
    
    const args = rest ? rest.split(/\s+/).filter(Boolean) : [];
    return {
      namespace: 'global',
      command,
      args,
      raw: trimmed
    };
  }

  return null;
}