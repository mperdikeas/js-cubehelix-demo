const     _ = require('lodash');
const     $ = require('jquery');
import React    from 'react';
import ReactDOM from 'react-dom';
import App      from './app.js';

$(document).ready(doStuff);


function doStuff() {

    ReactDOM.render(<App geometry={{width: 650
                                    , height: 650
                                    , leftMargin: 30
                                    , bottomMargin:  20}}/>, $('#app')[0]);

}
