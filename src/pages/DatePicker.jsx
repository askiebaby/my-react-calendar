import React, { useState, useEffect } from 'react';
import CalendarWidget from '../components/CalendarWidget';
import DatePickerInput from '../components/DatePickerInput';

import './DatePicker.scss';

const DatePicker = () => {
  const [isShowCalendar, setIsShowCalendar] = useState(true);
  const [selectedDate, setSelectedDate] = useState({});
  const [selectedDateFormat, setSelectedDateFormat] = useState('2021-04-08');

  const toggleCalendar = () => {
    setIsShowCalendar(!isShowCalendar);
  };

  const handleSelectDate = (date) => {
    setSelectedDate(date);
    setIsShowCalendar(false);
  };

  useEffect(() => {
    const format = Object.keys(selectedDate).length
      ? `${selectedDate.year}-${selectedDate.month + 1}-${selectedDate.date}`
      : '';
    setSelectedDateFormat(format);
  }, [selectedDate]);

  return (
    <section className='datepicker'>
      <DatePickerInput
        selectedDateFormat={selectedDateFormat}
        onClick={toggleCalendar}>
        <div style={{ display: isShowCalendar ? 'block' : 'none' }}>
          <div className='datepicker__close-layer' onClick={toggleCalendar} />
          <CalendarWidget date='2019-12-01' onSelectDate={handleSelectDate} />
        </div>
      </DatePickerInput>
    </section>
  );
};

export default DatePicker;
