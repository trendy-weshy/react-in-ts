/**
 * created by waweru
 */     

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {default as HelloComponent} from './components/index';

ReactDOM.render(
    <HelloComponent name="John" version="1.1.0" />,
    document.getElementById("tw")
);