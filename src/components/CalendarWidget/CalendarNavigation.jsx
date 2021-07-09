import React, { useMemo, useCallback } from 'react';
import { calendarInternational } from '../../config/calendar';
const { months } = calendarInternational;

const CalendarNavigation = ({
  calendar = {},
  onChangeNavigationMonth,
  onChangeNavigationYear,
  onChangeViewMode,
}) => {
  const getNavigationDisplay = useCallback((cal) => {
    if (cal.mode === 'day') {
      return `${months.en[cal.month].slice(0, 3)} ${cal.year}`;
    } else if (cal.mode === 'month') {
      return cal.year;
    } else if (cal.mode === 'year') {
      const flooredYear = Math.floor(cal.year / 10) * 10;
      return `${flooredYear} - ${flooredYear + 9}`;
    }
  }, []);

  const navigationDisplay = useMemo(() => {
    return getNavigationDisplay(calendar);
  }, [calendar, getNavigationDisplay]);

  const handleClickNavigation = useCallback(
    (viewMode = 'day', action = 'next') => {
      const operator = action === 'next' ? 1 : -1;

      switch (viewMode) {
        case 'day':
          onChangeNavigationMonth(operator * 1);
          break;

        case 'month':
          onChangeNavigationYear(operator * 1);
          break;

        case 'year':
        default:
          onChangeNavigationYear(operator * 10);
          break;
      }
    },
    [onChangeNavigationMonth, onChangeNavigationYear]
  );

  return (
    <nav className='calendar__nav'>
      {/* 控制區塊：上一月 */}
      <div className='calendar__nav__month-controller'>
        <button
          className='calendar__nav__prev'
          onClick={() => handleClickNavigation(calendar.mode, 'prev')}></button>
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
          onClick={() => handleClickNavigation(calendar.mode, 'next')}></button>
      </div>
    </nav>
  );
};

export default CalendarNavigation;
