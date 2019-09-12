require('./css/style.css');
const     _ = require('lodash');
const     $ = require('jquery');
const React = require('react');
var      cx = require('classnames');


import {foo, boo} from './util.js';
import {cubehelix} from 'cubehelix';

import PropTypes from 'prop-types';



class App extends React.Component {
    render() {
        const msg = this.props.msg+foo()+' '+boo();
        return (
                <div>
                <h1>${msg}</h1>
                <ColourStripe/>
                <ColourMap width={600} height={600}/>
                </div>
        );
    }
}

App.propTypes = {
    msg: PropTypes.string.isRequired
};


class ColourStripe extends React.Component {
    render() {
        const style={
            backgroundColor: 'red'
        };
            
        return (
                <canvas ref='canvas' width={600} height={50} style={style}>
                </canvas>
        );
    }

    componentDidMount() {
        const l = cubehelix();
        const canvas = this.refs.canvas;
        const ctx = canvas.getContext('2d');
        ctx.fillStyle='red';
        for (let i = 0; i < 600; i++) {
            const rgb = l(i/600);
            ctx.fillStyle=`rgb(${rgb.r*255}, ${rgb.g*255}, ${rgb.b*255})`;
            ctx.fillRect(i,0,1,100);
        }
    }
}


class ColourMap extends React.Component {
    render() {
        const style={
            backgroundColor: 'white'
        };
            
        return (
                <canvas
                    ref='canvas'
                    width={this.props.width}
                    height={this.props.height}
                    style={style}>
                </canvas>
        );
    }

    componentDidMount() {
        const l = cubehelix();
        const canvas = this.refs.canvas;
        const ctx = canvas.getContext('2d');
        ctx.fillStyle='red';
        for (let i = 0; i < this.props.width; i++) {
            const rgb = l(i/(this.props.width-1));
            ctx.fillStyle='red';
            ctx.fillRect(i, this.props.height*(1-rgb.r),1,1);
            ctx.fillStyle='green';
            ctx.fillRect(i, this.props.height*(1-rgb.g),1,1);
            ctx.fillStyle='blue';
            ctx.fillRect(i, this.props.height*(1-rgb.b),1,1);
        }
    }
}

ColourMap.propTypes = {
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired
};

export default App;

