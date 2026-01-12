#!/usr/bin/env node
import React from 'react';
import { render } from 'ink';
import { App } from './App.js';
import { CommandRegistry } from './registry/CommandRegistry.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

import { ConfigManager } from './config/ConfigManager.js';

// Initialize Config
ConfigManager.initialize();

// Initialize registry
const commandsPath = path.resolve(__dirname, 'commands');
await CommandRegistry.loadFrom(commandsPath);

render(<App />);