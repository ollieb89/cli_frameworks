export class ConfigManager {
  private static config: Record<string, any> = {};

  static set(key: string, value: any) {
    this.config[key] = value;
    // TODO: Implement file system persistence
  }

  static get(key: string): any {
    return this.config[key];
  }

  static list(): Record<string, any> {
    return { ...this.config };
  }

  static reset() {
    this.config = {};
  }
}
