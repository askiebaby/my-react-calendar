import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';

import AppNavigation from './components/AppNavigation';
import CalendarPage from './pages/CalendarPage';
import DatePickerPage from './pages/DatePickerPage';

import './app.scss';

function App() {
  return (
    <React.StrictMode>
      <Router>
        <AppNavigation />
        <Switch>
          <Route
            exact
            path='/calendar'
            key='calendar'
            render={() => <CalendarPage />}
          />
          <Route
            exact
            path='/date-picker'
            key='date-picker'
            render={() => <DatePickerPage />}
          />

          <Redirect
            to={{
              pathname: '/calendar',
            }}
          />
        </Switch>
      </Router>
    </React.StrictMode>
  );
}

export default App;
