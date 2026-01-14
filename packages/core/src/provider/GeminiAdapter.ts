import { GoogleGenerativeAI, Content, Part } from '@google/generative-ai';
import { ProviderAdapter, ProviderCapabilities, StreamCallback, ChatMessage, ToolDefinition, ToolCall } from './ProviderAdapter.js';

export interface GeminiConfig {
    apiKey?: string;
    accessToken?: string;
    modelName?: string;
}

export class GeminiAdapter implements ProviderAdapter {
  private genAI?: GoogleGenerativeAI;
  private accessToken?: string;
  private modelName = 'gemini-1.5-flash'; // Updated to a more stable model name if 3.0 is not yet widely available

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
    return ['gemini-1.5-flash', 'gemini-1.5-pro', 'gemini-2.0-flash-exp'];
  }

  async sendMessage(message: string): Promise<string> {
    const response = await this.chat([{ role: 'user', content: message }]);
    return response.content;
  }

  async streamMessage(message: string, callback: StreamCallback): Promise<void> {
    return this.streamChat([{ role: 'user', content: message }], callback);
  }

  async chat(messages: ChatMessage[], tools?: ToolDefinition[]): Promise<ChatMessage> {
    if (this.genAI) {
        const model = this.genAI.getGenerativeModel({ 
            model: this.modelName,
            // @ts-ignore - Tools might have slight typing diffs in some SDK versions
            tools: tools ? [{ functionDeclarations: tools }] : undefined
        });

        const systemMessage = messages.find(m => m.role === 'system');
        const history: Content[] = messages
            .filter(m => m.role !== 'system')
            .map(m => ({
                role: m.role === 'user' ? 'user' : 'model',
                parts: this.mapMessageToParts(m)
            }));

        const chat = model.startChat({
            history: history.slice(0, -1),
            // @ts-ignore
            systemInstruction: systemMessage ? { parts: [{ text: systemMessage.content }] } : undefined
        });

        const lastMessage = history[history.length - 1];
        const result = await chat.sendMessage(lastMessage.parts);
        const response = await result.response;
        
        const functionCalls = response.functionCalls();
        const toolCalls: ToolCall[] | undefined = functionCalls?.map(fc => ({
            toolName: fc.name,
            args: fc.args
        }));

        return {
            role: 'assistant',
            content: response.text(),
            toolCalls
        };
    }
    
    throw new Error('No valid credentials provided for GeminiAdapter (REST chat not implemented yet)');
  }

  async streamChat(messages: ChatMessage[], callback: StreamCallback, tools?: ToolDefinition[]): Promise<void> {
     if (this.genAI) {
        const model = this.genAI.getGenerativeModel({ 
            model: this.modelName,
            // @ts-ignore
            tools: tools ? [{ functionDeclarations: tools }] : undefined
        });

        const systemMessage = messages.find(m => m.role === 'system');
        const history: Content[] = messages
            .filter(m => m.role !== 'system')
            .map(m => ({
                role: m.role === 'user' ? 'user' : 'model',
                parts: this.mapMessageToParts(m)
            }));

        const chat = model.startChat({
            history: history.slice(0, -1),
            // @ts-ignore
            systemInstruction: systemMessage ? { parts: [{ text: systemMessage.content }] } : undefined
        });

        const lastMessage = history[history.length - 1];
        const result = await chat.sendMessageStream(lastMessage.parts);
        
        let fullText = '';
        for await (const chunk of result.stream) {
            const chunkText = chunk.text();
            fullText += chunkText;
            callback({ text: chunkText, done: false });
        }
        callback({ text: '', done: true });
        return;
    }
    throw new Error('No valid credentials provided for GeminiAdapter');
  }

  private mapMessageToParts(m: ChatMessage): Part[] {
      if (m.toolCalls) {
          return m.toolCalls.map(tc => ({
              functionCall: {
                  name: tc.toolName,
                  args: tc.args
              }
          }));
      }
      if (m.role === 'tool' && m.toolCallId) {
          return [{
              functionResponse: {
                  name: m.toolCallId,
                  response: JSON.parse(m.content)
              }
          }];
      }
      return [{ text: m.content }];
  }
}