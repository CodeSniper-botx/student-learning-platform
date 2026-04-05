import { render, screen } from '@testing-library/react';
import App from './App';

test('renders home page heading', () => {
  render(<App />);
  const textElement = screen.getByText(/All Books/i);
  expect(textElement).toBeInTheDocument();
});