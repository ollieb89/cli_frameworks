import { describe, it, expect, vi } from 'vitest';
import statusCommand from './status.js';
import { ProviderRegistry } from '@omnicode/core';

// Mock ProviderRegistry
vi.mock('@omnicode/core', () => ({
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

    const logSpy = vi.fn();
    const context = { log: logSpy, error: vi.fn() };
    await statusCommand.handler({}, context);
    expect(logSpy).toHaveBeenCalledWith(expect.stringContaining('System Status: Online'));
    expect(logSpy).toHaveBeenCalledWith(expect.stringContaining('Active Provider: Mock Provider'));
  });
});