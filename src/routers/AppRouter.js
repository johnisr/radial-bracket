import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import NBARadialBracketPage from '../components/NBARadialBracketPage/NBARadialBracketPage';
import NHLRadialBracketPage from '../components/NHLRadialBracketPage/NHLRadialBracketPage';
import NotFoundPage from '../components/NotFoundPage';

const AppRouter = () => (
  <Router>
    <div>
      <Switch> 
        <Route exact path="/" component={NBARadialBracketPage} />
        <Route path="/nba" component={NBARadialBracketPage} />
        <Route path="/nhl" component={NHLRadialBracketPage} />
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  </Router>
);

export default AppRouter;