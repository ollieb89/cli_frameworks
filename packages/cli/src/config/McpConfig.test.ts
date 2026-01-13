import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import fs from 'fs';
import path from 'path';
import os from 'os';
import { ConfigManager } from './ConfigManager.js';

vi.mock('fs');
vi.mock('os');

describe('ConfigManager - Hierarchical MCP Config', () => {
  const mockHomedir = '/home/user';
  const mockCwd = '/project';

  beforeEach(() => {
    vi.mocked(os.homedir).mockReturnValue(mockHomedir);
    vi.mocked(fs.existsSync).mockReturnValue(false);
    vi.spyOn(process, 'cwd').mockReturnValue(mockCwd);
    (ConfigManager as any).resetMcp();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should load global mcp.json', () => {
    const globalPath = path.join(mockHomedir, '.gemini-cli', 'mcp.json');
    const globalConfig = {
      servers: { global: { transport: 'stdio', command: 'echo' } }
    };

    vi.mocked(fs.existsSync).mockImplementation((p) => p === globalPath);
    vi.mocked(fs.readFileSync).mockImplementation((p) => {
      if (p === globalPath) return JSON.stringify(globalConfig);
      return '';
    });

    ConfigManager.initialize();
    const config = ConfigManager.getMcpConfig();
    expect(config.servers.global).toBeDefined();
  });

  it('should merge project mcp.json into global', () => {
    const globalPath = path.join(mockHomedir, '.gemini-cli', 'mcp.json');
    const projectPath = path.join(mockCwd, '.gemini', 'mcp.json');
    
    const globalConfig = {
      servers: { global: { transport: 'stdio', command: 'echo' } }
    };
    const projectConfig = {
      servers: { project: { transport: 'stdio', command: 'ls' } }
    };

    vi.mocked(fs.existsSync).mockImplementation((p) => p === globalPath || p === projectPath);
    vi.mocked(fs.readFileSync).mockImplementation((p) => {
      if (p === globalPath) return JSON.stringify(globalConfig);
      if (p === projectPath) return JSON.stringify(projectConfig);
      return '';
    });

    ConfigManager.initialize();
    const config = ConfigManager.getMcpConfig();
    expect(config.servers.global).toBeDefined();
    expect(config.servers.project).toBeDefined();
  });
});