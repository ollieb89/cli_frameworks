import { CommandDefinition } from '../../registry/types.js';
import { AgentRegistry, AgentExecutor, SkillMapper, ProviderRegistry } from '@omnicode/core';
import path from 'path';

const runAgentCommand: CommandDefinition = {
  namespace: 'agent',
  name: 'run',
  description: 'Run a specific agent for a task',
  args: [
    { name: 'agentId', description: 'ID of the agent to run', required: true },
    { name: 'task', description: 'The task description', required: true }
  ],
  handler: async (args, context) => {
    const agentsPath = path.join(process.cwd(), 'agents');
    
    // 1. Setup Registry and Loader
    const registry = new AgentRegistry(agentsPath);
    await registry.scan();
    
    const agentDef = registry.getAgent(args.agentId);
    if (!agentDef) {
        context.error(`Agent "${args.agentId}" not found.`);
        return;
    }

    // 2. Setup Skill Mapper
    const skillMapper = new SkillMapper(agentsPath);
    await skillMapper.scan();

    // 3. Setup Provider
    const provider = ProviderRegistry.getDefault();
    if (!provider) {
        context.error('No default provider configured.');
        return;
    }

    // 4. Execute
    context.log(`Running agent "${agentDef.name}" for task: ${args.task}...`);
    const executor = new AgentExecutor(agentDef, provider, skillMapper);
    
    try {
        const response = await executor.execute(args.task);
        context.log('\n--- Agent Response ---');
        context.log(response);
    } catch (e) {
        context.error(`Agent execution failed: ${e}`);
    }
  }
};

export default runAgentCommand;
