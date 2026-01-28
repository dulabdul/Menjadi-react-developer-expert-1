/**
 * test scenario for RegisterInput
 *
 * - RegisterInput component
 * - should handle name typing correctly
 * - should call register function when register button is clicked
 */

import React from 'react';
import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RegisterInput from './RegisterInput';
import { BrowserRouter } from 'react-router-dom';

describe('RegisterInput component', () => {
  afterEach(() => {
    cleanup();
  });

  it('should handle name typing correctly', async () => {
    const { getByPlaceholderText } = render(
      <BrowserRouter>
        <RegisterInput
          register={() => {}}
          isLoading={false}
          errorMessage=''
        />
      </BrowserRouter>,
    );
    const nameInput = getByPlaceholderText('John Doe');

    await userEvent.type(nameInput, 'John Test');

    expect(nameInput).toHaveValue('John Test');
  });

  it('should call register function when register button is clicked', async () => {
    const mockRegister = vi.fn();
    const { getByPlaceholderText, getByRole } = render(
      <BrowserRouter>
        <RegisterInput
          register={mockRegister}
          isLoading={false}
          errorMessage=''
        />
      </BrowserRouter>,
    );

    const nameInput = getByPlaceholderText('John Doe');
    const emailInput = getByPlaceholderText('john@example.com');
    const passwordInput = getByPlaceholderText('••••••');
    const registerButton = getByRole('button', { name: 'Register' });

    await userEvent.type(nameInput, 'John Test');
    await userEvent.type(emailInput, 'test@example.com');
    await userEvent.type(passwordInput, 'password123');
    await userEvent.click(registerButton);

    expect(mockRegister).toHaveBeenCalledWith({
      name: 'John Test',
      email: 'test@example.com',
      password: 'password123',
    });
  });
});
