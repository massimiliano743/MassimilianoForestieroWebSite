import { render, screen } from '@testing-library/react';
import App from './App';

// Test esistente
test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

// Nuovo test per il messaggio API
test('mostra il messaggio restituito da /api/hello', async () => {
  const mockMessage = 'Ciao dal server!';
  global.fetch = jest.fn(() => Promise.resolve({
    ok: true,
    json: () => Promise.resolve({ message: mockMessage })
  }));

  render(<App />);

  const msgNode = await screen.findByTestId('api-message');
  expect(msgNode).toHaveTextContent(mockMessage);

  // cleanup fetch mock
  global.fetch.mockClear();
  delete global.fetch;
});
