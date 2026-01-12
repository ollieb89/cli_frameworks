import { GoogleGenerativeAI } from '@google/generative-ai';
import { ProviderAdapter, ProviderCapabilities } from './ProviderAdapter.js';

export interface GeminiConfig {
    apiKey?: string;
    accessToken?: string;
}

export class GeminiAdapter implements ProviderAdapter {
  private genAI?: GoogleGenerativeAI;
  private accessToken?: string;
  private modelName = 'gemini-1.5-flash';

  constructor(config: GeminiConfig | string) {
    if (typeof config === 'string') {
        this.genAI = new GoogleGenerativeAI(config);
    } else {
        if (config.apiKey) {
            this.genAI = new GoogleGenerativeAI(config.apiKey);
        } else if (config.accessToken) {
            this.accessToken = config.accessToken;
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
    return ['gemini-1.5-flash', 'gemini-1.5-pro', 'gemini-1.0-pro'];
  }

  async sendMessage(message: string): Promise<string> {
    if (this.genAI) {
        const model = this.genAI.getGenerativeModel({ model: this.modelName });
        const result = await model.generateContent(message);
        const response = await result.response;
        return response.text();
    } else if (this.accessToken) {
        // Use REST API with OAuth Access Token
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
}