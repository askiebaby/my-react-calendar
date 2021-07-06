import './DatePickerInput.scss';

const DatePickerInput = ({ children, onClick, selectedDateFormat = '' }) => {
  return (
    <section>
      <input
        type='text'
        className='datepicker__input'
        placeholder='請選擇日期'
        readOnly
        value={selectedDateFormat}
        onClick={onClick}
      />
      {children}
    </section>
  );
};

export default DatePickerInput;
