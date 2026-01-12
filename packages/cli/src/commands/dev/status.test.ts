import { describe, it, expect, vi } from 'vitest';
import statusCommand from './status.js';
import { ProviderRegistry } from '@gemini-cli/core';

// Mock ProviderRegistry
vi.mock('@gemini-cli/core', () => ({
  ProviderRegistry: {
    getDefault: vi.fn(),
    get: vi.fn()
  }
}));

describe('status command', () => {
  it('should return status info with default provider', async () => {
    (ProviderRegistry.getDefault as any).mockReturnValue({
      getCapabilities: () => ({ name: 'Mock Provider', version: '1.0' })
    });

    const consoleSpy = vi.spyOn(console, 'log');
    await statusCommand.handler({});
    expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('System Status: Online'));
    expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('Active Provider: Mock Provider'));
    consoleSpy.mockRestore();
  });
});