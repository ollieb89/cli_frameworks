import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js';

export interface McpServerConfig {
  id: string;
  transport: 'stdio' | 'sse';
  command?: string;
  args?: string[];
  url?: string;
  env?: Record<string, string>;
  disabled?: boolean;
}

export class McpManager {
  private static instance: McpManager;
  private clients: Map<string, Client> = new Map();

  private constructor() {}

  public static getInstance(): McpManager {
    if (!McpManager.instance) {
      McpManager.instance = new McpManager();
    }
    return McpManager.instance;
  }

  public async connect(config: McpServerConfig): Promise<void> {
    if (this.clients.has(config.id)) {
      return;
    }

    if (config.transport === 'stdio') {
      if (!config.command) {
        throw new Error(`MCP Server ${config.id} requires a command for stdio transport.`);
      }

      const transport = new StdioClientTransport({
        command: config.command,
        args: config.args || [],
        env: {
          ...process.env,
          ...(config.env || {}),
        },
      });

      const client = new Client(
        {
          name: 'gemini-cli-host',
          version: '0.1.0',
        },
        {
          capabilities: {},
        }
      );

      await client.connect(transport);
      this.clients.set(config.id, client);
    } else {
      throw new Error(`Transport ${config.transport} is not yet implemented.`);
    }
  }

  public async disconnect(id: string): Promise<void> {
    const client = this.clients.get(id);
    if (client) {
      // The SDK Client doesn't have a direct 'close' but the transport should be handled
      this.clients.delete(id);
    }
  }

  public async disconnectAll(): Promise<void> {
    for (const id of this.clients.keys()) {
      await this.disconnect(id);
    }
  }

  public getClient(id: string): Client | undefined {
    return this.clients.get(id);
  }

  public listServers(): string[] {
    return Array.from(this.clients.keys());
  }
}
