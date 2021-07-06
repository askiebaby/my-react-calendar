import React, { useState, useEffect } from 'react';
import cx from 'classnames';
import { calendarInternational } from '../../config/calendar';
const { months, weekdays } = calendarInternational;

const CalendarBody = ({
  today,
  calendar,
  selectedDate,
  onSelectDate,
  onChangeCalendarMonth,
  onChangeCalendarYear,
}) => {
  const [calendarFirstYear, setCalendarFirstYear] = useState(0);
  const [monthFirstDay, setMonthFirstDay] = useState(0);
  const [calendarFirstDay, setCalendarFirstDay] = useState({});
  const [calendarDays, setCalendarDays] = useState([]);

  useEffect(() => {
    setCalendarFirstYear(Math.floor(calendar.year / 10) * 10 - 1);
  }, [calendar.year]);

  useEffect(() => {
    setMonthFirstDay(new Date(calendar.year, calendar.month, 1).getDay());
  }, [calendar.year, calendar.month]);

  useEffect(() => {
    // 推算日曆第一格
    const date = new Date(calendar.year, calendar.month, 1 - monthFirstDay);

    setCalendarFirstDay({
      year: date.getFullYear(),
      month: date.getMonth(),
      date: date.getDate(),
      day: date.getDay(),
    });
  }, [monthFirstDay, calendar.year, calendar.month]);

  useEffect(() => {
    // 計算應該是幾天
    const monthDays = [];

    for (let date = 0; date < 42; date++) {
      const everyday = new Date(
        calendarFirstDay.year,
        calendarFirstDay.month,
        calendarFirstDay.date + date
      );

      monthDays.push(everyday);
    }

    setCalendarDays(monthDays);
  }, [calendarFirstDay]);

  // 確認是否為當日的日期
  const checkIsToday = (date) => {
    return (
      date.getFullYear() === today.year &&
      date.getMonth() === today.month &&
      date.getDate() === today.date
    );
  };

  // 確認是否為當月的日期
  const checkDayIsInMonth = (date) => {
    return (
      date.getMonth() === calendar.month && date.getFullYear() === calendar.year
    );
  };

  // 確認月份相同
  const checkIsThisMonth = (monthIndex) => {
    return (
      monthIndex === selectedDate.month && calendar.year === selectedDate.year
    );
  };

  // 確認年份相同
  const checkIsThisYear = (yearIndex) => {
    return calendarFirstYear + yearIndex === selectedDate.year;
  };

  // 確認已選的日期
  const checkIsSelected = (date) => {
    return (
      date.getFullYear() === selectedDate.year &&
      date.getMonth() === selectedDate.month &&
      date.getDate() === selectedDate.date
    );
  };

  /**
   * 選擇日期
   * @param week 是週的順序，起始值是 1，最大是 6
   * @param day 是日的順序，起始值是 1，最大是 7
   */
  const handleSelectDate = (day) => {
    onSelectDate({
      date: day,
      isInMonth: checkDayIsInMonth(day),
    });
  };

  return (
    <section className='calendar__body'>
      {calendar.mode === 'day' ? (
        <section>
          {/* weekdays */}
          <div className='calendar__weekdays'>
            {weekdays.en.map((weekday) => (
              <div className='calendar__weekday' key={weekday}>
                {weekday.slice(0, 2)}
              </div>
            ))}
          </div>

          {/* days */}
          {calendarDays.map((day, dayIndex) => (
            <button
              key={dayIndex}
              data-date={day}
              className={cx('calendar__day', {
                calendar__today: checkIsToday(day),
                'calendar__this-month': checkDayIsInMonth(day),
                'calendar__day--selected': checkIsSelected(day),
              })}
              onClick={() => handleSelectDate(day)}>
              {day.getDate()}
            </button>
          ))}
        </section>
      ) : null}

      {/* 月份檢視 */}
      {calendar.mode === 'month' ? (
        <section className='calendar__months'>
          {months.en.map((month, monthIndex) => (
            <span
              key={monthIndex}
              className={cx('calendar__month', {
                'calendar__month--selected': checkIsThisMonth(monthIndex),
              })}>
              <button onClick={() => onChangeCalendarMonth(monthIndex)}>
                {month.slice(0, 3)}
              </button>
            </span>
          ))}
        </section>
      ) : null}

      {/* 年份檢視 */}
      {calendar.mode === 'year' ? (
        <section className='calendar__years'>
          {[...Array(12)].map((year, yearIndex) => {
            return (
              <span
                key={yearIndex}
                className={cx('calendar__year', {
                  'calendar__year--selected': checkIsThisYear(yearIndex),
                })}>
                <button
                  onClick={() =>
                    onChangeCalendarYear(calendarFirstYear + yearIndex)
                  }>
                  {calendarFirstYear + yearIndex}
                </button>
              </span>
            );
          })}
        </section>
      ) : null}
    </section>
  );
};

export default CalendarBody;
