import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

jest.mock('./api', () => ({
  api: {
    get: jest.fn().mockResolvedValue({ data: [] }),
    post: jest.fn(),
    put: jest.fn(),
    delete: jest.fn(),
  },
}));

test('renders VIA TABLOID heading', () => {
  render(<App />);
  expect(screen.getByText(/VIA TABLOID/i)).toBeInTheDocument();
});

test('renders Add Story form', () => {
  render(<App />);
  expect(screen.getByPlaceholderText(/title/i)).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/content/i)).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /add/i })).toBeInTheDocument();
});
