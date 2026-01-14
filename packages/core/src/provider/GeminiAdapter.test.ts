import { describe, it, expect, vi, beforeEach } from 'vitest';
import { GeminiAdapter } from './GeminiAdapter.js';
import { GoogleGenerativeAI } from '@google/generative-ai';

vi.mock('@google/generative-ai');

describe('GeminiAdapter', () => {
  let adapter: GeminiAdapter;
  const mockSendMessage = vi.fn();
  const mockSendMessageStream = vi.fn();
  const mockStartChat = vi.fn();
  const mockGetGenerativeModel = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    (GoogleGenerativeAI as any).mockImplementation(function (this: any) {
      return {
        getGenerativeModel: mockGetGenerativeModel
      };
    });
    
    mockStartChat.mockReturnValue({
        sendMessage: mockSendMessage,
        sendMessageStream: mockSendMessageStream
    });

    mockGetGenerativeModel.mockReturnValue({
      startChat: mockStartChat
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

  it('should send message and return text via chat', async () => {
    mockSendMessage.mockResolvedValue({
      response: { 
          text: () => 'Gemini Response',
          functionCalls: () => undefined
      }
    });
    
    const response = await adapter.sendMessage('Hello');
    
    expect(mockGetGenerativeModel).toHaveBeenCalledWith(expect.objectContaining({ model: 'gemini-1.5-flash' }));
    expect(mockStartChat).toHaveBeenCalled();
    expect(mockSendMessage).toHaveBeenCalled();
    expect(response).toBe('Gemini Response');
  });

  it('should report correct capabilities', () => {
    const caps = adapter.getCapabilities();
    expect(caps.name).toContain('Gemini');
    expect(caps.supportsStreaming).toBe(true);
  });

  it('should stream messages via streamChat', async () => {
    const mockStream = {
      stream: [
        { text: () => 'Chunk 1' },
        { text: () => 'Chunk 2' }
      ]
    };
    mockSendMessageStream.mockResolvedValue(mockStream);

    const chunks: string[] = [];
    await adapter.streamMessage('Stream test', (chunk) => {
      if (chunk.text) chunks.push(chunk.text);
    });

    expect(chunks).toEqual(['Chunk 1', 'Chunk 2']);
    expect(mockSendMessageStream).toHaveBeenCalled();
  });
});