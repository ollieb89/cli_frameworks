import fs from 'fs/promises';
import path from 'path';
import glob from 'fast-glob';
import matter from 'gray-matter';
import { SkillDefinition, SkillSchema } from './schemas.js';

export class SkillMapper {
    private skills: Map<string, SkillDefinition> = new Map();

    constructor(private agentsPath: string) {}

    async scan(): Promise<void> {
        const patterns = ['**/skills/**/SKILL.md'];
        const files = await glob(patterns, { cwd: this.agentsPath });

        for (const file of files) {
            const fullPath = path.join(this.agentsPath, file);
            const skill = await this.loadSkill(fullPath);
            if (skill) {
                this.skills.set(skill.id, skill);
            }
        }
    }

    private async loadSkill(filePath: string): Promise<SkillDefinition | null> {
        try {
            const content = await fs.readFile(filePath, 'utf-8');
            const { data, content: body } = matter(content);

            const skillName = data.name || path.basename(path.dirname(filePath));
            
            // Map to SkillDefinition schema
            const rawSkill = {
                id: skillName,
                name: skillName,
                description: data.description || '',
                content: body,
                tool: {
                    name: `use_skill_${skillName}`,
                    description: data.description || `Use the ${skillName} skill knowledge.`,
                    inputSchema: {
                        type: 'object',
                        properties: {
                            query: { type: 'string', description: 'What specifically do you need from this skill?' }
                        }
                    }
                }
            };

            return SkillSchema.parse(rawSkill);
        } catch (error) {
            console.warn(`Failed to load skill at ${filePath}:`, error);
            return null;
        }
    }

    getSkill(id: string): SkillDefinition | undefined {
        return this.skills.get(id);
    }

    listSkills(): SkillDefinition[] {
        return Array.from(this.skills.values());
    }
}
