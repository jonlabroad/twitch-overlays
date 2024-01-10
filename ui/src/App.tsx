import React from 'react';
import Config from './Config';
import { HashRouter as Router, Route, Switch, useLocation } from 'react-router-dom';
import { ComponentPage } from './components/ComponentPage';
import { HoagieFollowerAlertContainer } from './components/Follower/HoagieFollowerAlertContainer';
import { TheSongeryOriginalMusicContainer } from './components/TheSongeryOriginalMusic/TheSongeryOriginalMusicContainer';
import { TheSongeryOriginalMusicRavenContainer } from './components/TheSongeryOriginalMusicRaven/TheSongeryOriginalMusicRavenContainer';
import { TheSongeryOriginalMusicBdayContainer } from './components/TheSongeryOriginalMusicRavenBday/TheSongeryOriginalMusicBdayContainer';

import './App.css';

export default function App() {

  return (
      <Router>
        <Switch>
          <Route path={`/${Config.componentsPath}/hoagieFollowerAlert`}>
            <ComponentPage>
              <HoagieFollowerAlertContainer />
            </ComponentPage>
          </Route>
          <Route path={`/${Config.componentsPath}/theSongeryOriginalMusic`}>
            <ComponentPage>
              <TheSongeryOriginalMusicContainer />
            </ComponentPage>
          </Route>
          <Route path={`/${Config.componentsPath}/theSongeryOriginalMusicRaven`}>
            <ComponentPage>
              <TheSongeryOriginalMusicRavenContainer />
            </ComponentPage>
          </Route>
          <Route path={`/${Config.componentsPath}/theSongeryOriginalMusicBday`}>
            <ComponentPage>
              <TheSongeryOriginalMusicBdayContainer />
            </ComponentPage>
          </Route>
        </Switch>
      </Router>
  );
}
