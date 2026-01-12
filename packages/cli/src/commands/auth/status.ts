import { CommandDefinition } from '../../registry/types.js';
import { ConfigManager } from '../../config/ConfigManager.js';

const command: CommandDefinition = {
  namespace: 'auth',
  name: 'status',
  description: 'Check authentication status for providers',
  handler: async () => {
    const status: Record<string, string> = {};

    // Google Check
    const googleToken = ConfigManager.getSecret('google.accessToken');
    const googleExpiry = ConfigManager.get('google.expiryDate');
    
    if (googleToken) {
        if (googleExpiry && Date.now() > googleExpiry) {
            status['google'] = 'Expired (Refresh needed)';
        } else {
            status['google'] = 'Logged In';
        }
    } else {
        status['google'] = 'Not Configured';
    }

    // OpenAI Check
    // We check via getSecret('openai.apiKey') which maps to secrets.openai.apiKey
    const openAIKey = ConfigManager.getSecret('openai.apiKey');
    status['openai'] = openAIKey ? 'Configured (Key present)' : 'Not Configured';

    // Anthropic Check
    const anthropicKey = ConfigManager.getSecret('anthropic.apiKey');
    status['anthropic'] = anthropicKey ? 'Configured (Key present)' : 'Not Configured';

    // Display
    console.log('Authentication Status:');
    for (const [p, s] of Object.entries(status)) {
        console.log(`- ${p.padEnd(10)}: ${s}`);
    }
  }
};

export default command;
