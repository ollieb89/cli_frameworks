import { McpManager } from '../packages/mcp/dist/index.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, '..');

async function verify() {
  console.log('🚀 Verifying MCP Tool Call...');
  const manager = McpManager.getInstance();

  const config = {
    id: 'fs',
    transport: 'stdio',
    command: 'npx',
    args: ['-y', '@modelcontextprotocol/server-filesystem', projectRoot]
  };

  try {
    await manager.connect(config);
    console.log('Connected to fs server.');

    const targetFile = path.join(projectRoot, 'package.json');
    console.log(`Calling read_file for: ${targetFile}`);
    
    const result = await manager.callTool('fs', 'read_file', { path: targetFile });
    
    console.log('Tool Result Received:');
    // Result structure from MCP is usually { content: [ { type: 'text', text: '...' } ] }
    if (result.content && result.content[0] && result.content[0].text) {
      const pkg = JSON.parse(result.content[0].text);
      console.log(`✅ Success! Package name: ${pkg.name}`);
    } else {
      console.error('❌ Unexpected result format:', JSON.stringify(result, null, 2));
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
