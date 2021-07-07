import React, { useState, useEffect, useCallback } from 'react';
import CalendarWidget from '../../components/CalendarWidget';
import DatePickerInput from '../../components/DatePickerInput';

import './DatePickerPage.scss';

const DatePickerPage = () => {
  const [isShowCalendar, setIsShowCalendar] = useState(true);
  const [selectedDate, setSelectedDate] = useState({});
  const [selectedDateFormat, setSelectedDateFormat] = useState('2021-04-08');

  const handleToggleCalendar = useCallback(() => {
    setIsShowCalendar(!isShowCalendar);
  }, [isShowCalendar]);

  const handleSelectDate = useCallback((date) => {
    setSelectedDate(date);
    setIsShowCalendar(false);
  }, []);

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
        onClick={handleToggleCalendar}>
        <div style={{ display: isShowCalendar ? 'block' : 'none' }}>
          <div
            className='datepicker__close-layer'
            onClick={handleToggleCalendar}
          />
          <CalendarWidget date='2019-12-01' onSelectDate={handleSelectDate} />
        </div>
      </DatePickerInput>
    </section>
  );
};

export default DatePickerPage;
