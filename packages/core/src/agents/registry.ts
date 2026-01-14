import fs from 'fs/promises';
import path from 'path';
import glob from 'fast-glob';
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
      const patterns = ['**/agents/*.md'];
      const files = await glob(patterns, { cwd: this.basePath });
      
      for (const file of files) {
        const fullPath = path.join(this.basePath, file);
        try {
            const agent = await AgentLoader.load(fullPath);
            this.registerAgent(agent);
        } catch (err) {
            console.warn(`Skipping invalid agent file: ${file}`, err);
        }
      }
    } catch (error) {
      console.warn(`Failed to scan agents directory: ${this.basePath}`, error);
    }
  }
}
