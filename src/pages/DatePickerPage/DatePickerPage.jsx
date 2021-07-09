import React, { useState, useEffect, useCallback } from 'react';
import CalendarWidget from '../../components/CalendarWidget';

import './DatePickerPage.scss';

const DatePickerPage = () => {
  const [selectedDate, setSelectedDate] = useState({});
  const [userInputDate, setUserInputDate] = useState('2021-04-08');

  const handleSelectDate = useCallback((date) => {
    setSelectedDate(date);
  }, []);

  useEffect(() => {
    const format = Object.keys(selectedDate).length
      ? `${selectedDate.year}-${selectedDate.month + 1}-${selectedDate.date}`
      : '';
    setUserInputDate(format);
  }, [selectedDate]);

  return (
    <section className='datepicker'>
      <CalendarWidget
        userInputDate={userInputDate}
        onSelectDate={handleSelectDate}
      />
    </section>
  );
};

export default DatePickerPage;
