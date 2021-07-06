import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';

import AppNavigation from './components/AppNavigation';
import TheCalendar from './pages/TheCalendar';
import DatePicker from './pages/DatePicker';

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
            render={() => <TheCalendar />}
          />
          <Route
            exact
            path='/date-picker'
            key='date-picker'
            render={() => <DatePicker />}
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
