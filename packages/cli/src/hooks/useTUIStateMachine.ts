import { useEffect } from 'react';
import { useTUIStore, ToolCall, TUIState } from '../store/tuiStore.js';

export const useTUIStateMachine = () => {
  const { 
    state, 
    setState, 
    addMessage, 
    setActivePane, 
    setActiveTool, 
    setToolStatus 
  } = useTUIStore();

  const submitMessage = (content: string) => {
    addMessage({ role: 'user', content });
    setState('PLANNING');
  };

  const transitionTo = (newState: TUIState) => {
    setState(newState);
  };

  const requestToolApproval = (tool: ToolCall) => {
    setActiveTool(tool);
    setToolStatus('pending');
    setState('APPROVAL');
  };

  const approveTool = () => {
    setToolStatus('running');
    setState('EXECUTING');
    setActivePane('center');
  };

  const denyTool = () => {
    setToolStatus('error');
    setActiveTool(null);
    setState('IDLE'); 
    setActivePane('center');
  };

  // Side Effect: When state becomes APPROVAL, focus the Right Pane
  useEffect(() => {
    if (state === 'APPROVAL') {
      setActivePane('right');
    }
  }, [state, setActivePane]);

  return {
    state,
    submitMessage,
    transitionTo,
    requestToolApproval,
    approveTool,
    denyTool
  };
};