import { describe, it, expect, beforeEach, vi } from 'vitest';
import { ProviderFactory } from './ProviderFactory.js';
import { ConfigManager } from '../config/ConfigManager.js';
import { GeminiAdapter } from '@gemini-cli/core';

vi.mock('../config/ConfigManager.js');
vi.mock('@gemini-cli/core');

describe('ProviderFactory', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should create GeminiAdapter from accessToken', () => {
    (ConfigManager.getSecret as any).mockImplementation((key: string) => {
        if (key === 'google.accessToken') return 'fake-token';
        return null;
    });

    const provider = ProviderFactory.createDefault();
    expect(GeminiAdapter).toHaveBeenCalledWith({ accessToken: 'fake-token' });
  });

  it('should create GeminiAdapter from apiKey', () => {
    (ConfigManager.getSecret as any).mockImplementation((key: string) => {
        if (key === 'google.apiKey') return 'fake-key';
        return null;
    });

    const provider = ProviderFactory.createDefault();
    expect(GeminiAdapter).toHaveBeenCalledWith({ apiKey: 'fake-key' });
  });

  it('should throw if no config found', () => {
    (ConfigManager.getSecret as any).mockReturnValue(null);
    expect(() => ProviderFactory.createDefault()).toThrow(/No provider configured/);
  });
});
