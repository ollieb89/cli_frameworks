export interface ProviderCapabilities {
  name: string;
  version: string;
  supportsStreaming: boolean;
  supportsImages: boolean;
}

export interface StreamResponse {
  text: string;
  done: boolean;
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
  toolName: string;
  args: any;
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
   * @param message The prompt to send
   */
  sendMessage(message: string): Promise<string>;

  /**
   * Sends a message and streams the response.
   * @param message The prompt to send
   * @param callback Function called for each chunk of data
   */
  streamMessage(message: string, callback: StreamCallback): Promise<void>;
}