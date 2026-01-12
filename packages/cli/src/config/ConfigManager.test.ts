import { describe, it, expect, beforeEach, vi } from 'vitest';
import { ConfigManager } from './ConfigManager.js';
import fs from 'fs/promises';

describe('ConfigManager', () => {
  beforeEach(() => {
    ConfigManager.reset();
  });

  it('should set and get values', () => {
    ConfigManager.set('key', 'value');
    expect(ConfigManager.get('key')).toBe('value');
  });

  it('should list all config', () => {
    ConfigManager.set('a', '1');
    ConfigManager.set('b', '2');
    expect(ConfigManager.list()).toEqual({ a: '1', b: '2' });
  });

  it('should return undefined for missing keys', () => {
    expect(ConfigManager.get('missing')).toBeUndefined();
  });
});
