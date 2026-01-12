import { describe, it, expect } from 'vitest';
import { parseCommand } from './CommandParser.js';

describe('CommandParser', () => {
  it('should parse namespace commands correctly', () => {
    const result = parseCommand('/dev:status arg1 arg2');
    expect(result).toEqual({
      namespace: 'dev',
      command: 'status',
      args: ['arg1', 'arg2'],
      raw: '/dev:status arg1 arg2'
    });
  });

  it('should return null for non-namespace commands', () => {
    const result = parseCommand('hello world');
    expect(result).toBeNull();
  });

  it('should handle commands without arguments', () => {
    const result = parseCommand('/chat:clear');
    expect(result).toEqual({
      namespace: 'chat',
      command: 'clear',
      args: [],
      raw: '/chat:clear'
    });
  });

  it('should handle malformed namespace commands', () => {
    expect(parseCommand('/:status')).toBeNull();
    expect(parseCommand('/dev:')).toBeNull();
  });
});
