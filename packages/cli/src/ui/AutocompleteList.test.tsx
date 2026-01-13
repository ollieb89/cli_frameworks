import React from 'react';
import { render } from 'ink-testing-library';
import { AutocompleteList } from './AutocompleteList.js';
import { CommandDefinition } from '../registry/types.js';
import { describe, it, expect } from 'vitest';

const mockCommands: CommandDefinition[] = [
    {
        namespace: 'test',
        name: 'cmd1',
        description: 'Description 1',
        handler: async () => {}
    },
    {
        namespace: 'test',
        name: 'cmd2',
        description: 'Description 2',
        handler: async () => {}
    },
    {
        namespace: 'test',
        name: 'cmd3',
        description: 'Description 3',
        handler: async () => {}
    }
];

describe('AutocompleteList', () => {
    it('renders suggestions', () => {
        const { lastFrame } = render(
            <AutocompleteList items={mockCommands} selectedIndex={0} />
        );
        const frame = lastFrame();
        expect(frame).toContain('test:cmd1');
        expect(frame).toContain('test:cmd2');
        expect(frame).toContain('test:cmd3');
        expect(frame).toContain('Description 1');
    });

    it('highlights the selected item', () => {
        const { lastFrame } = render(
            <AutocompleteList items={mockCommands} selectedIndex={1} />
        );
        const frame = lastFrame();
        // The selected item has '❯' prefix and potentially different color/bold 
        // (but ink-testing-library might not show colors easily in toContain)
        expect(frame).toContain('❯ test:cmd2');
        expect(frame).toContain('  test:cmd1');
    });

    it('returns null if no items', () => {
        const { lastFrame } = render(
            <AutocompleteList items={[]} selectedIndex={0} />
        );
        expect(lastFrame()).toBe('');
    });

    it('limits visible items to MAX_ITEMS (5)', () => {
        const manyCommands: CommandDefinition[] = Array.from({ length: 10 }, (_, i) => ({
            namespace: 'test',
            name: `cmd${i}`,
            description: `Desc ${i}`,
            handler: async () => {}
        }));

        const { lastFrame } = render(
            <AutocompleteList items={manyCommands} selectedIndex={0} />
        );
        const frame = lastFrame();
        expect(frame).toContain('test:cmd0');
        expect(frame).toContain('test:cmd4');
        expect(frame).not.toContain('test:cmd5');
    });

    it('scrolls when selectedIndex is beyond MAX_ITEMS', () => {
        const manyCommands: CommandDefinition[] = Array.from({ length: 10 }, (_, i) => ({
            namespace: 'test',
            name: `cmd${i}`,
            description: `Desc ${i}`,
            handler: async () => {}
        }));

        const { lastFrame } = render(
            <AutocompleteList items={manyCommands} selectedIndex={6} />
        );
        const frame = lastFrame();
        expect(frame).not.toContain('test:cmd0');
        expect(frame).toContain('test:cmd2');
        expect(frame).toContain('test:cmd6');
    });
});
