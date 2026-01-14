import fs from 'fs/promises';
import path from 'path';
import { AgentDefinition } from './schemas.js';
import { AgentLoader } from './loader.js';

export class AgentRegistry {
  private agents: Map<string, AgentDefinition> = new Map();

  constructor(private basePath: string) {}

  registerAgent(agent: AgentDefinition) {
    this.agents.set(agent.id, agent);
  }

  getAgent(id: string): AgentDefinition | undefined {
    return this.agents.get(id);
  }

  listAgents(): AgentDefinition[] {
    return Array.from(this.agents.values());
  }

  async scan(): Promise<void> {
    try {
      const files = await fs.readdir(this.basePath);
      
      for (const file of files) {
        if (file.endsWith('.md')) {
            const fullPath = path.join(this.basePath, file);
            try {
                const agent = await AgentLoader.load(fullPath);
                this.registerAgent(agent);
            } catch (err) {
                console.warn(`Skipping invalid agent file: ${file}`, err);
            }
        }
      }
    } catch (error) {
      // If directory doesn't exist, just warn and return empty
      console.warn(`Agent directory not found: ${this.basePath}`);
    }
  }
}
