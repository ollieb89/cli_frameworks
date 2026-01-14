// @vitest-environment jsdom
import { renderHook, act } from '@testing-library/react';
import { useTUIStateMachine } from './useTUIStateMachine.js';
import { useTUIStore } from '../store/tuiStore.js';
import { describe, it, expect, beforeEach } from 'vitest';

describe('useTUIStateMachine', () => {
  beforeEach(() => {
    useTUIStore.setState({
      state: 'IDLE',
      activePane: 'center',
      messages: [],
    });
  });

  it('should initialize in IDLE state', () => {
    const { result } = renderHook(() => useTUIStateMachine());
    expect(useTUIStore.getState().state).toBe('IDLE');
  });

  it('should transition to PLANNING when a user message is sent', () => {
    const { result } = renderHook(() => useTUIStateMachine());
    
    act(() => {
        result.current.submitMessage('Hello');
    });

    expect(useTUIStore.getState().state).toBe('PLANNING');
    expect(useTUIStore.getState().messages).toHaveLength(1);
    expect(useTUIStore.getState().messages[0].content).toBe('Hello');
  });

  it('should transition to THINKING after PLANNING', () => {
      // simulate router completion? 
      // For now, let's just test direct transitions if exposed, or mock the router trigger
      // If the hook manages transitions, it might expose methods like 'startThinking'
      
      const { result } = renderHook(() => useTUIStateMachine());
      
      act(() => {
          result.current.transitionTo('THINKING');
      });
      
      expect(useTUIStore.getState().state).toBe('THINKING');
  });

  it('should transition to APPROVAL when a tool is called', () => {
      const { result } = renderHook(() => useTUIStateMachine());
      
      act(() => {
          result.current.requestToolApproval({ name: 'test-tool', args: {} });
      });
      
      expect(useTUIStore.getState().state).toBe('APPROVAL');
      expect(useTUIStore.getState().activePane).toBe('right'); // Side effect: Focus Right Pane
      expect(useTUIStore.getState().activeTool).not.toBeNull();
  });
});
