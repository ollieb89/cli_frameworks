import React from 'react';
import { Box, Text, useInput } from 'ink';
import { ToolCall, ToolStatus } from '../store/tuiStore.js';

interface MCPToolGuardProps {
  activeTool: ToolCall | null;
  status: ToolStatus;
  isActive?: boolean;
  onApprove?: () => void;
  onDeny?: () => void;
}

export const MCPToolGuard: React.FC<MCPToolGuardProps> = ({ 
  activeTool, 
  status, 
  isActive = false, 
  onApprove, 
  onDeny 
}) => {
  useInput((input, key) => {
    if (!isActive || status !== 'pending') return;

    if (input === 'y' || input === 'Y') {
      onApprove?.();
    } else if (input === 'n' || input === 'N') {
      onDeny?.();
    }
  });

  if (!activeTool) {
    return (
      <Box flexDirection="column" alignItems="center" justifyContent="center" flexGrow={1}>
        <Text color="gray">  IDLE</Text>
        <Text color="gray">Waiting for tool requests...</Text>
      </Box>
    );
  }

  const getStatusInfo = () => {
    switch (status) {
      case 'pending': return { color: 'yellow', text: 'APPROVAL REQUIRED', icon: '❓' };
      case 'running': return { color: 'blue', text: 'EXECUTING', icon: '⚙️' };
      case 'success': return { color: 'green', text: 'COMPLETED', icon: '✅' };
      case 'error': return { color: 'red', text: 'FAILED', icon: '❌' };
    }
  };

  const info = getStatusInfo();

  return (
    <Box flexDirection="column" padding={1} borderStyle="round" borderColor={info.color}>
      <Box marginBottom={1}>
        <Text bold color={info.color}>{info.icon} {info.text}</Text>
      </Box>

      <Box flexDirection="column" marginBottom={1}>
        <Text>Tool: <Text bold color="cyan">{activeTool.name}</Text></Text>
      </Box>

      <Box flexDirection="column" paddingX={1} borderStyle="single" borderColor="gray">
        <Text color="gray">Arguments:</Text>
        <Text color="white">{JSON.stringify(activeTool.args, null, 2)}</Text>
      </Box>

      {status === 'pending' && (
        <Box marginTop={1} flexDirection="column">
          <Text bold inverse color="yellow"> ACTION REQUIRED </Text>
          <Text> Press <Text bold>y</Text> to approve</Text>
          <Text> Press <Text bold>n</Text> to deny</Text>
        </Box>
      )}
    </Box>
  );
};