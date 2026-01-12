import React, { useState, useMemo } from 'react';
import { Box, Text, useInput } from 'ink';
import { parseCommand } from './parser/CommandParser.js';
import { CommandRegistry } from './registry/CommandRegistry.js';
import { HelpSearch } from './ui/HelpSearch.js';
import { ChatView } from './ui/ChatView.js';
import { ProviderFactory } from './utils/ProviderFactory.js';

export const App: React.FC = () => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>(['Welcome to Gemini CLI Suite']);
  const [mode, setMode] = useState<'repl' | 'help' | 'chat'>('repl');

  const provider = useMemo(() => {
    if (mode === 'chat') {
        try {
            return ProviderFactory.createDefault();
        } catch (e) {
            return null;
        }
    }
    return null;
  }, [mode]);

  useInput((inputStr: string, key: any) => {
    if (mode !== 'repl') return;

    if (key.return) {
      const commandText = input.trim();
      setHistory(prev => [...prev, `> ${commandText}`]);
      
      const parsed = parseCommand(commandText);
      if (parsed) {
        const cmd = CommandRegistry.get(parsed.namespace, parsed.command);
        if (cmd) {
          // Special cases for interactive modes
          if (cmd.namespace === 'global' && cmd.name === 'help' && parsed.args.includes('-i')) {
            setMode('help');
          } else if (cmd.namespace === 'chat' && (cmd.name === 'start' || cmd.aliases?.includes('chat'))) {
            setMode('chat');
          } else {
            // Execute command
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

  if (mode === 'chat') {
    if (!provider) {
        return (
            <Box flexDirection="column" padding={1}>
                <Text color="red">Error: No provider configured.</Text>
                <Text>Please run /auth:login google first.</Text>
                <Box marginTop={1}>
                  <Text color="gray">Press ESC to return to REPL</Text>
                </Box>
            </Box>
        );
    }
    return (
        <ChatView 
            provider={provider} 
            onExit={() => setMode('repl')} 
        />
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
