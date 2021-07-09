import './DatePickerInput.scss';

const DatePickerInput = ({
  children,
  onClick,
  value = '',
  isShowCalendar = false,
  isShowInput = true,
}) => {
  return (
    <section>
      {isShowInput ? (
        <input
          type='text'
          className='datepicker__input'
          placeholder='請選擇日期'
          readOnly
          value={value}
          onClick={onClick}
        />
      ) : null}

      {children}

      {isShowInput && isShowCalendar ? (
        <div className='datepicker__close-layer' onClick={onClick} />
      ) : null}
    </section>
  );
};

export default DatePickerInput;
