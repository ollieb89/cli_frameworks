import { describe, it, expect, vi } from 'vitest';
import { handleDevStatus } from './status.js';
import { ProviderRegistry } from '@gemini-cli/core';

// Mock ProviderRegistry
vi.mock('@gemini-cli/core', () => ({
  ProviderRegistry: {
    getDefault: vi.fn(),
    get: vi.fn()
  }
}));

describe('handleDevStatus', () => {
  it('should return status info with default provider', () => {
    (ProviderRegistry.getDefault as any).mockReturnValue({
      getCapabilities: () => ({ name: 'Mock Provider', version: '1.0' })
    });

    const output = handleDevStatus();
    expect(output).toContain('System Status: Online');
    expect(output).toContain('Active Provider: Mock Provider');
  });

  it('should handle missing default provider', () => {
     (ProviderRegistry.getDefault as any).mockImplementation(() => {
       throw new Error('No default provider set');
     });

     const output = handleDevStatus();
     expect(output).toContain('Active Provider: None (Error: No default provider set)');
  });
});
