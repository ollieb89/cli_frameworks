import { McpManager } from '../packages/mcp/dist/index.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, '..');

async function verify() {
  console.log('🚀 Verifying MCP Connection to filesystem server...');
  const manager = McpManager.getInstance();

  const config = {
    id: 'fs',
    transport: 'stdio',
    command: 'npx',
    args: ['-y', '@modelcontextprotocol/server-filesystem', projectRoot]
  };

  try {
    console.log(`Connecting to ${config.id}...`);
    await manager.connect(config);
    console.log('✅ Connected.');

    console.log('Listing tools...');
    const tools = await manager.getTools('fs');
    console.log(`✅ Found ${tools.length} tools:`, tools.map(t => t.name).join(', '));

    if (tools.length > 0) {
      console.log('Verification successful!');
    } else {
      console.error('❌ No tools found.');
      process.exit(1);
    }

    await manager.disconnectAll();
    process.exit(0);
  } catch (error) {
    console.error('❌ Verification failed:', error);
    process.exit(1);
  }
}

verify();
