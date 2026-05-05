import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders VIA TABLOID heading', () => {
  render(<App />);
  expect(screen.getByText(/VIA TABLOID/i)).toBeInTheDocument();
});

test('renders Add Story form', () => {
  render(<App />);
  expect(screen.getByPlaceholderText(/Title/i)).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/Content/i)).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /add/i })).toBeInTheDocument();
});
