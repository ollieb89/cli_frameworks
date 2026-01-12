import { ConfigManager } from '../packages/cli/dist/config/ConfigManager.js';
import path from 'path';
import os from 'os';
import fs from 'fs';

const configPath = path.join(os.homedir(), '.gemini-cli', 'config.json');
console.log('Config Path:', configPath);

if (fs.existsSync(configPath)) {
    console.log('Existing config found.');
} else {
    console.log('No existing config.');
}

try {
    ConfigManager.initialize();
    ConfigManager.set('test_run_ts', Date.now());
    
    console.log('Successfully wrote to config.');
    
    const content = fs.readFileSync(configPath, 'utf-8');
    const json = JSON.parse(content);
    if (json.test_run_ts) {
        console.log('Verification: PASS');
    } else {
        console.log('Verification: FAIL - Key not found');
    }
} catch (e) {
    console.error('Error:', e);
}
