import { GeminiAdapter } from '@gemini-cli/core';
import { ConfigManager } from '../config/ConfigManager.js';

export class ProviderFactory {
  static createDefault(): any {
    // Check Google Auth
    const googleAccessToken = ConfigManager.getSecret('google.accessToken');
    const googleApiKey = ConfigManager.getSecret('google.apiKey');
    const googleModel = ConfigManager.get('google.model') as string | undefined;

    if (googleAccessToken) {
        return new GeminiAdapter({ accessToken: googleAccessToken, modelName: googleModel });
    }
    
    if (googleApiKey) {
        return new GeminiAdapter({ apiKey: googleApiKey, modelName: googleModel });
    }

    // OpenAI
    const openAIKey = ConfigManager.getSecret('openai.apiKey');
    if (openAIKey) {
        // return new OpenAIAdapter(openAIKey); // Not implemented yet
    }

    throw new Error('No provider configured. Use /auth:login or /config set secrets.google.apiKey ...');
  }
}
