import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import NBARadialBracketPage from '../components/NBARadialBracketPage/NBARadialBracketPage';
import NHLRadialBracketPage from '../components/NHLRadialBracketPage/NHLRadialBracketPage';
import NHLRadialBracketAnalysisPage from '../components/NHLRadialBracketAnalysisPage/NHLRadialBracketAnalysisPage';
import NBARadialBracketAnalysisPage from '../components/NBARadialBracketAnalysisPage/NBARadialBracketAnalysisPage';
import NotFoundPage from '../components/NotFoundPage';

const AppRouter = () => (
  <Router>
    <div>
      <Switch> 
        <Route exact path="/" component={NBARadialBracketPage} />
        <Route path="/nba" component={NBARadialBracketPage} />
        <Route path="/nhl" component={NHLRadialBracketPage} />
        <Route path="/nhlAnalysis" component={NHLRadialBracketAnalysisPage} />
        <Route path="/nbaAnalysis" component={NBARadialBracketAnalysisPage} />
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  </Router>
);

export default AppRouter;