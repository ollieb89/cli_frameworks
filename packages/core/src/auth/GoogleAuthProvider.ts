import { OAuth2Client, Credentials } from 'google-auth-library';

export class GoogleAuthProvider {
  private client: OAuth2Client;

  constructor(clientId: string, clientSecret: string, redirectUri: string) {
    this.client = new OAuth2Client(clientId, clientSecret, redirectUri);
  }

  generateAuthUrl(scopes: string[]): string {
    return this.client.generateAuthUrl({
      access_type: 'offline',
      scope: scopes,
      prompt: 'consent' // Force consent to ensure refresh token
    });
  }

  async getToken(code: string): Promise<Credentials> {
    const { tokens } = await this.client.getToken(code);
    return tokens;
  }

  setCredentials(tokens: Credentials) {
    this.client.setCredentials(tokens);
  }
  
  getAuthClient(): OAuth2Client {
    return this.client;
  }
}
