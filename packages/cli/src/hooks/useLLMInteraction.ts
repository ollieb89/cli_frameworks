import { useEffect } from 'react';
import { useTUIStore } from '../store/tuiStore.js';
import { AgentExecutor, AgentRegistry, ProviderRegistry, SkillMapper } from '@omnicode/core';
import path from 'path';

export const useLLMInteraction = () => {
  const { 
    state, setState, 
    messages, addMessage, 
    activeAgentId, setActiveAgentId,
    setThinking, addThought, clearThoughts 
  } = useTUIStore();

  useEffect(() => {
    if (state === 'PLANNING') {
        processInteraction();
    }
  }, [state]);

  const processInteraction = async () => {
    const lastMessage = messages[messages.length - 1];
    if (!lastMessage || lastMessage.role !== 'user') {
        setState('IDLE');
        return;
    }

    setThinking(true);
    clearThoughts();
    setState('THINKING');

    try {
        const agentsPath = path.join(process.cwd(), 'agents');
        // ProviderRegistry methods are static
        const provider = ProviderRegistry.getDefault();
        
        let responseText = '';

        if (activeAgentId) {
            addThought(`Loading Agent: ${activeAgentId}`);
            const registry = new AgentRegistry(agentsPath);
            await registry.scan();
            const agentDef = registry.getAgent(activeAgentId);
            
            if (agentDef) {
                addThought(`Persona: ${agentDef.name}`);
                const mapper = new SkillMapper(agentsPath);
                await mapper.scan();
                
                const executor = new AgentExecutor(agentDef, provider, mapper);
                
                addThought('Thinking...');
                // Use execute for now to get the full final response including tool loop
                responseText = await executor.execute(lastMessage.content);
            } else {
                responseText = `Error: Agent "${activeAgentId}" not found.`;
                setActiveAgentId(null);
            }
        } else {
            addThought('Consulting OmniAgent...');
            const res = await provider.chat(messages.map(m => ({ 
                role: m.role as any, 
                content: m.content 
            })));
            responseText = res.content;
        }

        addMessage({ role: 'assistant', content: responseText });
        setState('IDLE');
    } catch (e: any) {
        addMessage({ role: 'assistant', content: `Error: ${e.message}` });
        setState('ERROR');
    } finally {
        setThinking(false);
    }
  };
};
