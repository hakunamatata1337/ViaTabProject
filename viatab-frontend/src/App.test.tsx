import React from 'react';
import { render, screen, act } from '@testing-library/react';
import App from './App';

jest.mock('./api', () => ({
  api: {
    get: jest.fn().mockImplementation(() => Promise.resolve({ data: [] })),
    post: jest.fn().mockImplementation(() => Promise.resolve({ data: {} })),
    put: jest.fn().mockImplementation(() => Promise.resolve({ data: {} })),
    delete: jest.fn().mockImplementation(() => Promise.resolve({})),
  },
}));

test('renders VIA TABLOID heading', async () => {
  await act(async () => {
    render(<App />);
  });
  expect(screen.getByText(/VIA TABLOID/i)).toBeInTheDocument();
});

test('renders Add Story form', async () => {
  await act(async () => {
    render(<App />);
  });
  expect(screen.getByPlaceholderText(/title/i)).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/content/i)).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /add/i })).toBeInTheDocument();
});
