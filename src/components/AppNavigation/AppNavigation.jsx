import { Link, useLocation } from 'react-router-dom';
import './AppNavigation.scss';

const AppNavigation = () => {
  const location = useLocation();

  const getRouteClass = (pathname) => {
    return pathname === location.pathname ? 'exact' : null;
  };

  return (
    <nav className='app-navigation'>
      <Link to='/calendar' className={getRouteClass('/calendar')}>
        Task 1: Calendar
      </Link>
      <Link to='/date-picker' className={getRouteClass('/date-picker')}>
        Task 2: Date Picker
      </Link>
    </nav>
  );
};

export default AppNavigation;
