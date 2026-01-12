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

  it('should support accessToken configuration', async () => {
    // Mock global fetch
    const mockFetch = vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({
            candidates: [{ content: { parts: [{ text: 'OAuth Response' }] } }]
        })
    });
    global.fetch = mockFetch;
    
    const oauthAdapter = new GeminiAdapter({ accessToken: 'fake-access-token' });
    const response = await oauthAdapter.sendMessage('Hi OAuth');
    
    expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining('generateContent'),
        expect.objectContaining({
            headers: expect.objectContaining({
                'Authorization': 'Bearer fake-access-token'
            })
        })
    );
    expect(response).toBe('OAuth Response');
  });

  it('should stream messages via SDK', async () => {
    const mockStream = {
      stream: [
        { text: () => 'Chunk 1' },
        { text: () => 'Chunk 2' }
      ]
    };
    const mockGenerateContentStream = vi.fn().mockResolvedValue(mockStream);
    mockGetGenerativeModel.mockReturnValue({
      generateContentStream: mockGenerateContentStream
    });

    const chunks: string[] = [];
    await adapter.streamMessage('Stream test', (chunk) => {
      if (chunk.text) chunks.push(chunk.text);
    });

    expect(chunks).toEqual(['Chunk 1', 'Chunk 2']);
    expect(mockGenerateContentStream).toHaveBeenCalledWith('Stream test');
  });
});
