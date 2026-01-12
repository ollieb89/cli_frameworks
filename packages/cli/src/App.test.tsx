import React from 'react';
import { render } from 'ink-testing-library';
import { describe, it, expect } from 'vitest';
import { Text } from 'ink';

const SimpleApp = () => <Text>Hello World</Text>;

describe('CLI REPL Basic Rendering', () => {
  it('should render a welcome message', () => {
    const { lastFrame } = render(<SimpleApp />);
    expect(lastFrame()).toContain('Hello World');
  });
});
