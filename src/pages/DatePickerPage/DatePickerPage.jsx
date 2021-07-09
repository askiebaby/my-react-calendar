import React, { useState, useMemo, useEffect, useCallback } from 'react';
import CalendarWidget from '../../components/CalendarWidget';

import './DatePickerPage.scss';

const DatePickerPage = () => {
  const defaultDate = useMemo(() => ({ year: 2021, month: 3, date: 8 }), []);
  const [selectedDate, setSelectedDate] = useState(defaultDate);

  const userInputDate = useMemo(() => {
    const format = Object.keys(selectedDate).length
      ? `${selectedDate.year}-${selectedDate.month + 1}-${selectedDate.date}`
      : '';
    return format;
  }, [selectedDate]);

  const handleChangeDate = useCallback((date) => {
    setSelectedDate(date);
  }, []);

  return (
    <section className='datepicker'>
      <CalendarWidget
        userInputDate={userInputDate}
        onChange={handleChangeDate}
      />
    </section>
  );
};

export default DatePickerPage;
