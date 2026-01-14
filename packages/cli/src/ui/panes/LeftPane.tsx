import React from 'react';
import { Box, Text } from 'ink';
import { useTUIStore } from '../../store/tuiStore.js';
import { ContextWell } from '../ContextWell.js';
import { FALSwitcher } from '../FALSwitcher.js';
import { openFile } from '../../utils/opener.js';

export const LeftPane: React.FC<{ width: string | number }> = ({ width }) => {
  const { 
    contextFiles, 
    contextSelectedIndex, 
    setContextSelectedIndex, 
    agentName, 
    providerName, 
    activePane,
    setModalFile
  } = useTUIStore();
  
  const isActive = activePane === 'left';

  return (
    <Box 
      flexDirection="column" 
      width={width} 
      borderStyle="single" 
      borderColor={isActive ? "blue" : "gray"}
      paddingX={1}
    >
      <Box marginBottom={1} alignItems="center" justifyContent="space-between">
        <Text bold color="blue">🧠 BRAIN</Text>
        <FALSwitcher provider={providerName} />
      </Box>
      
      <Box flexDirection="column" marginBottom={1}>
        <Text>Agent: <Text color="cyan" bold>{agentName}</Text></Text>
      </Box>

      <ContextWell 
        files={contextFiles} 
        isActive={isActive}
        selectedIndex={contextSelectedIndex}
        onSelect={setContextSelectedIndex}
        onView={setModalFile}
        onOpen={openFile}
      />
    </Box>
  );
};
