import React, { useState, useMemo, useEffect } from 'react';
import { Box, Text, useInput, useApp } from 'ink';
import { parseCommand } from './parser/CommandParser.js';
import { CommandRegistry } from './registry/CommandRegistry.js';
import { HelpSearch } from './ui/HelpSearch.js';
import { ChatView } from './ui/ChatView.js';
import { ProviderFactory } from './utils/ProviderFactory.js';
import { AutocompleteList } from './ui/AutocompleteList.js';
import { CommandDefinition, CommandContext } from './registry/types.js';
import { fuzzyScore } from './utils/fuzzy.js';
import { useTUIStore, PaneType } from './store/tuiStore.js';
import { LeftPane } from './ui/panes/LeftPane.js';
import { CenterPane } from './ui/panes/CenterPane.js';
import { RightPane } from './ui/panes/RightPane.js';
import { FilePreviewModal } from './ui/FilePreviewModal.js';

import path from 'path';
import { AgentRegistry } from '@omnicode/core';

import { useLLMInteraction } from './hooks/useLLMInteraction.js';
import { useTUIStateMachine } from './hooks/useTUIStateMachine.js';

export const App: React.FC = () => {
  const { exit } = useApp();
  
  // Initialize LLM loop
  useLLMInteraction();
  const { submitMessage } = useTUIStateMachine();

  const {
    input, setInput, 
    history, addToHistory, 
    activePane, setActivePane,
    modalFile, setModalFile,
    setAvailableAgents
  } = useTUIStore();

  const [mode, setMode] = useState<'repl' | 'help' | 'chat'>('repl');
// ...
  useEffect(() => {
    setAllCommands(CommandRegistry.list());
    
    // Load Agents
    const agentsPath = path.join(process.cwd(), 'agents');
    const registry = new AgentRegistry(agentsPath);
    registry.scan().then(() => {
        setAvailableAgents(registry.listAgents());
    });
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

  useInput((inputStr: string, key: any) => {
    // If modal is open, let it handle input via its own useInput or block here
    // In Ink, useInput propagates to all. We might want to block global shortcuts if modal is open?
    // Modal uses useInput too. If we don't want Ctrl+P etc to work, we check modalFile.
    if (modalFile) return;

    // Safe Interruption (Ctrl+C)
    if (key.ctrl && inputStr === 'c') {
      const state = useTUIStore.getState().state;
      if (state === 'THINKING' || state === 'EXECUTING') {
        useTUIStore.setState({ state: 'IDLE' }); 
        addToHistory('⚠ Operation Interrupted');
        return;
      }
      
      const now = Date.now();
      if (now - lastCtrlCPress < 500) {
        exit();
      } else {
        setLastCtrlCPress(now);
        addToHistory('Press Ctrl+C again to exit');
      }
      return;
    }

    // Command Palette Toggle (Ctrl+P)
    if (key.ctrl && inputStr === 'p') {
        setIsPaletteOpen(prev => !prev);
        setInput('');
        return;
    }

    // Pane Switching
    if (key.tab && !isAutocompleteOpen && !isPaletteOpen) {
        const panes: PaneType[] = ['left', 'center', 'right'];
        const currentIndex = panes.indexOf(activePane);
        const nextIndex = (currentIndex + 1) % panes.length;
        setActivePane(panes[nextIndex]);
        return;
    }

    if (mode !== 'repl') {
        if (key.escape && mode === 'help') setMode('repl');
        return;
    }

    if (isAutocompleteOpen || isPaletteOpen) {
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
            setIsPaletteOpen(false);
            return;
        }
    }

    if (key.return) {
      if ((isAutocompleteOpen || isPaletteOpen) && suggestions[selectedIndex]) {
          const cmd = suggestions[selectedIndex];
          const hasArgs = cmd.args && cmd.args.length > 0;
          const cmdStr = `/${cmd.namespace}:${cmd.name}`;
          
          if (hasArgs) {
              setInput(cmdStr + ' ');
              setIsAutocompleteOpen(false);
              setIsPaletteOpen(false);
          } else {
              if (mode === 'chat') {
                  submitMessage(cmdStr);
              } else {
                  addToHistory(`❯ ${cmdStr}`);
                  handleExecuteCommand(cmdStr);
              }
              setInput('');
              setIsAutocompleteOpen(false);
              setIsPaletteOpen(false);
          }
          return;
      }

      const text = input.trim();
      if (text) {
          if (mode === 'chat') {
              submitMessage(text);
          } else {
              addToHistory(`❯ ${text}`);
              handleExecuteCommand(text);
          }
          setInput('');
      }
    } else if (key.backspace || key.delete) {
      setInput(input.slice(0, -1));
    } else if (!key.ctrl && !key.meta && !key.return && !key.upArrow && !key.downArrow && !key.leftArrow && !key.rightArrow && !key.tab) {
      setInput(input + inputStr);
    }
  });

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
      <Box paddingX={1} marginBottom={0}>
        <Text bold>
          <Text color="cyan">Omni</Text>
          <Text color="white">Code</Text>
        </Text>
        <Text color="gray"> | </Text>
        <Text color="gray" italic>The Unified AI CLI</Text>
      </Box>

      {modalFile && (
        <FilePreviewModal filePath={modalFile} onClose={() => setModalFile(null)} />
      )}

      <Box flexDirection="row" flexGrow={1} display={modalFile ? 'none' : 'flex'}>
        <LeftPane width="25%" />
        <Box width="50%" flexDirection="column">
            <CenterPane width="100%" />
            {isPaletteOpen && (
                <Box 
                  position="absolute" 
                  marginTop={5} 
                  marginLeft={10} 
                  flexDirection="column" 
                  borderStyle="double" 
                  borderColor="yellow"
                  paddingX={1}
                >
                    <Text bold color="yellow"> COMMAND PALETTE </Text>
                    <AutocompleteList items={suggestions} selectedIndex={selectedIndex} />
                </Box>
            )}
            {!isPaletteOpen && isAutocompleteOpen && (
                <Box position="absolute" marginTop={15} marginLeft={5}>
                  <AutocompleteList items={suggestions} selectedIndex={selectedIndex} />
                </Box>
            )}
        </Box>
        <RightPane width="25%" />
      </Box>
      
      <Box paddingX={1} justifyContent="space-between">
        <Text color="gray">Tab: Switch Pane | Ctrl+P: Palette | Ctrl+C: Interrupt</Text>
        <Text color="gray">v0.1.0</Text>
      </Box>
    </Box>
  );
};