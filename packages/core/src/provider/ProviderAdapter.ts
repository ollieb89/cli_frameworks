export interface ProviderCapabilities {
  name: string;
  version: string;
  supportsStreaming: boolean;
  supportsImages: boolean;
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
}
