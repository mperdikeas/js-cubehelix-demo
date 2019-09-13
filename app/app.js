require('./css/style.css');
const     _ = require('lodash');
const     $ = require('jquery');
const React = require('react');
var      cx = require('classnames');


import {foo, boo} from './util.js';
import {cubehelix} from 'cubehelix';

import PropTypes from 'prop-types';



class App extends React.Component {

    constructor(props) {
        super(props);
        this.updateStart = this.updateStart.bind(this);
        this.state = {start: 2};
    }

    updateStart(start) {
        this.setState({start: start});
    }
    render() {
        return (
                <div>
                <h1>Demo of the cubehelix implementation</h1>
                <Controls updateStart={this.updateStart}/>
                <ColourStripe width={this.props.width} height={50}
                              start={this.state.start}/>
                <ColourMap width={this.props.width} height={600}
                              start={this.state.start}/>
                </div>
        );
    }
}

App.propTypes = {
    width : PropTypes.number.isRequired
};


class Controls extends React.Component {
    render() {
        return (
                <div>
                <StartControl updateStart={this.props.updateStart}/>
                </div>
        );
    }
}

Controls.propTypes = {
    updateStart: PropTypes.func.isRequired
};

class StartControl extends React.Component {
    constructor(props) {
        super(props);
        this.state = {value: 2};
        this.handleInputChange = this.handleInputChange.bind(this);
    }
    handleInputChange(e) {
        this.setState({value: e.target.value});
        this.props.updateStart(parseFloat(e.target.value));
    }
    render() {
        return (
            <div>
                <label htmlFor='start'>Start</label>
                <input id='start' type='range'
                            min={0} max={2} step={0.1}
                            onChange={this.handleInputChange}/>
                <span>{this.state.value}</span> 
           </div>
        );
    }
}

StartControl.propTypes = {
    updateStart: PropTypes.func.isRequired
};

class ColourStripe extends React.Component {
    render() {
        const style={
            backgroundColor: 'red'
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

    componentDidUpdate() {
        this.paint();
    }

    componentDidMount() {
        this.paint();
    }

    paint() {
        const defaults = {start: 0.5, r:-1.5, hue:1.2, gamma:1.0};
        const options = Object.assign({}, defaults, {start: this.props.start});
        const l = cubehelix(options);
        const canvas = this.refs.canvas;
        const ctx = canvas.getContext('2d');
        ctx.fillStyle='red';
        for (let i = 0; i < this.props.width; i++) {
            const rgb = l(i/(this.props.width-1));
            ctx.fillStyle=`rgb(${rgb.r*255}, ${rgb.g*255}, ${rgb.b*255})`;
            ctx.fillRect(i,0,1,this.props.height);
        }

    }
}

ColourStripe.propTypes = {
    width : PropTypes.number.isRequired,
    start: PropTypes.number.isRequired
};

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

    componentDidUpdate() {
        this.paint();
    }

    componentDidMount() {
        this.paint();
    }

    paint() {
        const canvas = this.refs.canvas;
        const ctx = canvas.getContext('2d');
        ctx.fillStyle='white';
        ctx.fillRect(0, 0, this.props.width, this.props.height);
        const defaults = {start: 0.5, r:-1.5, hue:1.2, gamma:1.0};
        const options = Object.assign({}, defaults, {start: this.props.start});
        const l = cubehelix(options);
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
        ctx.strokeStyle='black';
        ctx.strokeRect(0, 0, this.props.width, this.props.height);
    }
}

ColourMap.propTypes = {
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    start: PropTypes.number.isRequired
};

export default App;

