import React, { useState } from 'react';
import { Box, Text, useInput } from 'ink';
import { parseCommand } from './parser/CommandParser.js';
import { CommandRegistry } from './registry/CommandRegistry.js';
import { HelpSearch } from './ui/HelpSearch.js';

export const App: React.FC = () => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>(['Welcome to Gemini CLI Suite']);
  const [mode, setMode] = useState<'repl' | 'help'>('repl');

  useInput((inputStr: string, key: any) => {
    if (mode === 'help') {
      if (key.escape) {
        setMode('repl');
      }
      return;
    }

    if (key.return) {
      const commandText = input.trim();
      setHistory(prev => [...prev, `> ${commandText}`]);
      
      const parsed = parseCommand(commandText);
      if (parsed) {
        const cmd = CommandRegistry.get(parsed.namespace, parsed.command);
        if (cmd) {
          // Special case for interactive help
          if (cmd.namespace === 'global' && cmd.name === 'help' && parsed.args.includes('-i')) {
            setMode('help');
          } else {
            // Execute command
            // Note: handlers currently log to console. In Ink, we might want to capture this.
            // For now, we assume they log correctly.
            cmd.handler({ _: parsed.args }).catch(err => {
               setHistory(prev => [...prev, `Error: ${err.message}`]);
            });
          }
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

  if (mode === 'help') {
    return (
      <Box flexDirection="column">
        <HelpSearch commands={CommandRegistry.list()} />
        <Box paddingX={1}>
          <Text color="gray">Press ESC to exit help</Text>
        </Box>
      </Box>
    );
  }

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