import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import RadialBracketPage from '../components/RadialBracketPage/RadialBracketPage';
import NotFoundPage from '../components/NotFoundPage';

const AppRouter = () => (
  <Router>
    <div>
      <Switch> 
        <Route exact path="/" component={RadialBracketPage} />
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  </Router>
);

export default AppRouter;