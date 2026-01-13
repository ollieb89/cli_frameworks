import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { ConfigManager } from './ConfigManager.js';
import fs from 'fs';
import os from 'os';

vi.mock('os');

describe('ConfigManager Environment Variables', () => {
  let tempDir: string;

  beforeEach(() => {
    tempDir = '/tmp/omnicode-test-' + Date.now();
    vi.mocked(os.homedir).mockReturnValue(tempDir);
    if (!fs.existsSync(tempDir)) {
      fs.mkdirSync(tempDir, { recursive: true });
    }
    // Clear process.env for tests
    delete process.env.OMNICODE_API_KEY;
    delete process.env.GEMINI_CLI_API_KEY;
  });

  afterEach(() => {
    if (fs.existsSync(tempDir)) {
      fs.rmSync(tempDir, { recursive: true, force: true });
    }
    delete process.env.OMNICODE_API_KEY;
    delete process.env.GEMINI_CLI_API_KEY;
  });

  it('should load OMNICODE_API_KEY from environment', () => {
    process.env.OMNICODE_API_KEY = 'omni-key-123';
    ConfigManager.initialize();
    expect(ConfigManager.getSecret('google.apiKey')).toBe('omni-key-123');
  });

  it('should NOT load GEMINI_CLI_API_KEY from environment', () => {
    process.env.GEMINI_CLI_API_KEY = 'gemini-key-123';
    ConfigManager.initialize();
    expect(ConfigManager.getSecret('google.apiKey')).toBeUndefined();
  });
});
