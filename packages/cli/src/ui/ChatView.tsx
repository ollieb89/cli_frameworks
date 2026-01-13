import React, { useState, useEffect } from 'react';
import { Box, Text, useInput, useApp } from 'ink';
import TextInput from 'ink-text-input';
import { ProviderAdapter } from '@gemini-cli/core';
import { CommandRegistry } from '../registry/CommandRegistry.js';
import { CommandDefinition } from '../registry/types.js';
import { fuzzyScore } from '../utils/fuzzy.js';
import { AutocompleteList } from './AutocompleteList.js';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface ChatViewProps {
  provider: ProviderAdapter;
  onExit: () => void;
}

export const ChatView: React.FC<ChatViewProps> = ({ provider, onExit }) => {
  const { exit } = useApp();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  
  // Autocomplete State
  const [allCommands, setAllCommands] = useState<CommandDefinition[]>([]);
  const [suggestions, setSuggestions] = useState<CommandDefinition[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isAutocompleteOpen, setIsAutocompleteOpen] = useState(false);

  useEffect(() => {
    setAllCommands(CommandRegistry.list());
  }, []);

  useEffect(() => {
    if (input.startsWith('/')) {
        const query = input.slice(1);
        // If query contains space, we stop autocomplete (assume typing args)
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
  }, [input, allCommands]);

  useInput((_, key) => {
    if (key.escape) {
      if (isAutocompleteOpen) {
          setIsAutocompleteOpen(false);
      } else {
          onExit();
      }
    }
    
    if (isAutocompleteOpen) {
        if (key.upArrow) {
            setSelectedIndex(prev => Math.max(0, prev - 1));
        }
        if (key.downArrow) {
            setSelectedIndex(prev => Math.min(suggestions.length - 1, prev + 1));
        }
    }
  });

  const doSubmit = async (value: string) => {
      if (!value.trim() || isStreaming) return;

      const userMessage: Message = { role: 'user', content: value };
      setMessages(prev => [...prev, userMessage]);
      setInput('');
      setIsStreaming(true);

      const assistantMessage: Message = { role: 'assistant', content: '' };
      setMessages(prev => [...prev, assistantMessage]);

      try {
          await provider.streamMessage(value, (chunk) => {
              setMessages(prev => {
                  const newMessages = [...prev];
                  const last = newMessages[newMessages.length - 1];
                  if (last && last.role === 'assistant') {
                      last.content += chunk.text;
                  }
                  return newMessages;
              });
          });
      } catch (error: any) {
          setMessages(prev => [...prev, { role: 'assistant', content: `Error: ${error.message}` }]);
      } finally {
          setIsStreaming(false);
      }
  };

  const handleExecuteCommand = (cmd: CommandDefinition) => {
      const hasArgs = cmd.args && cmd.args.length > 0;
      const cmdStr = `/${cmd.namespace}:${cmd.name}`;
      
      if (hasArgs) {
          setInput(cmdStr + ' ');
          setIsAutocompleteOpen(false);
      } else {
          // Execute immediately for no-arg commands
          doSubmit(cmdStr);
          setIsAutocompleteOpen(false);
      }
  };

  const handleInputSubmit = () => {
      if (isAutocompleteOpen && suggestions[selectedIndex]) {
          handleExecuteCommand(suggestions[selectedIndex]);
          return;
      }
      doSubmit(input);
  };

  return (
    <Box flexDirection="column" height="100%" padding={1}>
      <Box flexGrow={1} flexDirection="column" marginBottom={1}>
        <Text color="gray">--- Chat Session (ESC to exit) ---</Text>
        {messages.map((m, i) => (
          <Box key={i} marginBottom={1} flexDirection="column">
            <Text color={m.role === 'user' ? 'cyan' : 'green'} bold>
              {m.role === 'user' ? 'You:' : 'Gemini:'}
            </Text>
            <Text>{m.content}</Text>
          </Box>
        ))}
        {isStreaming && <Text color="yellow">Gemini is thinking...</Text>}
      </Box>
      
      {isAutocompleteOpen && (
          <AutocompleteList items={suggestions} selectedIndex={selectedIndex} />
      )}
      
      <Box borderStyle="round" borderColor="cyan" paddingX={1}>
        <Box marginRight={1}>
          <Text color="cyan" bold>❯</Text>
        </Box>
        <TextInput
          value={input}
          onChange={setInput}
          onSubmit={handleInputSubmit}
          placeholder="Type a message or / for commands..."
        />
      </Box>
    </Box>
  );
};