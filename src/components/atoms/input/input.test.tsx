import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Input } from './input';

describe('Input', () => {
  test('should update input value with given value from user', async () => {
    const user = userEvent.setup();
    render(<Input label="email" />);
    const textbox = screen.getByRole('textbox');

    await user.type(textbox, 'text');

    expect(textbox).toHaveValue('text');
  });

  test('should call onChange with raw value', async () => {
    const user = userEvent.setup();
    const onChange = jest.fn();
    render(<Input onValueChange={onChange} label="email" />);
    const textbox = screen.getByRole('textbox');

    await user.type(textbox, 'typed value');

    expect(onChange).toHaveBeenLastCalledWith('typed value');
  });
});
