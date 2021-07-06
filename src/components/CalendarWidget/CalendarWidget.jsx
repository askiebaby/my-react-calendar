import React, { useState, useEffect, useCallback } from 'react';
import CalendarNavigation from './CalendarNavigation';
import CalendarBody from './CalendarBody';

import './CalendarWidget.scss';

const CalendarWidget = ({ userInputDate = '', onSelect = () => {} }) => {
  const today = {
    year: new Date().getFullYear(),
    month: new Date().getMonth(),
    date: new Date().getDate(),
  };

  const [calendar, setCalendar] = useState({
    mode: 'day',
    year: 2021,
    month: 0,
  });

  const [selectedDate, setSelectedDate] = useState({});

  const setupDay = useCallback(
    (initDate) => {
      const [yyyy, mm, dd] = initDate.split('-');
      const year = Number(yyyy);
      const month = Number(mm - 1);
      const date = Number(dd);

      setSelectedDate({
        year,
        month,
        date,
      });

      setCalendar({
        ...calendar,
        year,
        month,
      });
    },
    [calendar]
  );

  const setupToday = useCallback(() => {
    const date = new Date();
    const todayDate = `${date.getFullYear()}-${
      date.getMonth() + 1
    }-${date.getDate()}`;

    setCalendar({
      ...calendar,
      mode: 'day',
    });

    setupDay(todayDate);

    onSelect({ selectedDate });
  }, [calendar, selectedDate, onSelect, setupDay]);

  useEffect(() => {
    if (typeof userInputDate === 'string' && userInputDate) {
      setupDay(userInputDate);
    } else {
      // 初始化
      setupToday();
    }
  }, [userInputDate]);

  const handleChangeViewMode = () => {
    switch (calendar.mode) {
      case 'day': {
        setCalendar({
          ...calendar,
          mode: 'month',
        });

        break;
      }

      case 'month': {
        setCalendar({
          ...calendar,
          mode: 'year',
        });

        break;
      }

      default:
        break;
    }
  };

  /**
   * 切換西元年
   * @param yearNum 上一年、下一年
   */
  const handleChangeYear = (yearNum) => {
    const date = new Date(`${calendar.year}-${calendar.month + 1}`);

    date.setFullYear(date.getFullYear() + yearNum);
    setCalendar({
      ...calendar,
      year: date.getFullYear(),
    });
  };

  /**
   * 切換月份
   * @param monthNum 上個月、下個月
   */
  const handleChangeMonth = (monthNum) => {
    const date = new Date(`${calendar.year}-${calendar.month + 1}`);

    date.setMonth(date.getMonth() + monthNum);
    setCalendar({
      ...calendar,
      month: date.getMonth(),
      year: date.getFullYear(),
    });
  };

  /**
   * 設定月份
   * @param monthIndex 第幾個月
   */
  const handleChangeCalendarMonth = (monthIndex) => {
    setCalendar({
      ...calendar,
      month: monthIndex,
      mode: 'day',
    });
  };

  /**
   * 設定年份
   * @param year 經子層傳上來的年份
   */
  const handleChangeCalendarYear = (year) => {
    setCalendar({
      ...calendar,
      year,
      mode: 'month',
    });
  };

  const handleSelectDate = ({ date, isInMonth }) => {
    if (!isInMonth) {
      setCalendar({
        ...calendar,
        year: date.getFullYear(),
        month: date.getMonth(),
      });
    }

    const userSelectedDate = {
      year: date.getFullYear(),
      month: date.getMonth(),
      date: date.getDate(),
    };

    setSelectedDate(userSelectedDate);

    onSelect({
      selectedDate: userSelectedDate,
    });
  };

  return (
    <section className='calendar'>
      <button className='show-today-button' onClick={setupToday}>
        顯示今日
      </button>
      <CalendarNavigation
        calendar={calendar}
        onChangeMonth={handleChangeMonth}
        onChangeYear={handleChangeYear}
        onChangeViewMode={handleChangeViewMode}
      />
      <CalendarBody
        today={today}
        calendar={calendar}
        selectedDate={selectedDate}
        onSelectDate={handleSelectDate}
        onChangeCalendarMonth={handleChangeCalendarMonth}
        onChangeCalendarYear={handleChangeCalendarYear}
      />
    </section>
  );
};

export default CalendarWidget;
