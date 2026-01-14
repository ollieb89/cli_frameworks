import { ToolDefinition } from '../provider/ProviderAdapter.js';

export interface InternalTool extends ToolDefinition {
    execute: (args: any) => Promise<any>;
}

export const INTERNAL_TOOLS: Record<string, InternalTool> = {
    summarize_text: {
        name: 'summarize_text',
        description: 'Summarize long text to be more concise.',
        parameters: {
            type: 'object',
            properties: {
                text: { type: 'string', description: 'The text to summarize' },
                maxLength: { type: 'number', description: 'Maximum length of the summary' }
            },
            required: ['text']
        },
        execute: async (args: { text: string, maxLength?: number }) => {
            const limit = args.maxLength || 500;
            if (args.text.length <= limit) return { summary: args.text };
            return { 
                summary: args.text.slice(0, limit) + '...',
                originalLength: args.text.length,
                truncated: true
            };
        }
    },
    read_project_memory: {
        name: 'read_project_memory',
        description: 'Read from the project semantic memory (.serena/memories).',
        parameters: {
            type: 'object',
            properties: {
                query: { type: 'string', description: 'What knowledge are you looking for?' }
            },
            required: ['query']
        },
        execute: async (args: { query: string }) => {
            // Placeholder: In a real implementation, this would search the .serena directory
            return { 
                results: `Information about "${args.query}" found in project memories.`,
                note: 'Integration with Serena MCP pending.'
            };
        }
    }
};
