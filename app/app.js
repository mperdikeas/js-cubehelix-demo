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
        this.updateStart     = this.updateStart    .bind(this);
        this.updateRotations = this.updateRotations.bind(this);
        this.updateHue       = this.updateHue      .bind(this);
        this.updateGamma     = this.updateGamma    .bind(this);
        this.state = {start: 0.5, rotations: -1.5, hue: 1.2, gamma: 1};
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
    updateGamma(x) {
        this.setState({gamma: x});
    }
    render() {
        return (
                <div>
                <h1>Demo of the cubehelix implementation</h1>
                <Controls updateStart={this.updateStart}
                          updateRotations={this.updateRotations}
                          updateHue={this.updateHue}
                          updateGamma={this.updateGamma}
                          start={this.state.start}
                          rotations={this.state.rotations}
                          hue={this.state.hue}
                          gamma={this.state.gamma}
                />
                <ColourStripe width={this.props.width}
                              height={50}
                              start={this.state.start}
                              rotations={this.state.rotations}
                              hue={this.state.hue}
                              gamma={this.state.gamma}
                />
                <ColourMap width={this.props.width}
                           height={600}
                           start={this.state.start}
                           rotations={this.state.rotations}
                           hue={this.state.hue}
                           gamma={this.state.gamma}
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
                <RangeInputControl
                    name='Start'
                    updateValue={this.props.updateStart}
                    valueConfig={{min: 0, max: 2, step: 0.1, initial: this.props.start}}
                />
                <RangeInputControl
                    name='Rotations'
                    updateValue={this.props.updateRotations}
                    valueConfig={{min: -5, max: 5, step: 0.1, initial: this.props.rotations}}
                />
                <RangeInputControl
                    name='Hue'
                    updateValue={this.props.updateHue}
                    valueConfig={{min: 0, max: 10, step: 0.1, initial: this.props.hue}}
                />                
                <RangeInputControl
                    name='Gamma'
                    updateValue={this.props.updateGamma}
                    valueConfig={{min: -5, max: 20, step: 0.1, initial: this.props.gamma}}
                />                
                </div>
        );
    }
}

Controls.propTypes = {
    updateStart: PropTypes.func.isRequired,
    updateRotations: PropTypes.func.isRequired,
    updateHue: PropTypes.func.isRequired,
    updateGamma: PropTypes.func.isRequired,
    start: PropTypes.number.isRequired,
    rotations: PropTypes.number.isRequired,
    hue: PropTypes.number.isRequired,
    gamma: PropTypes.number.isRequired
};

class RangeInputControl extends React.Component {
    constructor(props) {
        super(props);
        this.state = {value: this.props.valueConfig.initial};
        this.handleInputChange = this.handleInputChange.bind(this);
    }
    handleInputChange(e) {
        this.setState({value: e.target.value});
        this.props.updateValue(parseFloat(e.target.value));
    }
    render() {
        return (
            <div>
                <label htmlFor='inputValue'>{this.props.name}</label>
                <input id='inputValue'
                       type='range'
                       min={this.props.valueConfig.min}
                       max={this.props.valueConfig.max}
                       step={this.props.valueConfig.step}
                       value={this.state.value}
                       onChange={this.handleInputChange}/>
                <span>{this.state.value}</span> 
           </div>
        );
    }
}
RangeInputControl.propTypes = {
    updateValue: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    valueConfig: PropTypes.shape({
        min: PropTypes.number.isRequired,
        max: PropTypes.number.isRequired,
        step: PropTypes.number.isRequired,
        initial: PropTypes.number.isRequired
    })
    
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
                                                     , hue: this.props.hue
                                                     , gamma: this.props.gamma});
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
    hue: PropTypes.number.isRequired,
    gamma: PropTypes.number.isRequired
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
                                                     , hue: this.props.hue
                                                     , gamma: this.props.gamma});
        const l = cubehelix(options);        
        ctx.fillStyle='red';
        for (let i = 0; i < 10*this.props.width; i++) {
            const rgb = l(i/(10*this.props.width-1));
            ctx.fillStyle='red';
            ctx.fillRect(i/10, this.props.height*(1-rgb.r),1,1);
            ctx.fillStyle='green';
            ctx.fillRect(i/10, this.props.height*(1-rgb.g),1,1);
            ctx.fillStyle='blue';
            ctx.fillRect(i/10, this.props.height*(1-rgb.b),1,1);
        }
        ctx.strokeStyle='black';
        ctx.strokeRect(0, 0, this.props.width, this.props.height);
    }
}

ColourMap.propTypes = {
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    start: PropTypes.number.isRequired,
    rotations: PropTypes.number.isRequired,
    gamma: PropTypes.number.isRequired    
};

export default App;

