import { CommandDefinition } from '../../registry/types.js';
import { ConfigManager } from '../../config/ConfigManager.js';
import { GoogleAuthProvider } from '@gemini-cli/core';
import { OAuthServer } from '../../utils/OAuthServer.js';
import open from 'open';

const command: CommandDefinition = {
  namespace: 'auth',
  name: 'login',
  description: 'Authenticate with a provider (google, openai, anthropic)',
  handler: async ({ _ }, context) => {
    const provider = _[0]?.toLowerCase();
    
    if (!provider) {
        context.log('Please specify a provider: /auth:login google | openai | anthropic');
        return;
    }

    if (provider === 'google') {
        context.log('Starting Google OAuth flow...');
        
        let clientId = ConfigManager.get('google.clientId');
        let clientSecret = ConfigManager.getSecret('google.clientSecret');
        
        if (!clientId || !clientSecret) {
            context.error('Error: Google Client ID and Secret not configured.');
            context.log('To set up Google Auth, you need a GCP Project with OAuth 2.0 credentials.');
            context.log('Set them using:');
            context.log('  /global:config set google.clientId YOUR_CLIENT_ID');
            context.log('  /global:config set secrets.google.clientSecret YOUR_CLIENT_SECRET');
            return;
        }

        const port = 3000;
        const redirectUri = `http://localhost:${port}`;
        const authProvider = new GoogleAuthProvider(clientId, clientSecret, redirectUri);
        
        const scopes = ['https://www.googleapis.com/auth/generative-language.retriever']; 
        scopes.push('openid', 'email');
        
        const url = authProvider.generateAuthUrl(scopes);
        context.log('Opening browser for authentication...');
        context.log(`If browser does not open, visit: ${url}`);
        
        try {
            await open(url);
        } catch (e) {
            context.error(`Failed to open browser: ${e instanceof Error ? e.message : String(e)}`);
        }
        
        try {
            const code = await OAuthServer.waitForCode(port);
            context.log('Received auth code, exchanging for tokens...');
            
            const tokens = await authProvider.getToken(code);
            
            ConfigManager.setSecret('google.accessToken', tokens.access_token || '');
            if (tokens.refresh_token) {
                ConfigManager.setSecret('google.refreshToken', tokens.refresh_token);
            }
            if (tokens.expiry_date) {
                ConfigManager.set('google.expiryDate', tokens.expiry_date);
            }
            
            context.log('Successfully logged in to Google!');
        } catch (error: any) {
            context.error(`Authentication failed: ${error.message}`);
        }
    } else if (provider === 'openai' || provider === 'anthropic') {
        context.log(`For ${provider}, please set your API key directly:`);
        context.log(`  /global:config set secrets.${provider}.apiKey YOUR_KEY`);
    } else {
        context.log(`Unknown provider: ${provider}`);
    }
  }
};

export default command;
