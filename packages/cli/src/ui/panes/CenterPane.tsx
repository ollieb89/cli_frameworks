import React from 'react';
import { Box, Text } from 'ink';
import { useTUIStore } from '../../store/tuiStore.js';
import { ChatStream } from '../ChatStream.js';
import { ThinkingIndicator } from '../ThinkingIndicator.js';

export const CenterPane: React.FC<{ width: string | number }> = ({ width }) => {
  const { messages, input, activePane, history, isThinking, thoughtHistory } = useTUIStore();
  const isActive = activePane === 'center';

  return (
    <Box 
      flexDirection="column" 
      width={width} 
      borderStyle="single" 
      borderColor={isActive ? "blue" : "gray"}
      paddingX={1}
    >
      <Box marginBottom={1}>
        <Text bold color="gray">💬 CONVERSATION</Text>
      </Box>

      <Box flexGrow={1} flexDirection="column" marginBottom={1}>
        <ChatStream messages={messages} history={history} />
        <ThinkingIndicator isThinking={isThinking} history={thoughtHistory} />
      </Box>

      <Box>
        <Text color="cyan" bold>❯ </Text>
        <Text>{input}</Text>
      </Box>
    </Box>
  );
};