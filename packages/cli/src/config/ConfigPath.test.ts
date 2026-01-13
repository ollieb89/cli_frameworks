import { describe, it, expect } from 'vitest';
import { ConfigManager } from './ConfigManager.js';
import path from 'path';
import os from 'os';

describe('ConfigManager Paths', () => {
  it('should use .omnicode as the global config directory', () => {
    // @ts-ignore - accessing private method for testing
    const configDir = ConfigManager.getConfigDir();
    expect(configDir).toBe(path.join(os.homedir(), '.omnicode'));
  });

  it('should use .omnicode as the project config directory', () => {
    // @ts-ignore - accessing private method for testing
    const projectMcpPath = ConfigManager.getProjectMcpPath();
    expect(projectMcpPath).toBe(path.join(process.cwd(), '.omnicode', 'mcp.json'));
  });
});
