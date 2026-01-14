import React from 'react';
import { Box, Text } from 'ink';

interface FALSwitcherProps {
  provider: string;
}

export const FALSwitcher: React.FC<FALSwitcherProps> = ({ provider }) => {
  const getProviderStyle = () => {
    const p = provider.toLowerCase();
    if (p.includes('gemini')) return { color: 'blue', text: 'GEMINI' };
    if (p.includes('claude')) return { color: 'red', text: 'CLAUDE' };
    if (p.includes('openai')) return { color: 'green', text: 'OPENAI' };
    return { color: 'white', text: provider.toUpperCase() };
  };

  const style = getProviderStyle();

  return (
    <Box paddingX={1} borderStyle="round" borderColor={style.color}>
      <Text color={style.color} bold>{style.text}</Text>
    </Box>
  );
};
