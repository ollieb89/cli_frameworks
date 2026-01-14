import React, { useState, useEffect } from 'react';
import { Box, Text, useInput } from 'ink';
import { readFile } from 'fs/promises';

interface FilePreviewModalProps {
  filePath: string | null;
  onClose: () => void;
}

export const FilePreviewModal: React.FC<FilePreviewModalProps> = ({ filePath, onClose }) => {
  const [content, setContent] = useState<string>('Loading...');
  const [error, setError] = useState<string | null>(null);

  useInput((input, key) => {
    if (key.escape || input === 'q') {
      onClose();
    }
  });

  useEffect(() => {
    if (!filePath) return;

    const load = async () => {
      try {
        const data = await readFile(filePath, 'utf-8');
        setContent(data);
        setError(null);
      } catch (err: any) {
        setError(err.message);
        setContent('');
      }
    };
    load();
  }, [filePath]);

  if (!filePath) return null;

  return (
    <Box 
      position="absolute" 
      width="80%" 
      height="80%" 
      marginTop={2} 
      marginLeft={5}
      borderStyle="double" 
      borderColor="white" 
      flexDirection="column"
      zIndex={999}
    >
      <Box paddingX={1} borderStyle="single" borderBottom={false} borderTop={false} borderLeft={false} borderRight={false}>
        <Text bold>{filePath}</Text>
      </Box>
      <Box padding={1} flexGrow={1} overflowY="hidden">
        {error ? (
          <Text color="red">Error: {error}</Text>
        ) : (
          <Text>{content.slice(0, 1000)}... (truncated)</Text>
        )}
      </Box>
      <Box borderStyle="single" borderTop={true} borderBottom={false} borderLeft={false} borderRight={false} paddingX={1}>
        <Text color="gray">Press Esc or q to close</Text>
      </Box>
    </Box>
  );
};
