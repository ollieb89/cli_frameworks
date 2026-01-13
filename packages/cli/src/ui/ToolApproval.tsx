import React, { useState } from 'react';
import { Box, Text, useInput } from 'ink';

export type ToolAction = 'allow' | 'always' | 'deny';

interface ToolApprovalProps {
  toolName: string;
  serverId: string;
  args: any;
  onAction: (action: ToolAction) => void;
}

export const ToolApproval: React.FC<ToolApprovalProps> = ({ 
  toolName, 
  serverId, 
  args, 
  onAction 
}) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const options: { label: string; action: ToolAction; color: string }[] = [
    { label: 'Allow Once', action: 'allow', color: 'green' },
    { label: 'Always Allow for Session', action: 'always', color: 'cyan' },
    { label: 'Deny', action: 'deny', color: 'red' }
  ];

  useInput((_input, key) => {
    if (key.upArrow) {
      setSelectedIndex(prev => Math.max(0, prev - 1));
    } else if (key.downArrow) {
      setSelectedIndex(prev => Math.min(options.length - 1, prev + 1));
    } else if (key.return) {
      onAction(options[selectedIndex].action);
    }
  });

  return (
    <Box flexDirection="column" borderStyle="double" borderColor="yellow" padding={1} marginY={1}>
      <Box marginBottom={1}>
        <Text bold>🛡️ Security Gate: Tool Execution Request</Text>
      </Box>
      
      <Box flexDirection="column" marginBottom={1}>
        <Text>The AI agent wants to execute a tool from an MCP server.</Text>
        <Box marginTop={1}>
          <Text color="cyan">Server: </Text>
          <Text bold>{serverId}</Text>
        </Box>
        <Box>
          <Text color="cyan">Tool:   </Text>
          <Text bold>{toolName}</Text>
        </Box>
        <Box marginTop={1} flexDirection="column">
          <Text color="gray">Arguments:</Text>
          <Text dimColor>{JSON.stringify(args, null, 2)}</Text>
        </Box>
      </Box>

      <Box flexDirection="column">
        {options.map((option, index) => (
          <Text key={option.action} color={index === selectedIndex ? option.color : undefined}>
            {index === selectedIndex ? '❯ ' : '  '}
            {option.label}
          </Text>
        ))}
      </Box>
      
      <Box marginTop={1}>
        <Text color="gray" dimColor>Use ↑/↓ and Enter to select.</Text>
      </Box>
    </Box>
  );
};
