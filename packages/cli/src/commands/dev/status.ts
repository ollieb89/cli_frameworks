import { ProviderRegistry } from '@gemini-cli/core';
import { APP_NAME, VERSION } from '@gemini-cli/shared';

export function handleDevStatus(): string {
  let providerInfo = 'None';
  try {
    const provider = ProviderRegistry.getDefault();
    const caps = provider.getCapabilities();
    providerInfo = `${caps.name} (v${caps.version})`;
  } catch (err: any) {
    providerInfo = `None (Error: ${err.message})`;
  }

  return `
--- ${APP_NAME} v${VERSION} ---
System Status: Online
Active Provider: ${providerInfo}
Timestamp: ${new Date().toISOString()}
  `.trim();
}
