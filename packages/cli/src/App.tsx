import React, { useState, useMemo, useEffect } from 'react';
// import { Box, Text, useInput, useApp } from 'ink';
import { Box, Text, useInput, useApp } from 'ink';
// ...
export const App: React.FC = () => {
  const { exit } = useApp();
  const {
    input, setInput, 
    history, addToHistory, 
    activePane, setActivePane 
  } = useTUIStore();

  const [mode, setMode] = useState<'repl' | 'help' | 'chat'>('repl');
  const [lastCtrlCPress, setLastCtrlCPress] = useState(0);

  // Autocomplete & Command Palette State
  const [allCommands, setAllCommands] = useState<CommandDefinition[]>([]);
  const [suggestions, setSuggestions] = useState<CommandDefinition[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isAutocompleteOpen, setIsAutocompleteOpen] = useState(false);
  const [isPaletteOpen, setIsPaletteOpen] = useState(false);

  useEffect(() => {
    setAllCommands(CommandRegistry.list());
  }, []);

  useEffect(() => {
    if (mode === 'repl' && (input.startsWith('/') || isPaletteOpen)) {
        const query = isPaletteOpen ? input : input.slice(1);
        if (!isPaletteOpen && query.includes(' ')) {
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
  }, [input, mode, allCommands, isPaletteOpen]);

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
              log: (msg) => addToHistory(msg),
              error: (msg) => addToHistory(`Error: ${msg}`)
          };

          if (cmd.namespace === 'global' && cmd.name === 'help' && parsed.args.includes('-i')) {
            setMode('help');
          } else if (cmd.namespace === 'chat' && (cmd.name === 'start' || cmd.aliases?.includes('chat'))) {
            setMode('chat');
          } else {
            cmd.handler({ _: parsed.args }, context)
                .then(() => {
                    addToHistory('');
                })
                .catch(err => {
                   addToHistory(`Error: ${err.message}`);
                });
          }
        } else {
           addToHistory(`Unknown command: ${parsed.namespace}:${parsed.command}`);
        }
      } else {
        if (commandText.startsWith('/')) {
             addToHistory('Invalid command format. Use /namespace:command');
        }
      }
  };

  /*
  useInput((inputStr: string, key: any) => {
    // ...
  });
  */

  return null;
  /*
  if (mode === 'help') {
    return (
      <Box flexDirection="row" height="100%">
        <Box width="100%" flexDirection="column" borderStyle="single" borderColor="blue">
            <HelpSearch commands={CommandRegistry.list()} />
        </Box>
      </Box>
    );
  }

  return (
    <Box flexDirection="column" height="100%">
      // ... content
    </Box>
  );
  */
};



