// import React from 'react';
// import ReactDOM from 'react-dom';
// import './index.css';
// import App from './App';
// import * as serviceWorker from './serviceWorker';

// ReactDOM.render(<App />, document.getElementById('root'));

// // If you want your app to work offline and load faster, you can change
// // unregister() to register() below. Note this comes with some pitfalls.
// // Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();

import React from 'react';
import ReactDOM from 'react-dom';
import ChatApp from './components/ChatApp.react';
import ChatExampleData from './ChatExampleData';
import ChatWebAPIUtils from './utils/ChatWebAPIUtils';


ChatExampleData.init(); // load example data into localStorage

ChatWebAPIUtils.getAllMessages(); // create receive all action and dispatch it

ReactDOM.render(
  <ChatApp />,
  document.getElementById('react')
);
