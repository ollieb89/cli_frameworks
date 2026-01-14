import fs from 'fs/promises';
import matter from 'gray-matter';
import { AgentDefinition, AgentSchema } from './schemas.js';

export class AgentLoader {
    static async load(filePath: string): Promise<AgentDefinition> {
        const content = await fs.readFile(filePath, 'utf-8');
        const { data, content: body } = matter(content);

        // Construct the raw agent object
        const rawAgent = {
            ...data,
            systemPrompt: body.trim()
        };

        // Validate against Zod schema
        // .parse will throw if invalid, which satisfies the validation requirement
        const agent = AgentSchema.parse(rawAgent);
        
        return agent;
    }
}