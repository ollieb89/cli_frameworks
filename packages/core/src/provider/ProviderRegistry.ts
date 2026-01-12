import { ProviderAdapter } from './ProviderAdapter';

export class ProviderRegistry {
  private static providers: Map<string, ProviderAdapter> = new Map();
  private static defaultProvider: string | null = null;

  /**
   * Registers a provider adapter with a unique name.
   */
  static register(name: string, provider: ProviderAdapter) {
    this.providers.set(name, provider);
  }

  /**
   * Retrieves a registered provider by name.
   * Throws if not found.
   */
  static get(name: string): ProviderAdapter {
    const provider = this.providers.get(name);
    if (!provider) {
      throw new Error(`Provider '${name}' not found`);
    }
    return provider;
  }

  /**
   * Sets the default provider to be used by the application.
   */
  static setDefault(name: string) {
    if (!this.providers.has(name)) {
      throw new Error(`Provider '${name}' not found, cannot set as default`);
    }
    this.defaultProvider = name;
  }

  /**
   * Gets the default provider.
   * Throws if no default is set.
   */
  static getDefault(): ProviderAdapter {
    if (!this.defaultProvider) {
      throw new Error("No default provider set");
    }
    return this.get(this.defaultProvider);
  }

  /**
   * Clears all registered providers (useful for testing).
   */
  static clear() {
    this.providers.clear();
    this.defaultProvider = null;
  }
}
