import React, { useState } from 'react';
import { Box, Text, useInput } from 'ink';
import { parseCommand } from './parser/CommandParser.js';
import { handleDevStatus } from './commands/dev/status.js';

export const App: React.FC = () => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>(['Welcome to Gemini CLI Suite']);

  useInput((inputStr: string, key: any) => {
    if (key.return) {
      const commandText = input.trim();
      setHistory(prev => [...prev, `> ${commandText}`]);
      
      const parsed = parseCommand(commandText);
      if (parsed) {
        if (parsed.namespace === 'dev' && parsed.command === 'status') {
          const output = handleDevStatus();
          setHistory(prev => [...prev, ...output.split('\n')]);
        } else {
           setHistory(prev => [...prev, `Unknown command: ${parsed.namespace}:${parsed.command}`]);
        }
      } else {
        if (commandText.startsWith('/')) {
             setHistory(prev => [...prev, 'Invalid command format. Use /namespace:command']);
        }
        // Normal text input handling could go here
      }
      
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
