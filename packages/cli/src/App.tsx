import React, { useState, useEffect } from 'react';
import { Box, Text, useInput } from 'ink';

export const App: React.FC = () => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>(['Welcome to Gemini CLI Suite']);

  useInput((inputStr: string, key: any) => {
    if (key.return) {
      setHistory(prev => [...prev, `> ${input}`, `Processing: ${input}...`]);
      setInput('');
    } else if (key.backspace || key.delete) {
      setInput(prev => prev.slice(0, -1));
    } else {
      setInput(prev => prev + inputStr);
    }
  });

  return (
    <Box flexDirection="column" padding={1}>
      <Box flexDirection="column" marginBottom={1}>
        {history.map((line, i) => (
          <Text key={i}>{line}</Text>
        ))}
      </Box>
      <Box>
        <Text color="cyan">❯ </Text>
        <Text>{input}</Text>
      </Box>
    </Box>
  );
};
