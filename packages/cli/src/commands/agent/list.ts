import { CommandDefinition } from '../../registry/types.js';
import { AgentRegistry } from '@omnicode/core';
import path from 'path';

const listAgentsCommand: CommandDefinition = {
  namespace: 'agent',
  name: 'list',
  description: 'List all available agents',
  handler: async (args, context) => {
    const agentsPath = path.join(process.cwd(), 'agents');
    const registry = new AgentRegistry(agentsPath);
    await registry.scan();
    
    const agents = registry.listAgents();
    if (agents.length === 0) {
      context.log('No agents found.');
      return;
    }

    context.log('Available Agents:');
    agents.forEach(agent => {
      context.log(`- ${agent.id}: ${agent.name}\n  ${agent.description}`);
    });
  }
};

export default listAgentsCommand;
