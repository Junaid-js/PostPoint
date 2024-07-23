import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import UserProvider from './Components/UserProvider';

ReactDOM.render(
  <UserProvider>
      <App />
  </UserProvider>,
  document.getElementById('root')
);
