import React, { useState, useEffect, useRef } from 'react';
import { Box, Text, useInput, useApp } from 'ink';
import TextInput from 'ink-text-input';
import { ProviderAdapter } from '@gemini-cli/core';

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

  const handleSubmit = async () => {
    if (!input.trim() || isStreaming) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsStreaming(true);

    const assistantMessage: Message = { role: 'assistant', content: '' };
    setMessages(prev => [...prev, assistantMessage]);

    try {
        await provider.streamMessage(input, (chunk) => {
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

  useInput((_, key) => {
    if (key.escape) {
      onExit();
    }
  });

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
      
      <Box borderStyle="round" borderColor="cyan" paddingX={1}>
        <Box marginRight={1}>
          <Text color="cyan" bold>❯</Text>
        </Box>
        <TextInput
          value={input}
          onChange={setInput}
          onSubmit={handleSubmit}
          placeholder="Type a message..."
        />
      </Box>
    </Box>
  );
};
