import React from 'react';
import { Box, Text, Static } from 'ink';
import { ChatMessage } from '../store/tuiStore.js';

interface ChatStreamProps {
  messages: ChatMessage[];
  history: string[];
}

export const ChatStream: React.FC<ChatStreamProps> = React.memo(({ messages, history }) => {
  // Static handles items that won't change, which is perfect for chat history
  // history items are usually added and then immutable
  
  const displayHistory = history.slice(-50);
  const displayMessages = messages;

  return (
    <Box flexDirection="column" flexGrow={1}>
      <Static items={displayHistory}>
        {(line, i) => (
          <Text key={`hist-${i}`}>{line}</Text>
        )}
      </Static>
      
      {displayMessages.map((msg, i) => (
        <Box key={`msg-${i}`} flexDirection="column" marginTop={1}>
          <Text bold color={msg.role === 'user' ? 'green' : 'cyan'}>
            {msg.role === 'user' ? '❯ USER' : '🤖 AI'}
          </Text>
          <Box paddingLeft={2}>
            <Text>{msg.content}</Text>
          </Box>
        </Box>
      ))}
    </Box>
  );
});

