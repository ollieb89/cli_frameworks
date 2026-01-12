import { CommandDefinition } from '../../registry/types.js';
import { ConfigManager } from '../../config/ConfigManager.js';
import { GoogleAuthProvider } from '@gemini-cli/core';
import { OAuthServer } from '../../utils/OAuthServer.js';
import open from 'open';

const command: CommandDefinition = {
  namespace: 'auth',
  name: 'login',
  description: 'Authenticate with a provider (google, openai, anthropic)',
  handler: async ({ _ }) => {
    const provider = _[0]?.toLowerCase();
    
    if (!provider) {
        console.log('Please specify a provider: /auth:login google | openai | anthropic');
        return;
    }

    if (provider === 'google') {
        console.log('Starting Google OAuth flow...');
        
        let clientId = ConfigManager.get('google.clientId');
        let clientSecret = ConfigManager.getSecret('google.clientSecret');
        
        if (!clientId || !clientSecret) {
            console.error('Error: Google Client ID and Secret not configured.');
            console.log('To set up Google Auth, you need a GCP Project with OAuth 2.0 credentials.');
            console.log('Set them using:');
            console.log('  /global:config set google.clientId YOUR_CLIENT_ID');
            console.log('  /global:config set secrets.google.clientSecret YOUR_CLIENT_SECRET');
            return;
        }

        const port = 3000;
        const redirectUri = `http://localhost:${port}`;
        const authProvider = new GoogleAuthProvider(clientId, clientSecret, redirectUri);
        
        // Scope for Gemini API (Generative Language)
        const scopes = ['https://www.googleapis.com/auth/generative-language.retriever']; 
        // Note: For basic Gemini API (AI Studio), API Key is usually enough. 
        // OAuth is for Vertex AI or strict access.
        // Let's add 'openid' and 'email' for basic identity check too.
        scopes.push('openid', 'email');
        
        const url = authProvider.generateAuthUrl(scopes);
        console.log('Opening browser for authentication...');
        console.log(`If browser does not open, visit: ${url}`);
        
        try {
            await open(url);
        } catch (e) {
            console.error('Failed to open browser:', e);
        }
        
        try {
            const code = await OAuthServer.waitForCode(port);
            console.log('Received auth code, exchanging for tokens...');
            
            const tokens = await authProvider.getToken(code);
            
            ConfigManager.setSecret('google.accessToken', tokens.access_token || '');
            if (tokens.refresh_token) {
                ConfigManager.setSecret('google.refreshToken', tokens.refresh_token);
            }
            if (tokens.expiry_date) {
                ConfigManager.set('google.expiryDate', tokens.expiry_date);
            }
            
            console.log('Successfully logged in to Google!');
        } catch (error: any) {
            console.error('Authentication failed:', error.message);
        }
    } else if (provider === 'openai' || provider === 'anthropic') {
        console.log(`For ${provider}, please set your API key directly:`);
        console.log(`  /global:config set secrets.${provider}.apiKey YOUR_KEY`);
        // Future: Switch to interactive prompt mode
    } else {
        console.log(`Unknown provider: ${provider}`);
    }
  }
};

export default command;
