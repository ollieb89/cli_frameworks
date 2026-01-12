import fs from 'fs';
import path from 'path';
import os from 'os';

export class ConfigManager {
  private static config: Record<string, any> = {};
  private static configDir = path.join(os.homedir(), '.gemini-cli');
  private static configPath = path.join(os.homedir(), '.gemini-cli', 'config.json');

  static initialize() {
    this.load();
  }

  static set(key: string, value: any) {
    this.config[key] = value;
    this.save();
  }

  static get(key: string): any {
    // Reloading on get ensures we have the latest if multiple processes (advanced),
    // but for now in-memory cache is fine. We rely on initialize() to load first.
    return this.config[key];
  }

  static setSecret(key: string, value: string) {
    // TODO: In Phase 2/3, migrate to system keychain (keytar)
    // For now, store in config file but namespaced
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

  private static load() {
    try {
      if (fs.existsSync(this.configPath)) {
        const raw = fs.readFileSync(this.configPath, 'utf-8');
        this.config = JSON.parse(raw);
      }
    } catch (error) {
      console.warn('Failed to load config:', error);
      // Initialize with empty if fail
      this.config = {};
    }
  }

  private static save() {
    try {
      if (!fs.existsSync(this.configDir)) {
        fs.mkdirSync(this.configDir, { recursive: true });
      }
      fs.writeFileSync(this.configPath, JSON.stringify(this.config, null, 2), 'utf-8');
    } catch (error) {
      console.error('Failed to save config:', error);
    }
  }
  
  // For testing purposes
  static _setConfigPath(newPath: string) {
    this.configPath = newPath;
    this.configDir = path.dirname(newPath);
  }
}