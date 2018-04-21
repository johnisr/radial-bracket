import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import countReducer from '../reducers/countReducer';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
 const store = createStore(
   combineReducers({
     count: countReducer,
   }),
   composeEnhancers(applyMiddleware(thunk))
 );

 return store;
};

