import { describe, it, expect } from 'vitest';
import { fuzzyMatch, fuzzyScore } from './fuzzy.js';

describe('fuzzyMatch', () => {
  it('should match exact strings', () => {
    expect(fuzzyMatch('help', 'help')).toBe(true);
  });

  it('should match prefix strings', () => {
    expect(fuzzyMatch('he', 'help')).toBe(true);
  });

  it('should match scattered characters in order', () => {
    expect(fuzzyMatch('hlp', 'help')).toBe(true);
  });

  it('should not match if characters are not in order', () => {
    expect(fuzzyMatch('plh', 'help')).toBe(false);
  });

  it('should be case insensitive', () => {
    expect(fuzzyMatch('HELP', 'help')).toBe(true);
    expect(fuzzyMatch('help', 'HELP')).toBe(true);
  });

  it('should return false for empty candidate', () => {
    expect(fuzzyMatch('a', '')).toBe(false);
  });

  it('should return true for empty input', () => {
    expect(fuzzyMatch('', 'any')).toBe(true);
  });
});

describe('fuzzyScore', () => {
  it('should return higher score for exact match', () => {
    const s1 = fuzzyScore('help', 'help');
    const s2 = fuzzyScore('help', 'help me');
    expect(s1).toBeGreaterThan(s2);
  });

  it('should return higher score for prefix match', () => {
    const s1 = fuzzyScore('he', 'help');
    const s2 = fuzzyScore('he', 'the help');
    expect(s1).toBeGreaterThan(s2);
  });

  it('should return higher score for consecutive characters', () => {
    const s1 = fuzzyScore('he', 'hello');
    const s2 = fuzzyScore('he', 'h_e_l_l_o');
    expect(s1).toBeGreaterThan(s2);
  });
});
