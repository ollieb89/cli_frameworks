import { describe, it, expect, vi } from 'vitest';
import versionCommand from './version.js';
import { VERSION, APP_NAME } from '@omnicode/shared';

describe('Version Command', () => {
  it('should have correct metadata', () => {
    expect(versionCommand.namespace).toBe('global');
    expect(versionCommand.name).toBe('version');
  });

  it('should print version info', async () => {
    const logSpy = vi.fn();
    const context = { log: logSpy, error: vi.fn() };
    await versionCommand.handler({}, context);
    expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(APP_NAME));
    expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(VERSION));
  });
});
