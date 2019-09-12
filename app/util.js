'use strict';
const     _  = require('lodash');
import {assert} from 'chai';

function foo() {
    assert.isTrue(true);
    return 42;
}

function boo() {
    return 45;
}

export {foo, boo};

