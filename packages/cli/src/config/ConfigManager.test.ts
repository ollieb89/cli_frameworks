import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { ConfigManager } from './ConfigManager.js';
import path from 'path';
import fs from 'fs';
import os from 'os';

vi.mock('os');

describe('ConfigManager', () => {
  let tempDir: string;

  beforeEach(() => {
    tempDir = '/tmp/omnicode-test-' + Date.now();
    vi.mocked(os.homedir).mockReturnValue(tempDir);
    if (fs.existsSync(tempDir)) {
      fs.rmSync(tempDir, { recursive: true, force: true });
    }
    ConfigManager.initialize();
  });

  afterEach(() => {
    if (fs.existsSync(tempDir)) {
      fs.rmSync(tempDir, { recursive: true, force: true });
    }
    vi.clearAllMocks();
  });

  it('should set and get values in memory', () => {
    ConfigManager.set('key', 'value');
    expect(ConfigManager.get('key')).toBe('value');
  });

  it('should persist values to disk', () => {
    ConfigManager.set('foo', 'bar');
    
    const configPath = path.join(tempDir, '.omnicode', 'config.json');
    expect(fs.existsSync(configPath)).toBe(true);
    
    const fileContent = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
    expect(fileContent.foo).toBe('bar');
  });

  it('should manage secrets', () => {
    ConfigManager.setSecret('apikey', '12345');
    expect(ConfigManager.getSecret('apikey')).toBe('12345');
    expect(ConfigManager.get('secrets.apikey')).toBe('12345');
  });
});