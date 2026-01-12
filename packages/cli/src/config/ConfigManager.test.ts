import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { ConfigManager } from './ConfigManager.js';
import path from 'path';
import fs from 'fs';
import os from 'os';

describe('ConfigManager', () => {
  const tempDir = path.join(os.tmpdir(), 'gemini-cli-test-' + Date.now());
  const tempConfigPath = path.join(tempDir, 'config.json');

  beforeEach(() => {
    // Redirect ConfigManager to a temp path
    ConfigManager._setConfigPath(tempConfigPath);
    // Ensure clean state
    if (fs.existsSync(tempDir)) {
      fs.rmSync(tempDir, { recursive: true, force: true });
    }
    // We can't use ConfigManager.reset() normally because it tries to write to the path immediately,
    // which is fine, but we want to start fresh.
    // However, reset() clears the in-memory config and tries to save (creating the empty file).
    ConfigManager.reset(); 
  });

  afterEach(() => {
    if (fs.existsSync(tempDir)) {
      fs.rmSync(tempDir, { recursive: true, force: true });
    }
  });

  it('should set and get values in memory', () => {
    ConfigManager.set('key', 'value');
    expect(ConfigManager.get('key')).toBe('value');
  });

  it('should persist values to disk', () => {
    ConfigManager.set('foo', 'bar');
    
    // Verify file exists
    expect(fs.existsSync(tempConfigPath)).toBe(true);
    
    // Read file manually
    const fileContent = JSON.parse(fs.readFileSync(tempConfigPath, 'utf-8'));
    expect(fileContent).toEqual({ foo: 'bar' });
  });

  it('should load values from disk on initialize', () => {
    // Pre-create file
    fs.mkdirSync(tempDir, { recursive: true });
    fs.writeFileSync(tempConfigPath, JSON.stringify({ saved: 'data' }));
    
    // Initialize (reloads from disk)
    ConfigManager.initialize();
    
    expect(ConfigManager.get('saved')).toBe('data');
  });

  it('should manage secrets', () => {
    ConfigManager.setSecret('apikey', '12345');
    expect(ConfigManager.getSecret('apikey')).toBe('12345');
    // Verify it's stored in config under secrets namespace
    expect(ConfigManager.get('secrets.apikey')).toBe('12345');
  });
});