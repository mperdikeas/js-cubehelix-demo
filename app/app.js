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
                <h1>Demo of the cubehelix NPM library</h1>
                <p>
                <a href='https://github.com/mperdikeas/js-cubehelix-demo'>Github repo</a>
                </p>
                <p>
                    This demo is build using the <tt>cubehelix</tt> <b>npm</b> package that's
                    available <a href='https://www.npmjs.com/package/cubehelix'>here</a>.
                </p>
                <p>
                The motivation for the <span className='cubehelix'>cubehelix</span> algorithm
            is the following: assume you are
            given a 2D matrix of numerical values. E.g. each coordinate of the matrix holds a single
            scalar (one-dimensional) numeric value (float or integer). Such matrixes are common in
            astronomy but can also be used to represent, e.g. the salinity of the ocean (at the surface),
            or the average rainfall over an area.
                Suppose then that you are further asked to prepare a visualization
            for the contents of said matrix. The simplest approach would be to linearly map the range
            [min, max] of values to some gray-scale. E.g. map the lowest value to black, the highest
            to white and linearly interpolate all intermediate values.
                </p>
                <p>
                But what if you wanted to produce a visualization using color?
                All color spaces are inherently three-dimensional (e.g. RGB is a cube, HSL is
               a cylinder and so on). How to map one dimensional values to three dimensions?
                </p>
                <p>
                The problem is to devise an appropriate arrangement of a path in the 3D RGB space such
            that:
                <ul>
                <li>at the beginning of the path you have the darkest possible colour (black),
            at the end of the path you have the lightest possible colour (white)</li>
                <li>as you
            progress, from the beginning towards the end of the path, a variety of colours are 
            employed</li>
                <li>the perceived brightness monotonically increases.</li>
                </ul>
                </p>
                <p>
                This is further complicated by the fact that the brightness perceived
            by the human eye does not assign equal weight to the three dimensions of the RGB
            space (bright green appears much more luminous than bright blue).
            </p>
                <p>
                The <span className='cubehelix'>cubehelix</span> algorithm generates such a
            function, actually a family of such mapping functions,
            that map intensity values in the [0, 1] range to a wide
            variety of color in the RGB space such that as a variable <tt>x</tt> proceeds
            from 0 to 1,
            the perceived brightness of the color to which that value <tt>x</tt> is
            mapped monotonically increases. It does so by arranging a tapered helix in the 3D RGB space.
                </p>
                <p>
                The paper defining the <i>cubehelix</i> algorithm
            is available <a href='http://astron-soc.in/bulletin/11June/289392011.pdf'>here</a>.
                The algorithm is also discussed <a href='http://www.mrao.cam.ac.uk/~dag/CUBEHELIX/'>here</a>.

            </p>
                <p>
                Four parameters (<i>start</i>, <i>rotations</i>, <i>hue</i> and <i>gamma</i>)
            control the exact shape of the helix. Modifying these parameters gives rise to a number
            of different mapping functions that all exhibit the crucial monotonically increasing luminance
            property.
                </p>
                <p>
                In the diagram below the horizontal axis stands for variable <tt>x</tt> described above.
                Variable <tt>x</tt> takes values in the [0, 1] range. That value is then mapped to a color
                in the RGB space according to the <i>cubehelix</i> algorithm. As mentioned,
            the <i>cubehelix</i> algorithm is capable of generating a family of such mapping functions according
            to four configuration parameters (see below) that control the shape of the helix.
                </p>
                <p>
                The R, G and B components of the color (to which variable <tt>x</tt> is mapped) are represented by
            the  <span style={{color: 'red', fontWeight: 'bold'}}>red</span>,&nbsp;
                <span style={{color: 'green', fontWeight: 'bold'}}>green</span>,
            and <span style={{color: 'blue', fontWeight: 'bold'}}>blue</span> lines in the plot below.
                </p>
                <p>
                The solid <span className='bold'>black</span> line that runs diagonally across the plot is the brightness
            perceived by the human eye. You will
            notice that for certain helix configuration parameters, the R, G or B values fall outside of 
            the [0, 1] range. When this happens to an obscene degree, the monotonicity of the perceived brightness
            may suffer a little. In particular, the <i>hue</i> configuration parameter is the one that can
            more easily disrupt the shape of the perceived brightness function.
                </p>
                <div style={{display: 'flex'
                             , marginLeft: this.props.geometry.leftMargin
                             , flexDirection: 'row'
                             , justifyContent: 'space-between'
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
            refer to the <span className='bold'>cubehelix</span> algorithm (see the links above).
                </div>
                </div>
                <div style={{marginLeft: this.props.geometry.leftMargin}}>
                <ColourStripe width={this.props.geometry.width-this.props.geometry.leftMargin}
                              height={100}
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
                <div style={{minWidth: '275px', marginTop: '10px', marginBottom: '20px'}}>
                <RangeInputControl
                    name='Start'
                    updateValue={this.props.updateStart}
                    valueConfig={{min: 0, max: 2, step: 0.1, initial: this.props.start}}
                />
                <RangeInputControl
                    name='Rotations'
                    updateValue={this.props.updateRotations}
                    valueConfig={{min: -10, max: 30, step: 0.1, initial: this.props.rotations}}
                />
                <RangeInputControl
                    name='Hue'
                    updateValue={this.props.updateHue}
                    valueConfig={{min: 0, max: 10, step: 0.1, initial: this.props.hue}}
                />                
                <RangeInputControl
                    name='Gamma'
                    updateValue={this.props.updateGamma}
                    valueConfig={{min: 0, max: 20, step: 0.1, initial: this.props.gamma}}
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

    perceivedLuminance(rgb) {

        function clip(a) {
            if (a<0) return 0;
            if (a>1) return 1;
            return a;
        }

        return 0.30*clip(rgb.r)
            + 0.59*clip(rgb.g)
            + 0.11*clip(rgb.b);

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
            ctx.fillStyle='black';
            ctx.fillRect(x, f(this.perceivedLuminance(rgb)), 1, 1);
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

