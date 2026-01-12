import { describe, it, expect, vi } from 'vitest';
import versionCommand from './version.js';
import { VERSION, APP_NAME } from '@gemini-cli/shared';

describe('Version Command', () => {
  it('should have correct metadata', () => {
    expect(versionCommand.namespace).toBe('global');
    expect(versionCommand.name).toBe('version');
  });

  it('should print version info', async () => {
    const consoleSpy = vi.spyOn(console, 'log');
    await versionCommand.handler({});
    expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining(APP_NAME));
    expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining(VERSION));
    consoleSpy.mockRestore();
  });
});
