import { GoogleGenerativeAI } from '@google/generative-ai';
import { ProviderAdapter, ProviderCapabilities, StreamCallback } from './ProviderAdapter.js';

export interface GeminiConfig {
    apiKey?: string;
    accessToken?: string;
    modelName?: string;
}

export class GeminiAdapter implements ProviderAdapter {
  private genAI?: GoogleGenerativeAI;
  private accessToken?: string;
  private modelName = 'gemini-3.0-flash';

  constructor(config: GeminiConfig | string) {
    if (typeof config === 'string') {
        this.genAI = new GoogleGenerativeAI(config);
    } else {
        if (config.apiKey) {
            this.genAI = new GoogleGenerativeAI(config.apiKey);
        } else if (config.accessToken) {
            this.accessToken = config.accessToken;
        }
        if (config.modelName) {
            this.modelName = config.modelName;
        }
    }
  }

  getCapabilities(): ProviderCapabilities {
    return {
      name: 'Google Gemini',
      version: '1.0',
      supportsStreaming: true,
      supportsImages: true
    };
  }

  async listModels(): Promise<string[]> {
    return ['gemini-3.0-flash', 'gemini-3.0-pro', 'gemini-2.0-flash', 'gemini-1.5-pro'];
  }

  async sendMessage(message: string): Promise<string> {
    if (this.genAI) {
        const model = this.genAI.getGenerativeModel({ model: this.modelName });
        const result = await model.generateContent(message);
        const response = await result.response;
        return response.text();
    } else if (this.accessToken) {
        const url = `https://generativelanguage.googleapis.com/v1beta/models/${this.modelName}:generateContent`;
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${this.accessToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                contents: [{ parts: [{ text: message }] }]
            })
        });
        
        if (!response.ok) {
            throw new Error(`Gemini API Error: ${response.statusText} - ${await response.text()}`);
        }
        
        const data = await response.json();
        // @ts-ignore
        return data.candidates?.[0]?.content?.parts?.[0]?.text || '';
    }
    
    throw new Error('No valid credentials provided for GeminiAdapter');
  }

  async streamMessage(message: string, callback: StreamCallback): Promise<void> {
    if (this.genAI) {
        const model = this.genAI.getGenerativeModel({ model: this.modelName });
        const result = await model.generateContentStream(message);
        
        let fullText = '';
        for await (const chunk of result.stream) {
            const chunkText = chunk.text();
            fullText += chunkText;
            callback({ text: chunkText, done: false });
        }
        callback({ text: '', done: true });
    } else if (this.accessToken) {
        // OAuth REST Streaming (Server-Sent Events)
        const url = `https://generativelanguage.googleapis.com/v1beta/models/${this.modelName}:streamGenerateContent?alt=sse`;
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${this.accessToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                contents: [{ parts: [{ text: message }] }]
            })
        });

        if (!response.ok) {
            throw new Error(`Gemini API Error: ${response.statusText}`);
        }

        const reader = response.body?.getReader();
        if (!reader) throw new Error('Failed to get response body reader');

        const decoder = new TextDecoder();
        let buffer = '';

        while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            buffer += decoder.decode(value, { stream: true });
            
            // SSE parsing logic
            const lines = buffer.split('\n');
            buffer = lines.pop() || '';

            for (const line of lines) {
                if (line.startsWith('data: ')) {
                    const jsonStr = line.slice(6);
                    try {
                        const data = JSON.parse(jsonStr);
                        const text = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
                        if (text) {
                            callback({ text, done: false });
                        }
                    } catch (e) {
                        // Incomplete JSON or noise
                    }
                }
            }
        }
        callback({ text: '', done: true });
    } else {
        throw new Error('No valid credentials provided for GeminiAdapter');
    }
  }
}
