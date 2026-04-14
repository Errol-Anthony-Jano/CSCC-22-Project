import { afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import React from 'react';

// Make React available globally for JSX
globalThis.React = React;

afterEach(() => {
  cleanup();
});