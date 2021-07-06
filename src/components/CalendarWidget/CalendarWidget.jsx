import CalendarNavigation from './CalendarNavigation';
import CalendarBody from './CalendarBody';

import './CalendarWidget.scss';

const CalendarWidget = () => {
  return (
    <section className='calendar'>
      <button className='show-today-button'>顯示今日</button>
      <CalendarNavigation />
      <CalendarBody />
    </section>
  );
};

export default CalendarWidget;
