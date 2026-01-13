import React, { useState, useMemo, useEffect } from 'react';
import { Box, Text, useInput } from 'ink';
import { parseCommand } from './parser/CommandParser.js';
import { CommandRegistry } from './registry/CommandRegistry.js';
import { HelpSearch } from './ui/HelpSearch.js';
import { ChatView } from './ui/ChatView.js';
import { ProviderFactory } from './utils/ProviderFactory.js';
import { AutocompleteList } from './ui/AutocompleteList.js';
import { CommandDefinition, CommandContext } from './registry/types.js';
import { fuzzyScore } from './utils/fuzzy.js';

export const App: React.FC = () => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>(['Welcome to OmniCode']);
  const [mode, setMode] = useState<'repl' | 'help' | 'chat'>('repl');

  // Autocomplete State
  const [allCommands, setAllCommands] = useState<CommandDefinition[]>([]);
  const [suggestions, setSuggestions] = useState<CommandDefinition[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isAutocompleteOpen, setIsAutocompleteOpen] = useState(false);

  useEffect(() => {
    setAllCommands(CommandRegistry.list());
  }, []);

  useEffect(() => {
    if (mode === 'repl' && input.startsWith('/')) {
        const query = input.slice(1);
        if (query.includes(' ')) {
            setIsAutocompleteOpen(false);
            return;
        }
        const matches = allCommands
            .map(cmd => ({ cmd, score: fuzzyScore(query, `${cmd.namespace}:${cmd.name}`) }))
            .filter(x => x.score > -500)
            .sort((a, b) => b.score - a.score)
            .map(x => x.cmd);
        
        setSuggestions(matches);
        setIsAutocompleteOpen(matches.length > 0);
        setSelectedIndex(0);
    } else {
        setIsAutocompleteOpen(false);
    }
  }, [input, mode, allCommands]);

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

  const handleExecuteCommand = (commandText: string) => {
      const parsed = parseCommand(commandText);
      if (parsed) {
        const cmd = CommandRegistry.get(parsed.namespace, parsed.command);
        if (cmd) {
          const context: CommandContext = {
              log: (msg) => setHistory(prev => [...prev, ...msg.split('\n')]),
              error: (msg) => setHistory(prev => [...prev, `Error: ${msg}`])
          };

          if (cmd.namespace === 'global' && cmd.name === 'help' && parsed.args.includes('-i')) {
            setMode('help');
          } else if (cmd.namespace === 'chat' && (cmd.name === 'start' || cmd.aliases?.includes('chat'))) {
            setMode('chat');
          } else {
            cmd.handler({ _: parsed.args }, context)
                .then(() => {
                    setHistory(prev => [...prev, '']);
                })
                .catch(err => {
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
  };

  useInput((inputStr: string, key: any) => {
    if (mode !== 'repl') {
        if (key.escape && mode === 'help') setMode('repl');
        return;
    }

    if (isAutocompleteOpen) {
        if (key.upArrow) {
            setSelectedIndex(prev => Math.max(0, prev - 1));
            return;
        }
        if (key.downArrow) {
            setSelectedIndex(prev => Math.min(suggestions.length - 1, prev + 1));
            return;
        }
        if (key.escape) {
            setIsAutocompleteOpen(false);
            return;
        }
    }

    if (key.return) {
      if (isAutocompleteOpen && suggestions[selectedIndex]) {
          const cmd = suggestions[selectedIndex];
          const hasArgs = cmd.args && cmd.args.length > 0;
          const cmdStr = `/${cmd.namespace}:${cmd.name}`;
          
          if (hasArgs) {
              setInput(cmdStr + ' ');
              setIsAutocompleteOpen(false);
          } else {
              setHistory(prev => [...prev, `❯ ${cmdStr}`]);
              handleExecuteCommand(cmdStr);
              setInput('');
              setIsAutocompleteOpen(false);
          }
          return;
      }

      const commandText = input.trim();
      if (commandText) {
          setHistory(prev => [...prev, `❯ ${commandText}`]);
          handleExecuteCommand(commandText);
          setInput('');
      }
    } else if (key.backspace || key.delete) {
      setInput(prev => prev.slice(0, -1));
    } else if (key.tab && isAutocompleteOpen && suggestions[selectedIndex]) {
        const cmd = suggestions[selectedIndex];
        setInput(`/${cmd.namespace}:${cmd.name}${cmd.args && cmd.args.length > 0 ? ' ' : ''}`);
        setIsAutocompleteOpen(false);
    } else if (!key.ctrl && !key.meta && !key.return && !key.upArrow && !key.downArrow && !key.leftArrow && !key.rightArrow) {
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
    <Box flexDirection="column" padding={1} height="100%">
      <Box flexGrow={1} flexDirection="column" marginBottom={1}>
        {history.map((line, i) => (
          <Text key={i}>{line}</Text>
        ))}
      </Box>
      
      {isAutocompleteOpen && (
          <AutocompleteList items={suggestions} selectedIndex={selectedIndex} />
      )}

      <Box>
        <Text color="cyan" bold>❯ </Text>
        <Text>{input}</Text>
      </Box>
    </Box>
  );
};
