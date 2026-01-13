import React from 'react';
import { Box, Text } from 'ink';
import { CommandDefinition } from '../registry/types.js';

interface AutocompleteListProps {
  items: CommandDefinition[];
  selectedIndex: number;
}

export const AutocompleteList: React.FC<AutocompleteListProps> = ({ items, selectedIndex }) => {
  if (items.length === 0) return null;

  const MAX_ITEMS = 5;
  
  // Simple scrolling logic
  let start = 0;
  if (selectedIndex >= MAX_ITEMS) {
      start = selectedIndex - MAX_ITEMS + 1;
  }
  
  const visibleItems = items.slice(start, start + MAX_ITEMS);

  return (
    <Box flexDirection="column" borderStyle="round" borderColor="gray" paddingX={1} marginBottom={0}>
      {visibleItems.map((item, idx) => {
        const realIndex = start + idx;
        const isSelected = realIndex === selectedIndex;
        return (
          <Box key={`${item.namespace}:${item.name}`}>
            <Text color={isSelected ? 'cyan' : 'white'} bold={isSelected}>
              {isSelected ? '❯ ' : '  '}
              {item.namespace}:{item.name}
            </Text>
            <Box marginLeft={2}>
                 <Text color="gray" dimColor>{item.description}</Text>
            </Box>
          </Box>
        );
      })}
    </Box>
  );
};
