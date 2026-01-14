import React from 'react';
import { Box, Text, useInput } from 'ink';

interface ContextWellProps {
  files: string[];
  isActive?: boolean;
  selectedIndex?: number;
  onSelect?: (index: number) => void;
  onOpen?: (file: string) => void;
}

export const ContextWell: React.FC<ContextWellProps> = ({ 
  files, 
  isActive = false, 
  selectedIndex = 0,
  onSelect,
  onOpen
}) => {
  useInput((input, key) => {
    if (!isActive || files.length === 0) return;

    if (key.upArrow) {
      const newIndex = Math.max(0, selectedIndex - 1);
      onSelect?.(newIndex);
    }

    if (key.downArrow) {
      const newIndex = Math.min(files.length - 1, selectedIndex + 1);
      onSelect?.(newIndex);
    }

    if (key.return) {
      // Enter -> View/Open logic (Phase 3 Task 2)
      // For now we just mock or ignore, but implementation is needed for Task 2.
      // Task 1 is just navigation.
    }
    
    if (input === 'o') {
       onOpen?.(files[selectedIndex]);
    }
  });

  return (
    <Box flexDirection="column">
      <Box marginBottom={1}>
        <Text bold>📂 CONTEXT WELL</Text>
      </Box>
      {files.length === 0 ? (
        <Text color="gray">  No files in context</Text>
      ) : (
        files.map((file, i) => {
          const isSelected = i === selectedIndex;
          return (
            <Text key={i} wrap="truncate-middle" color={isSelected && isActive ? 'cyan' : 'white'}>
              {isSelected && isActive ? '> ' : '  • '}
              {file}
            </Text>
          );
        })
      )}
    </Box>
  );
};