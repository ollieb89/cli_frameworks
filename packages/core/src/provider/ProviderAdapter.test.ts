import { describe, it, expect } from 'vitest';
// The interface doesn't exist yet, so this import is expected to fail resolution or type check.
import type { ProviderAdapter, ProviderCapabilities } from './ProviderAdapter';

describe('ProviderAdapter Interface Compliance', () => {
  it('should enforce the contract for a provider', async () => {
    // Define the capabilities structure we expect
    const capabilities: ProviderCapabilities = {
      name: 'Mock Provider',
      version: '1.0',
      supportsStreaming: true,
      supportsImages: false
    };

    // Implement the interface with a mock object
    const provider: ProviderAdapter = {
      getCapabilities: () => capabilities,
      listModels: async () => ['mock-model-v1'],
      sendMessage: async (message: string) => `Received: ${message}`
    };

    // Assertions to verify structure
    expect(provider.getCapabilities().name).toBe('Mock Provider');
    expect(await provider.listModels()).toContain('mock-model-v1');
    expect(await provider.sendMessage('Hello')).toBe('Received: Hello');
  });
});
