import React from 'react';
import { Box, Text, useInput } from 'ink';

interface ContextWellProps {
  files: string[];
  isActive?: boolean;
  selectedIndex?: number;
  onSelect?: (index: number) => void;
  onOpen?: (file: string) => void;
  onView?: (file: string) => void;
}

export const ContextWell: React.FC<ContextWellProps> = ({ 
  files, 
  isActive = false, 
  selectedIndex = 0,
  onSelect,
  onOpen,
  onView
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
      onView?.(files[selectedIndex]);
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
