import React, { useState } from 'react';
import { Box, Text } from 'ink';
import TextInput from 'ink-text-input';
import { CommandDefinition } from '../registry/types.js';

interface Props {
  commands: CommandDefinition[];
}

export const HelpSearch: React.FC<Props> = ({ commands }) => {
  const [query, setQuery] = useState('');

  const filtered = commands.filter(cmd => 
    cmd.name.toLowerCase().includes(query.toLowerCase()) || 
    cmd.namespace.toLowerCase().includes(query.toLowerCase()) ||
    cmd.description.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <Box flexDirection="column" padding={1}>
      <Box marginBottom={1}>
        <Text bold color="cyan">Search Commands: </Text>
        <TextInput value={query} onChange={setQuery} />
      </Box>
      
      <Box flexDirection="column">
        {filtered.map(cmd => (
          <Box key={`${cmd.namespace}:${cmd.name}`} marginBottom={1}>
            <Box width={20}>
              <Text color="yellow">{cmd.namespace}:{cmd.name}</Text>
            </Box>
            <Text>{cmd.description}</Text>
          </Box>
        ))}
      </Box>
      
      {filtered.length === 0 && (
        <Text color="red">No commands found matching "{query}"</Text>
      )}
    </Box>
  );
};
