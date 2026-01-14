import React from 'react';
import { Box, Text } from 'ink';
import { useTUIStore } from '../../store/tuiStore.js';
import { MCPToolGuard } from '../MCPToolGuard.js';
import { useTUIStateMachine } from '../../hooks/useTUIStateMachine.js';

export const RightPane: React.FC<{ width: string | number }> = ({ width }) => {
  const { activeTool, toolStatus, activePane } = useTUIStore();
  const { approveTool, denyTool } = useTUIStateMachine();
  const isActive = activePane === 'right';

  return (
    <Box 
      flexDirection="column" 
      width={width} 
      borderStyle="single" 
      borderColor={isActive ? "blue" : "gray"}
      paddingX={1}
    >
      <Box marginBottom={1}>
        <Text bold color="green">🛠️ WORKBENCH</Text>
      </Box>

      <MCPToolGuard 
        activeTool={activeTool} 
        status={toolStatus} 
        isActive={isActive}
        onApprove={approveTool}
        onDeny={denyTool}
      />
    </Box>
  );
};