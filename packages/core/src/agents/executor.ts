import { AgentDefinition } from './schemas.js';
import { ProviderAdapter, StreamCallback, ChatMessage, ToolDefinition, ToolCall } from '../provider/ProviderAdapter.js';
import { SkillMapper } from './SkillMapper.js';

export class AgentExecutor {
    private history: ChatMessage[] = [];

    constructor(
        private agent: AgentDefinition, 
        private provider: ProviderAdapter,
        private skillMapper?: SkillMapper
    ) {
        this.history.push({ role: 'system', content: agent.systemPrompt });
    }

    getAgentId(): string {
        return this.agent.id;
    }

    async execute(message: string): Promise<string> {
        this.history.push({ role: 'user', content: message });
        
        const tools = this.getAvailableTools();
        const response = await this.provider.chat(this.history, tools);
        
        this.history.push(response);
        
        // Handle tool calls recursively (basic loop)
        if (response.toolCalls && response.toolCalls.length > 0) {
            for (const tc of response.toolCalls) {
                const result = await this.handleToolCall(tc);
                this.history.push({
                    role: 'tool',
                    content: JSON.stringify(result),
                    toolCallId: tc.toolName
                });
            }
            // After tool results, we should call chat again to get the final response
            const finalResponse = await this.provider.chat(this.history, tools);
            this.history.push(finalResponse);
            return finalResponse.content;
        }

        return response.content;
    }

    async stream(message: string, callback: StreamCallback): Promise<void> {
        this.history.push({ role: 'user', content: message });
        
        const tools = this.getAvailableTools();
        let fullResponse = '';
        
        await this.provider.streamChat(this.history, (chunk) => {
            fullResponse += chunk.text;
            callback(chunk);
        }, tools);
        
        this.history.push({ role: 'assistant', content: fullResponse });
    }

    getHistory(): ChatMessage[] {
        return [...this.history];
    }

    private getAvailableTools(): ToolDefinition[] | undefined {
        if (!this.agent.skills || !this.skillMapper) return undefined;
        
        return this.agent.skills
            .map(id => this.skillMapper?.getSkill(id)?.tool)
            // @ts-ignore - ToolDefinition mapping
            .filter((t): t is ToolDefinition => !!t);
    }

    private async handleToolCall(tc: ToolCall): Promise<any> {
        // For skills, we return the skill content
        if (tc.toolName.startsWith('use_skill_')) {
            const skillId = tc.toolName.replace('use_skill_', '');
            const skill = this.skillMapper?.getSkill(skillId);
            return { 
                content: skill?.content || skill?.description || 'Skill not found',
                name: skill?.name
            };
        }
        return { error: 'Unknown tool' };
    }
}
