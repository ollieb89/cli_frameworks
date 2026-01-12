import { describe, it, expect, vi, beforeEach } from 'vitest';
import configCommand from './config.js';
import { ConfigManager } from '../../config/ConfigManager.js';

describe('Config Command', () => {
  beforeEach(() => {
    ConfigManager.reset();
  });

  it('should list config', async () => {
    ConfigManager.set('foo', 'bar');
    const consoleSpy = vi.spyOn(console, 'log');
    await configCommand.handler({ _: ['list'] });
    expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('foo'));
    expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('bar'));
    consoleSpy.mockRestore();
  });

  it('should set config', async () => {
    await configCommand.handler({ _: ['set', 'color', 'blue'] });
    expect(ConfigManager.get('color')).toBe('blue');
  });

  it('should get config', async () => {
    ConfigManager.set('user', 'alice');
    const consoleSpy = vi.spyOn(console, 'log');
    await configCommand.handler({ _: ['get', 'user'] });
    expect(consoleSpy).toHaveBeenCalledWith('alice');
    consoleSpy.mockRestore();
  });
});
