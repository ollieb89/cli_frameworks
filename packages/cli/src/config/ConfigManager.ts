import fs from 'fs';
import path from 'path';
import os from 'os';

export class ConfigManager {
  private static config: Record<string, any> = {};
  private static mcpConfig: Record<string, any> = { servers: {}, policy: { default: 'confirm' } };
  
  private static getConfigDir() {
    return path.join(os.homedir(), '.omnicode');
  }

  private static getConfigPath() {
    return path.join(this.getConfigDir(), 'config.json');
  }

  private static getGlobalMcpPath() {
    return path.join(this.getConfigDir(), 'mcp.json');
  }

  private static getProjectMcpPath() {
    return path.join(process.cwd(), '.omnicode', 'mcp.json');
  }

  static initialize() {
    this.load();
    this.loadMcp();
  }

  static set(key: string, value: any) {
    this.config[key] = value;
    this.save();
  }

  static get(key: string): any {
    return this.config[key];
  }

  static getMcpConfig(): any {
    return this.mcpConfig;
  }

  static saveMcpConfig(config: any) {
    try {
      this.mcpConfig = config;
      const projectPath = this.getProjectMcpPath();
      const projectDir = path.dirname(projectPath);
      
      if (!fs.existsSync(projectDir)) {
        fs.mkdirSync(projectDir, { recursive: true });
      }
      
      fs.writeFileSync(projectPath, JSON.stringify(config, null, 2), 'utf-8');
    } catch (error) {
      console.error('Failed to save MCP config:', error);
    }
  }

  static setSecret(key: string, value: string) {
    this.set(`secrets.${key}`, value);
  }

  static getSecret(key: string): string | undefined {
    return this.get(`secrets.${key}`);
  }

  static list(): Record<string, any> {
    return { ...this.config };
  }

  static reset() {
    this.config = {};
    this.save();
  }

  static resetMcp() {
    this.mcpConfig = { servers: {}, policy: { default: 'confirm' } };
  }

  private static load() {
    try {
      const configPath = this.getConfigPath();
      if (fs.existsSync(configPath)) {
        const raw = fs.readFileSync(configPath, 'utf-8');
        this.config = JSON.parse(raw);
      }
    } catch (error) {
      console.warn('Failed to load config:', error);
      this.config = {};
    }
  }

  private static loadMcp() {
    try {
      let merged: any = { servers: {}, policy: { default: 'confirm' } };

      // Load global
      const globalPath = this.getGlobalMcpPath();
      if (fs.existsSync(globalPath)) {
        const global = JSON.parse(fs.readFileSync(globalPath, 'utf-8'));
        merged = { ...merged, ...global, servers: { ...merged.servers, ...(global.servers || {}) } };
      }

      // Load project
      const projectPath = this.getProjectMcpPath();
      if (fs.existsSync(projectPath)) {
        const project = JSON.parse(fs.readFileSync(projectPath, 'utf-8'));
        merged = { 
          ...merged, 
          ...project, 
          servers: { ...merged.servers, ...(project.servers || {}) },
          policy: { ...(merged.policy || {}), ...(project.policy || {}) }
        };
      }

      this.mcpConfig = merged;
    } catch (error) {
      console.warn('Failed to load MCP config:', error);
    }
  }

  private static save() {
    try {
      const configDir = this.getConfigDir();
      const configPath = this.getConfigPath();
      if (!fs.existsSync(configDir)) {
        fs.mkdirSync(configDir, { recursive: true });
      }
      fs.writeFileSync(configPath, JSON.stringify(this.config, null, 2), 'utf-8');
    } catch (error) {
      console.error('Failed to save config:', error);
    }
  }
}