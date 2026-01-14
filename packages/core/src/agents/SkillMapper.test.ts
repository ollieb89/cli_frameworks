import { describe, it, expect, vi, beforeEach } from 'vitest';
import { SkillMapper } from './SkillMapper.js';
import fs from 'fs/promises';
import glob from 'fast-glob';

vi.mock('fs/promises');
vi.mock('fast-glob');

describe('SkillMapper', () => {
  let mapper: SkillMapper;

  beforeEach(() => {
    mapper = new SkillMapper('/mock/agents');
    vi.clearAllMocks();
  });

  it('should scan and load skills using glob', async () => {
    vi.mocked(glob).mockResolvedValue(['backend/skills/api/SKILL.md'] as any);
    
    const mockSkillContent = `---
name: api-design
description: Master API design
---
# API Design
Detailed content.
`;
    vi.mocked(fs.readFile).mockResolvedValue(mockSkillContent);

    await mapper.scan();

    const skill = mapper.getSkill('api-design');
    expect(skill).toBeDefined();
    expect(skill?.name).toBe('api-design');
    expect(skill?.description).toBe('Master API design');
    // Verify it generates a tool definition
    expect(skill?.tool).toBeDefined();
    expect(skill?.tool.name).toBe('use_skill_api-design');
  });

  it('should return undefined for unknown skill', () => {
      expect(mapper.getSkill('unknown')).toBeUndefined();
  });
});
