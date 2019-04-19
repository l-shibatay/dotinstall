import * as React from 'react';
import * as ReactDOM from 'react-dom';

import 'sanitize.css';
import './index.css'
import App from './App';

const rootElement = document.getElementById('root');
rootElement ? ReactDOM.render(<App />, rootElement) : false;
