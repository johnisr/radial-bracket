import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import createBracketFor from '../reducers/bracket';
import createBracketAnalysisFor from '../reducers/bracketAnalysis';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
 const store = createStore(
   combineReducers({
     nbaBracket: createBracketFor('nba'),
     nhlBracket: createBracketFor('nhl'),
     nbaBracketData: createBracketAnalysisFor('nba'),
     nhlBracketData: createBracketAnalysisFor('nhl'),
   }),
   composeEnhancers(applyMiddleware(thunk))
 );

 return store;
};

