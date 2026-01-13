#!/usr/bin/env node
import React from 'react';
import { render } from 'ink';
import { App } from './App.js';
import { CommandRegistry } from './registry/CommandRegistry.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

import { ConfigManager } from './config/ConfigManager.js';
import { McpManager } from '@omnicode/mcp';

// Initialize Config
ConfigManager.initialize();

// Initialize MCP Servers
const mcpManager = McpManager.getInstance();
const mcpConfig = ConfigManager.getMcpConfig();
if (mcpConfig.servers) {
  for (const [id, config] of Object.entries(mcpConfig.servers)) {
    if (!(config as any).disabled) {
      mcpManager.connect({ id, ...(config as any) }).catch((err: Error) => {
        console.error(`Failed to connect to MCP server ${id}:`, err.message);
      });
    }
  }
}

// Initialize registry
const commandsPath = path.resolve(__dirname, 'commands');
await CommandRegistry.loadFrom(commandsPath);

render(<App />);