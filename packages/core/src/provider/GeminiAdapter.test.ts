import { describe, it, expect, vi, beforeEach } from 'vitest';
import { GeminiAdapter } from './GeminiAdapter';
import { GoogleGenerativeAI } from '@google/generative-ai';

vi.mock('@google/generative-ai');

describe('GeminiAdapter', () => {
  let adapter: GeminiAdapter;
  const mockGenerateContent = vi.fn();
  const mockGetGenerativeModel = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    (GoogleGenerativeAI as any).mockImplementation(function (this: any) {
      return {
        getGenerativeModel: mockGetGenerativeModel
      };
    });
    mockGetGenerativeModel.mockReturnValue({
      generateContent: mockGenerateContent
    });
    adapter = new GeminiAdapter('fake-api-key');
  });

  it('should initialize with api key', () => {
    expect(GoogleGenerativeAI).toHaveBeenCalledWith('fake-api-key');
  });

  it('should list models', async () => {
    const models = await adapter.listModels();
    expect(models).toContain('gemini-1.5-flash');
    expect(models.length).toBeGreaterThan(0);
  });

  it('should send message and return text', async () => {
    mockGenerateContent.mockResolvedValue({
      response: { text: () => 'Gemini Response' }
    });
    
    const response = await adapter.sendMessage('Hello');
    
    expect(mockGetGenerativeModel).toHaveBeenCalledWith({ model: 'gemini-1.5-flash' });
    expect(mockGenerateContent).toHaveBeenCalledWith('Hello');
    expect(response).toBe('Gemini Response');
  });

  it('should report correct capabilities', () => {
    const caps = adapter.getCapabilities();
    expect(caps.name).toContain('Gemini');
    expect(caps.supportsStreaming).toBe(true);
  });
});
