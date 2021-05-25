import React from 'react';
import './App.css';
import Config from './Config';
import { HashRouter as Router, Route, Switch, useLocation } from 'react-router-dom';
import { ComponentPage } from './components/ComponentPage';
import { CurrentSongeryContainer } from './components/CurrentSong/CurrentSongeryContainer';

export default function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route path={`/${Config.componentsPath}/currentSongery`}>
            <ComponentPage>
              <CurrentSongeryContainer />
            </ComponentPage>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}
