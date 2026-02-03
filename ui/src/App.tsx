import React from 'react';
import Config from './Config';
import { HashRouter as Router, Route, Switch, useLocation } from 'react-router-dom';
import { ComponentPage } from './components/ComponentPage';
import { HoagieFollowerAlertContainer } from './components/Follower/HoagieFollowerAlertContainer';
import { TheSongeryOriginalMusicContainer } from './components/TheSongeryOriginalMusic/TheSongeryOriginalMusicContainer';
import { TheSongeryOriginalMusicRavenLegacyContainer } from './components/TheSongeryOriginalMusicRavenLegacy/TheSongeryOriginalMusicRavenLegacyContainer';
import { TheSongeryOriginalMusicBdayContainer } from './components/TheSongeryOriginalMusicRavenBday/TheSongeryOriginalMusicBdayContainer';

import './App.css';
import { TheSongeryOriginalMusicRavenContainer } from './components/TheSongeryOriginalMusicRaven/TheSongeryOriginalMusicRavenContainer';
import { TheSongeryOriginalMusicHalloweenContainer } from './components/TheSongeryOriginalMusicRavenHalloween/TheSongeryOriginalMusicHalloweenContainer';

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
          <Route path={`/${Config.componentsPath}/theSongeryOriginalMusicRavenLegacy`}>
            <ComponentPage>
              <TheSongeryOriginalMusicRavenLegacyContainer />
            </ComponentPage>
          </Route>
          <Route path={`/${Config.componentsPath}/theSongeryOriginalMusicHalloween`}>
            <ComponentPage>
              <TheSongeryOriginalMusicHalloweenContainer />
            </ComponentPage>
          </Route>
        </Switch>
      </Router>
  );
}
