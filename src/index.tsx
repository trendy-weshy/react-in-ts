/**
 * created by waweru
 */

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {HelloComponent} from './components/index';

const rootTemplate=(
    <span style={{width: '100%', height: '100%', display: 'block'}}>
        <HelloComponent name="John Waweru" version="1.1.0" />
    </span>
);
// #note: mount
ReactDOM.render(
    rootTemplate,
    document.getElementById('window')
);
