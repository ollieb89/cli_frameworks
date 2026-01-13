import { describe, it, expect } from 'vitest';
import { PolicyGate } from './PolicyGate.js';

describe('PolicyGate', () => {
  it('should allow tools on the allowlist', async () => {
    const policy = {
      default: 'confirm' as const,
      allowlist: [
        { server: 'filesystem', tool: 'read_file' }
      ]
    };
    const gate = new PolicyGate(policy);

    const result = await gate.check({
      serverId: 'filesystem',
      toolName: 'read_file',
      args: {}
    });

    expect(result).toBe('allow');
  });

  it('should require confirmation for tools not on the allowlist if default is confirm', async () => {
    const policy = {
      default: 'confirm' as const,
      allowlist: []
    };
    const gate = new PolicyGate(policy);

    const result = await gate.check({
      serverId: 'filesystem',
      toolName: 'write_file',
      args: {}
    });

    expect(result).toBe('confirm');
  });

  it('should deny tools if default is deny', async () => {
    const policy = {
      default: 'deny' as const,
      allowlist: []
    };
    const gate = new PolicyGate(policy);

    const result = await gate.check({
      serverId: 'any',
      toolName: 'any',
      args: {}
    });

    expect(result).toBe('deny');
  });
});
