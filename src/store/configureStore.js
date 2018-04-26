import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import createBracketFor from '../reducers/bracket';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
 const store = createStore(
   combineReducers({
     nbaBracket: createBracketFor('nba'),
     nhlBracket: createBracketFor('nhl'),
   }),
   composeEnhancers(applyMiddleware(thunk))
 );

 return store;
};

