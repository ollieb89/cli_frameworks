import { CommandDefinition } from '../../registry/types.js';
import { ProviderRegistry } from '@omnicode/core';
import { APP_NAME, VERSION } from '@omnicode/shared';

const statusCommand: CommandDefinition = {
  namespace: 'dev',
  name: 'status',
  description: 'Displays the current system status and provider info',
  handler: async (args, context) => {
    let providerInfo = 'None';
    try {
      const provider = ProviderRegistry.getDefault();
      const caps = provider.getCapabilities();
      providerInfo = `${caps.name} (v${caps.version})`;
    } catch (err: any) {
      providerInfo = `None (Error: ${err.message})`;
    }

    context.log(`
--- ${APP_NAME} v${VERSION} ---
System Status: Online
Active Provider: ${providerInfo}
Timestamp: ${new Date().toISOString()}
    `.trim());
  }
};

export default statusCommand;