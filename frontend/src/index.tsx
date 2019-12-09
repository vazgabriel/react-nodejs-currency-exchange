import 'bootstrap/dist/css/bootstrap.min.css';
import './index.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import AppRouter from './AppRouter';
import './i18n';

ReactDOM.render(<AppRouter />, document.getElementById('root'));
