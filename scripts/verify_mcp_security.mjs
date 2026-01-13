import { McpToolAdapter, PolicyGate } from '../packages/mcp/dist/index.js';

async function verify() {
  console.log('🚀 Verifying MCP Security Policy...');

  // Define a policy that denies 'write_file'
  const policy = {
    default: 'allow',
    denylist: [
      { server: 'fs', tool: 'write_file' }
    ]
  };
  const gate = new PolicyGate(policy);

  console.log('Checking policy for write_file (should be denied)...');
  try {
    // Note: handleToolCall denormalizes the name, so we use the mcp__ prefix
    await McpToolAdapter.handleToolCall('mcp__fs__write_file', {}, gate);
    console.error('❌ Error: write_file was allowed but should be denied!');
    process.exit(1);
  } catch (error) {
    if (error.message.includes('Policy Denied')) {
      console.log('✅ Success! write_file was correctly blocked.');
    } else {
      console.error('❌ Error: Unexpected error type:', error.message);
      process.exit(1);
    }
  }

  console.log('Checking policy for read_file (should be allowed)...');
  // We can't actually call read_file here without a real server, 
  // but we can check the gate directly or mock the server call.
  // Let's just check the gate logic via handleToolCall which triggers the gate.
  
  // Since McpToolAdapter.handleToolCall tries to call the server AFTER the gate,
  // we expect a "not connected" error if it passes the gate.
  try {
    await McpToolAdapter.handleToolCall('mcp__fs__read_file', { path: 't.txt' }, gate);
  } catch (error) {
    if (error.message.includes('MCP Server fs is not connected')) {
      console.log('✅ Success! read_file passed the security gate.');
    } else {
      console.error('❌ Error: read_file was blocked by gate but should be allowed.');
      process.exit(1);
    }
  }

  console.log('Verification successful!');
  process.exit(0);
}

verify();
