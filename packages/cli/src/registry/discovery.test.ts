import { describe, it, expect, vi } from 'vitest';
import { discoverCommands } from './discovery.js';
import fg from 'fast-glob';
import path from 'path';

vi.mock('fast-glob');

describe('Command Discovery', () => {
  it('should find command files using glob', async () => {
    const mockFiles = ['commands/global/help.js', 'commands/dev/status.js'];
    (fg as unknown as ReturnType<typeof vi.fn>).mockResolvedValue(mockFiles);

    // Mock dynamic import
    // Since we can't easily mock dynamic import() in ESM with Vitest without complex setup,
    // we might refactor discovery to take a loader function or focus on the glob part.
    // For this test, we verify the glob is called correctly.
    
    // Actually, to test the full flow including loading, we'd need to mock the modules.
    // Let's first test that it globs the right pattern.
    
    await discoverCommands(path.resolve('src/commands'));
    
    expect(fg).toHaveBeenCalledWith('**/*.{ts,js}', expect.objectContaining({
      cwd: expect.stringContaining('src/commands'),
      absolute: true
    }));
  });
});
