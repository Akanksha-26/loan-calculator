import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {CalaculateLoanService} from './calculate-loan-service';

const calaculateLoanService = new CalaculateLoanService();

ReactDOM.render(
  <React.StrictMode>
    <App calaculateLoanService={calaculateLoanService}/>
  </React.StrictMode>,
  document.getElementById('root')
);

