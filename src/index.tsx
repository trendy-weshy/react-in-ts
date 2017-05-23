/**
 * created by waweru
 */

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {default as HelloComponent} from './components/index';

const rootTemplate=(
    <div className="window">
        <HelloComponent name="John Waweru" version="1.1.0" />
    </div>
);
// #note: mount
ReactDOM.render(
    rootTemplate,
    document.getElementById('tw')
);
