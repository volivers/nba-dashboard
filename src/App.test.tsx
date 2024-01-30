import { render, screen } from '@testing-library/react';
import App from './App';

jest.mock('./components/Header/Header', () => () => <div>Header</div>);

jest.mock('./components/Dashboard/Dashboard', () => () => <div>Dashboard</div>);

describe('App', () => {
  it('renders the header', () => {
    render(<App />);

    expect(screen.getByText(/Header/)).toBeInTheDocument();
  });

  it('renders the dashboard', () => {
    render(<App />);

    expect(screen.getByText(/Dashboard/)).toBeInTheDocument();
  });
});
