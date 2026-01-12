import { GoogleGenerativeAI } from '@google/generative-ai';
import { ProviderAdapter, ProviderCapabilities } from './ProviderAdapter';

export class GeminiAdapter implements ProviderAdapter {
  private genAI: GoogleGenerativeAI;
  private modelName = 'gemini-1.5-flash';

  constructor(apiKey: string) {
    this.genAI = new GoogleGenerativeAI(apiKey);
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
    // In a real implementation, we might fetch this from the API if possible.
    // For now, we return a known supported list.
    return ['gemini-1.5-flash', 'gemini-1.5-pro', 'gemini-1.0-pro'];
  }

  async sendMessage(message: string): Promise<string> {
    const model = this.genAI.getGenerativeModel({ model: this.modelName });
    const result = await model.generateContent(message);
    const response = await result.response;
    return response.text();
  }
}
