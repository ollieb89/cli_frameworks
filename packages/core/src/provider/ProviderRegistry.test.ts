import { describe, it, expect, beforeEach } from 'vitest';
import { ProviderRegistry } from './ProviderRegistry';
import type { ProviderAdapter } from './ProviderAdapter';

describe('ProviderRegistry', () => {
  const mockProvider: ProviderAdapter = {
     getCapabilities: () => ({ name: 'mock', version: '1', supportsStreaming: false, supportsImages: false }),
     listModels: async () => [],
     sendMessage: async () => 'mock'
  };

  beforeEach(() => {
    ProviderRegistry.clear();
  });

  it('should register and retrieve a provider', () => {
    ProviderRegistry.register('mock', mockProvider);
    expect(ProviderRegistry.get('mock')).toBe(mockProvider);
  });

  it('should set and get default provider', () => {
    ProviderRegistry.register('mock', mockProvider);
    ProviderRegistry.setDefault('mock');
    expect(ProviderRegistry.getDefault()).toBe(mockProvider);
  });

  it('should throw if provider not found', () => {
    expect(() => ProviderRegistry.get('unknown')).toThrow("Provider 'unknown' not found");
  });

  it('should throw if no default provider set', () => {
    expect(() => ProviderRegistry.getDefault()).toThrow("No default provider set");
  });
});
