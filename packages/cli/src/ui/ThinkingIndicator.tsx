import React, { useState, useEffect } from 'react';
import { Box, Text } from 'ink';

interface ThinkingIndicatorProps {
  isThinking: boolean;
  history?: string[];
}

export const ThinkingIndicator: React.FC<ThinkingIndicatorProps> = ({ isThinking, history = [] }) => {
  const [dots, setDots] = useState('');

  useEffect(() => {
    if (!isThinking) return;
    
    const interval = setInterval(() => {
      setDots(prev => (prev.length >= 3 ? '' : prev + '.'));
    }, 500);

    return () => clearInterval(interval);
  }, [isThinking]);

  if (!isThinking) return null;

  // Show last 3 items
  const visibleHistory = history.slice(-3);

  return (
    <Box flexDirection="column" marginTop={1}>
      <Text color="yellow">
        🧠 Thinking{dots}
      </Text>
      {visibleHistory.map((step, i) => (
          <Text key={i} color="gray" italic>  • {step}</Text>
      ))}
    </Box>
  );
};