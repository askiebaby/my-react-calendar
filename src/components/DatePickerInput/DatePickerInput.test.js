import { render, screen, fireEvent } from '@testing-library/react';
import DatePickerInput from './DatePickerInput';

describe('DatePickerInput', () => {
  test('Render datepicker value from user user input', () => {
    render(<DatePickerInput selectedDateFormat='2020-10-10' />);
    const userInputDate = screen.getByDisplayValue(/2020-10-10/i);
    expect(userInputDate).toBeInTheDocument();
  });

  test('Render child component', () => {
    render(
      <DatePickerInput>
        <div>Children</div>
      </DatePickerInput>
    );

    const childComponent = screen.getByText(/Children/i);
    expect(childComponent).toBeInTheDocument();
  });

  test('Click datepicker input', () => {
    const onClick = jest.fn();
    render(<DatePickerInput onClick={onClick} />);

    const input = screen.getByRole('textbox');
    fireEvent.click(input);

    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
