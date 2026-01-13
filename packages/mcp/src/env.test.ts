import { describe, it, expect } from 'vitest';

describe('MCP Environment', () => {
  it('should be able to import @modelcontextprotocol/sdk', async () => {
    const sdk = await import('@modelcontextprotocol/sdk/client/index.js');
    expect(sdk).toBeDefined();
  });
});
