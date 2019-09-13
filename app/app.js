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
        this.updateRotations = this.updateRotations.bind(this);
        this.updateHue = this.updateHue.bind(this);
        this.state = {start: 0.5, rotations: -1.5, hue: 1.2};
    }

    updateStart(x) {
        this.setState({start: x});
    }
    updateRotations(x) {
        this.setState({rotations: x});
    }
    updateHue(x) {
        this.setState({hue: x});
    }
    render() {
        return (
                <div>
                <h1>Demo of the cubehelix implementation</h1>
                <Controls updateStart={this.updateStart}
                          updateRotations={this.updateRotations}
                          updateHue={this.updateHue}
                          start={this.state.start}
                          rotations={this.state.rotations}
                          hue={this.state.hue}
                />
                <ColourStripe width={this.props.width}
                              height={50}
                              start={this.state.start}
                              rotations={this.state.rotations}
                              hue={this.state.hue}
                />
                <ColourMap width={this.props.width}
                           height={600}
                           start={this.state.start}
                           rotations={this.state.rotations}
                           hue={this.state.hue}
                />
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
                <StartControl value={this.props.start} updateStart={this.props.updateStart}/>
                <RotationsControl value={this.props.rotations} updateRotations={this.props.updateRotations}/>
                <HueControl value={this.props.hue} updateHue={this.props.updateHue}/>
                </div>
        );
    }
}

Controls.propTypes = {
    updateStart: PropTypes.func.isRequired,
    updateRotations: PropTypes.func.isRequired,
    updateHue: PropTypes.func.isRequired,
    start: PropTypes.number.isRequired,
    rotations: PropTypes.number.isRequired,
    hue: PropTypes.number.isRequired
};

class StartControl extends React.Component {
    constructor(props) {
        super(props);
        this.state = {value: this.props.value};
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
                      min={0} max={2} step={0.1} value={this.state.value}
                            onChange={this.handleInputChange}/>
                <span>{this.state.value}</span> 
           </div>
        );
    }
}
StartControl.propTypes = {
    updateStart: PropTypes.func.isRequired,
    value: PropTypes.number.isRequired
};


class RotationsControl extends React.Component {
    constructor(props) {
        super(props);
        this.state = {value: this.props.value};
        this.handleInputChange = this.handleInputChange.bind(this);
    }
    handleInputChange(e) {
        this.setState({value: e.target.value});
        this.props.updateRotations(parseFloat(e.target.value));
    }
    render() {
        return (
            <div>
                <label htmlFor='start'>Rotations</label>
                <input id='start' type='range'
                   min={-5} max={5} step={0.1} value={this.state.value}
                            onChange={this.handleInputChange}/>
                <span>{this.state.value}</span> 
           </div>
        );
    }
}
RotationsControl.propTypes = {
    updateRotations: PropTypes.func.isRequired,
    value: PropTypes.number.isRequired
};


class HueControl extends React.Component {
    constructor(props) {
        super(props);
        this.state = {value: this.props.value};
        this.handleInputChange = this.handleInputChange.bind(this);
    }
    handleInputChange(e) {
        this.setState({value: e.target.value});
        this.props.updateHue(parseFloat(e.target.value));
    }
    render() {
        return (
            <div>
                <label htmlFor='start'>Hue</label>
                <input id='start' type='range'
                   min={0} max={10} step={0.1} value={this.state.value}
                            onChange={this.handleInputChange}/>
                <span>{this.state.value}</span> 
           </div>
        );
    }
}
HueControl.propTypes = {
    updateHue: PropTypes.func.isRequired,
    value: PropTypes.number.isRequired
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
        const options = Object.assign({}, defaults, {start: this.props.start
                                                     , r: this.props.rotations
                                                     , hue: this.props.hue});
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
    start: PropTypes.number.isRequired,
    rotations: PropTypes.number.isRequired,
    hue: PropTypes.number.isRequired
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
        const options = Object.assign({}, defaults, {start: this.props.start
                                                     , r: this.props.rotations
                                                     , hue: this.props.hue});
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
    start: PropTypes.number.isRequired,
    rotations: PropTypes.number.isRequired
};

export default App;

