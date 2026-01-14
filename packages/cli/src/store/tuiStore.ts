import { create } from 'zustand';

export type PaneType = 'left' | 'center' | 'right';

export interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export interface ToolCall {
  name: string;
  args: Record<string, any>;
}

export type ToolStatus = 'pending' | 'running' | 'success' | 'error';

export type TUIState = 'IDLE' | 'PLANNING' | 'THINKING' | 'APPROVAL' | 'EXECUTING' | 'ERROR' | 'PAUSED';

interface TUIStore {
  // Global State
  state: TUIState;
  setState: (state: TUIState) => void;

  // Layout
  activePane: PaneType;
  setActivePane: (pane: PaneType) => void;
  modalFile: string | null;
  setModalFile: (file: string | null) => void;

  // Context (Left Pane)
  contextFiles: string[];
  contextSelectedIndex: number;
  setContextFiles: (files: string[]) => void;
  setContextSelectedIndex: (index: number) => void;
  agentName: string;
  providerName: string;

  // Chat (Center Pane)
  messages: ChatMessage[];
  addMessage: (msg: ChatMessage) => void;
  isThinking: boolean;
  thoughtHistory: string[];
  setThinking: (isThinking: boolean) => void;
  addThought: (thought: string) => void;
  clearThoughts: () => void;

  // Tools (Right Pane)
  activeTool: ToolCall | null;
  toolStatus: ToolStatus;
  setActiveTool: (tool: ToolCall | null) => void;
  setToolStatus: (status: ToolStatus) => void;

  // Input
  input: string;
  setInput: (input: string) => void;
  history: string[];
  addToHistory: (line: string) => void;
}

export const useTUIStore = create<TUIStore>((set) => ({
  state: 'IDLE',
  setState: (state) => set({ state }),

  activePane: 'center',
  setActivePane: (activePane) => set({ activePane }),
  modalFile: null,
  setModalFile: (modalFile) => set({ modalFile }),

  contextFiles: [],
  contextSelectedIndex: 0,
  setContextFiles: (contextFiles) => set({ contextFiles }),
  setContextSelectedIndex: (contextSelectedIndex) => set({ contextSelectedIndex }),
  agentName: 'OmniAgent',
  providerName: 'Gemini',

  messages: [],
  addMessage: (msg) => set((s) => ({ messages: [...s.messages, msg] })),
  isThinking: false,
  thoughtHistory: [],
  setThinking: (isThinking) => set({ isThinking }),
  addThought: (thought) => set((s) => ({ thoughtHistory: [...s.thoughtHistory, thought] })),
  clearThoughts: () => set({ thoughtHistory: [] }),

  activeTool: null,
  toolStatus: 'pending',
  setActiveTool: (activeTool) => set({ activeTool }),
  setToolStatus: (toolStatus) => set({ toolStatus }),

  input: '',
  setInput: (input) => set({ input }),
  history: ['Welcome to OmniCode'],
  addToHistory: (line) => set((s) => ({ history: [...s.history, line] })),
}));