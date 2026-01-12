import { CommandDefinition } from '../../registry/types.js';
import { ProviderRegistry } from '@gemini-cli/core';
import { APP_NAME, VERSION } from '@gemini-cli/shared';

const statusCommand: CommandDefinition = {
  namespace: 'dev',
  name: 'status',
  description: 'Displays the current system status and provider info',
  handler: async () => {
    let providerInfo = 'None';
    try {
      const provider = ProviderRegistry.getDefault();
      const caps = provider.getCapabilities();
      providerInfo = `${caps.name} (v${caps.version})`;
    } catch (err: any) {
      providerInfo = `None (Error: ${err.message})`;
    }

    console.log(`
--- ${APP_NAME} v${VERSION} ---
System Status: Online
Active Provider: ${providerInfo}
Timestamp: ${new Date().toISOString()}
    `.trim());
  }
};

export default statusCommand;