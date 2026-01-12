import { ProviderRegistry } from '../packages/core/dist/index.js';

console.log('Verifying Framework Abstraction Layer (FAL)...');

const mockProvider = {
  getCapabilities: () => ({
    name: 'Manual Verify Provider',
    version: '1.0.0',
    supportsStreaming: false,
    supportsImages: false
  }),
  listModels: async () => ['manual-model'],
  sendMessage: async (msg) => `Manual verify echo: ${msg}`
};

try {
  console.log('1. Registering provider...');
  ProviderRegistry.register('manual', mockProvider);
  
  console.log('2. Setting default...');
  ProviderRegistry.setDefault('manual');

  console.log('3. Retrieving default...');
  const provider = ProviderRegistry.getDefault();

  if (provider.getCapabilities().name !== 'Manual Verify Provider') {
    throw new Error('Capabilities mismatch');
  }

  console.log('4. Sending message...');
  const response = await provider.sendMessage('test');
  
  if (response !== 'Manual verify echo: test') {
    throw new Error('Response mismatch');
  }

  console.log('FAL Verification Passed!');
} catch (error) {
  console.error('FAL Verification Failed:', error);
  process.exit(1);
}
