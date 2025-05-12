import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Request from './index';

describe('Request Component', () => {
  test('renders static text content correctly', () => {
    render(<Request />);
    expect(screen.getByRole('heading', { name: /Ready for your next project\?/i })).toBeInTheDocument();
    expect(screen.getByText(/Sit elit feugiat turpis sed integer integer accumsan turpis\./i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Message/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Request Demo/i })).toBeInTheDocument();
  });

  test('renders form fields with correct attributes', () => {
    render(<Request />);

    const emailInput = screen.getByLabelText(/Email/i);
    expect(emailInput).toBeInTheDocument();
    expect(emailInput).toHaveAttribute('type', 'email');
    expect(emailInput).toHaveAttribute('id', 'email');
    expect(emailInput).toHaveAttribute('name', 'email');
    expect(emailInput).toHaveAttribute('placeholder', 'Enter your email');
    expect(emailInput).toBeRequired();

    const messageTextarea = screen.getByLabelText(/Message/i);
    expect(messageTextarea).toBeInTheDocument();
    expect(messageTextarea).toHaveAttribute('id', 'message');
    expect(messageTextarea).toHaveAttribute('name', 'message');
    expect(messageTextarea).toHaveAttribute('placeholder', 'What are you say ?');
    expect(messageTextarea).toBeRequired();

    const submitButton = screen.getByRole('button', { name: /Request Demo/i });
    expect(submitButton).toBeInTheDocument();
    expect(submitButton).toHaveAttribute('type', 'submit');
  });

  test('has correct aria-label for accessibility on the section', () => {
    render(<Request />);
    expect(screen.getByRole('region', { name: 'Request' })).toBeInTheDocument();
  });

  test('allows typing in form fields', () => {
    render(<Request />);

    const emailInput = screen.getByLabelText(/Email/i);
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    expect(emailInput).toHaveValue('test@example.com');

    const messageTextarea = screen.getByLabelText(/Message/i);
    fireEvent.change(messageTextarea, { target: { value: 'Hello there!' } });
    expect(messageTextarea).toHaveValue('Hello there!');
  });

  test('matches snapshot', () => {
    const { container } = render(<Request />);
    expect(container.firstChild).toMatchSnapshot();
  });
});