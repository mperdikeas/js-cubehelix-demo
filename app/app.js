require('./css/reset.css');
require('./css/style.css');
const     _ = require('lodash');
const     $ = require('jquery');
const React = require('react');
var      cx = require('classnames');


import {foo, boo} from './util.js';
import RangeInputControl from './range-input-control.js';
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
                <div style={{width: this.props.geometry.width}}>
                <h1>Demo of the cubehelix implementation</h1>
                <p>
                The motivation for the cubehelix function is the following: assume you are
            given a 2D matrix of "intensities". E.g. each coordinate of the matrix holds a single
            scalar (one-dimensional) numeric value (float or integer).
                Suppose then that you are further asked to prepare a visualization
            for the contents of said matrix. The simplest approach would be to normalize every
            value of the matrix so that they all fall in the [0, 1] range and then map the
            continum of values in the [0, 1] range to some gray-scale (e.g. map 0 to black, 1 to
            white and all intermediate values linearly between 0 and 1).
                </p>
                <p>
                But what if you wanted to produce a visualization using color?
                All color spaces are inherently three-dimensional (e.g. RGB is a cube, HSL is
               a cylinder and so on). How to map one dimensional values to three dimensions?
                </p>
                <p>
                The problem is to devise an appropriate arrangement of a path in 3D space such
            that:
                </p>
                <ul>
                <li>at the beginning of the path you have the darkest possible colour (black),
            at the end of the path the lightest possible colour (white)</li>
                <li>as you
            progress from the beginning to the end of the path a variety of colours are 
            employed</li>
                <li>the luminosity monotonically increases.</li>
                </ul>
                <p>
                This is further complicated by the fact that the apparent luminosity perceived
            by the human eye does not assign equal weight to the three dimensions of the RGB
            space (bright green appears much more luminous than bright blue).
            </p>
                <p>
                The cubehelix algorithm &hellip;
                </p>
                <div style={{display: 'flex'
                             , marginLeft: this.props.geometry.leftMargin
                             , flexDirection: 'row'
                             , justifyContent: 'space-between'
                             , border: '1px solid red'
                             }}>
                <Controls updateStart={this.updateStart}
                          updateRotations={this.updateRotations}
                          updateHue={this.updateHue}
                          updateGamma={this.updateGamma}
                          start={this.state.start}
                          rotations={this.state.rotations}
                          hue={this.state.hue}
                          gamma={this.state.gamma}
                />
                <div style={{marginLeft: '2em'}}>
                For an explanation on the nature of the <i>start</i>
                , <i>rotations</i>, <i>hue</i> and <i>gamma</i> parameters
                refer to the links above.
                </div>
                </div>
                <div style={{marginLeft: this.props.geometry.leftMargin}}>
                <ColourStripe width={this.props.geometry.width-this.props.geometry.leftMargin}
                              height={50}
                              start={this.state.start}
                              rotations={this.state.rotations}
                              hue={this.state.hue}
                              gamma={this.state.gamma}
                />
                </div>
                <ColourMap width={this.props.geometry.width}
                           height={this.props.geometry.height-this.props.geometry.bottomMargin}
                           leftMargin={this.props.geometry.leftMargin}
                           bottomMargin={this.props.geometry.bottomMargin}
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
    geometry : PropTypes.shape({
        width: PropTypes.number.isRequired,
        height: PropTypes.number.isRequired,
        leftMargin: PropTypes.number.isRequired,
        bottomMargin: PropTypes.number.isRequired
    })
};


class Controls extends React.Component {
    render() {
        return (
                <div style={{minWidth: '275px'}}>
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

    constructor(props) {
        super(props);
        this.plotHeight = this.props.height - this.props.bottomMargin;
        this.plotWidth  = this.props.width - this.props.leftMargin;
        this.clipPlotHeight = function (x) {return x>this.plotHeight?this.plotHeight:x;};
    }

    
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
        this.paintAxes();
        this.paint();
    }

    paintAxes() {
        const canvas = this.refs.canvas;
        const ctx = canvas.getContext('2d');
        ctx.strokeStyle='black';
        ctx.font = '15px courier';
        ctx.strokeText('1', this.props.leftMargin-15,                 15);        
        ctx.strokeText('0', this.props.leftMargin-15, this.plotHeight+15);
        ctx.strokeText('1', this.props.width-15       , this.plotHeight+15);        
    }

    paint() {
        const canvas = this.refs.canvas;
        const ctx = canvas.getContext('2d');
        ctx.fillStyle='white';
        ctx.fillRect(this.props.leftMargin, 0, this.plotWidth, this.plotHeight);
        const defaults = {start: 0.5, r:-1.5, hue:1.2, gamma:1.0};
        const options = Object.assign({}, defaults, {start: this.props.start
                                                     , r: this.props.rotations
                                                     , hue: this.props.hue
                                                     , gamma: this.props.gamma});
        const l = cubehelix(options);        
        for (let i = 0; i < 10*this.plotWidth; i++) {
            const rgb = l(i/(10*this.plotWidth-1));

            const x = this.props.leftMargin+i/10;
            const that = this;
            const f = function(v) {return that.clipPlotHeight(that.plotHeight*(1-v));};
            ctx.fillStyle='red';
            ctx.fillRect(x, f(rgb.r), 1, 1);
            ctx.fillStyle='green';
            ctx.fillRect(x, f(rgb.g), 1, 1);
            ctx.fillStyle='blue';
            ctx.fillRect(x, f(rgb.b), 1, 1);
        }
        ctx.strokeStyle='black';
        ctx.strokeRect(this.props.leftMargin, 0, this.plotWidth, this.plotHeight);
    }
}

ColourMap.propTypes = {
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    leftMargin: PropTypes.number.isRequired,
    bottomMargin: PropTypes.number.isRequired,
    start: PropTypes.number.isRequired,
    rotations: PropTypes.number.isRequired,
    gamma: PropTypes.number.isRequired    
};

export default App;

