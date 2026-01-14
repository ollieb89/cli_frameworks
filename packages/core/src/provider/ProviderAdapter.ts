export interface ProviderCapabilities {
  name: string;
  version: string;
  supportsStreaming: boolean;
  supportsImages: boolean;
}

export interface StreamResponse {
  text: string;
  done: boolean;
  toolCalls?: ToolCall[];
}

export type StreamCallback = (chunk: StreamResponse) => void;

export interface ToolDefinition {
  name: string;
  description: string;
  parameters: {
    type: 'object';
    properties: Record<string, any>;
    required?: string[];
  };
}

export interface ToolCall {
  id?: string;
  toolName: string;
  args: any;
}

export interface ChatMessage {
  role: 'user' | 'assistant' | 'system' | 'tool';
  content: string;
  toolCalls?: ToolCall[];
  toolCallId?: string; // For role: 'tool'
}

export interface ProviderAdapter {
  /**
   * Returns the capabilities of the provider.
   */
  getCapabilities(): ProviderCapabilities;

  /**
   * Lists available models from the provider.
   */
  listModels(): Promise<string[]>;

  /**
   * Sends a message to the provider and returns the text response.
   * @deprecated Use chat() for better agent support
   */
  sendMessage(message: string): Promise<string>;

  /**
   * Sends a message and streams the response.
   * @deprecated Use streamChat() for better agent support
   */
  streamMessage(message: string, callback: StreamCallback): Promise<void>;

  /**
   * Multi-turn chat with optional tool support.
   */
  chat(messages: ChatMessage[], tools?: ToolDefinition[]): Promise<ChatMessage>;

  /**
   * Streaming multi-turn chat with optional tool support.
   */
  streamChat(messages: ChatMessage[], callback: StreamCallback, tools?: ToolDefinition[]): Promise<void>;
}