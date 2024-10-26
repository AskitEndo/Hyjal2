import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'nprogress/nprogress.css'; // Add this line
// ... other imports

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
