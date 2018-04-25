import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import 'typeface-bangers';
import 'typeface-baloo';
import 'typeface-roboto';
import 'typeface-satisfy';
import 'typeface-slabo-27px';

import { Provider } from 'react-redux';
// import RadialBracketContainer from './playground/RadialBracketContainer';
// import RadialBracketInfo from './playground/RadialBracketInfo';
// import CalculateTimeAndDuration from './playground/CalculateTimeAndDuration';

import configureStore from './store/configureStore';

const store = configureStore();

const jsx = (
  <Provider store={store}>
    <App />
  </Provider>
);

ReactDOM.render(jsx, document.getElementById('root'));
registerServiceWorker();
