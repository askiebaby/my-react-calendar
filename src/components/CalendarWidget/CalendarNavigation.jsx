import React, { useState, useEffect, useCallback } from 'react';
import { calendarInternational } from '../../config/calendar';
const { months } = calendarInternational;

const CalendarNavigation = ({
  calendar = {},
  onChangeMonth,
  onChangeYear,
  onChangeViewMode,
}) => {
  const [navigationDisplay, setNavigationDisplay] = useState('');

  useEffect(() => {
    let display = '';

    switch (calendar.mode) {
      case 'day': {
        display = `${months.en[calendar.month].slice(0, 3)} ${calendar.year}`;

        break;
      }

      case 'month': {
        display = calendar.year;
        break;
      }

      case 'year':
      default: {
        const flooredYear = Math.floor(calendar.year / 10) * 10;
        display = `${flooredYear} - ${flooredYear + 9}`;
        break;
      }
    }

    setNavigationDisplay(display);
  }, [calendar.mode, calendar.year, calendar.month]);

  const handleChangeNavigation = useCallback(
    (viewMode = 'day', action = 'next') => {
      const operator = action === 'next' ? 1 : -1;

      switch (viewMode) {
        case 'day':
          onChangeMonth(operator * 1);
          break;

        case 'month':
          onChangeYear(operator * 1);
          break;

        case 'year':
        default:
          onChangeYear(operator * 10);
          break;
      }
    },
    [onChangeMonth, onChangeYear]
  );

  return (
    <nav className='calendar__nav'>
      {/* 控制區塊：上一月 */}
      <div className='calendar__nav__month-controller'>
        <button
          className='calendar__nav__prev'
          onClick={() =>
            handleChangeNavigation(calendar.mode, 'prev')
          }></button>
      </div>
      {/* 顯示目前年月，或是選擇後的年月 */}
      <button
        className='calendar__nav__month-year'
        onClick={() => onChangeViewMode(calendar.mode)}>
        {navigationDisplay}
      </button>
      {/* 控制區塊：下一月 */}
      <div className='calendar__nav__month-controller'>
        <button
          className='calendar__nav__next'
          onClick={() =>
            handleChangeNavigation(calendar.mode, 'next')
          }></button>
      </div>
    </nav>
  );
};

export default CalendarNavigation;
