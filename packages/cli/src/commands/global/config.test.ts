import { describe, it, expect, vi, beforeEach } from 'vitest';
import configCommand from './config.js';
import { ConfigManager } from '../../config/ConfigManager.js';

describe('Config Command', () => {
  beforeEach(() => {
    ConfigManager.reset();
  });

  it('should list config', async () => {
    ConfigManager.set('foo', 'bar');
    const logSpy = vi.fn();
    const context = { log: logSpy, error: vi.fn() };
    await configCommand.handler({ _: ['list'] }, context);
    expect(logSpy).toHaveBeenCalledWith(expect.stringContaining('foo'));
    expect(logSpy).toHaveBeenCalledWith(expect.stringContaining('bar'));
  });

  it('should set config', async () => {
    const logSpy = vi.fn();
    const context = { log: logSpy, error: vi.fn() };
    await configCommand.handler({ _: ['set', 'color', 'blue'] }, context);
    expect(ConfigManager.get('color')).toBe('blue');
  });

  it('should get config', async () => {
    ConfigManager.set('user', 'alice');
    const logSpy = vi.fn();
    const context = { log: logSpy, error: vi.fn() };
    await configCommand.handler({ _: ['get', 'user'] }, context);
    expect(logSpy).toHaveBeenCalledWith('alice');
  });
});