require('./css/reset.css');
require('./css/style.css');
const     _ = require('lodash');
const     $ = require('jquery');
const React = require('react');
var      cx = require('classnames');


import {foo, boo} from './util.js';
import ControlPanel from './control-panel.js';
import Text from './text.js';
import {cubehelix} from 'cubehelix';

import PropTypes from 'prop-types';


class App extends React.Component {

    constructor(props) {
        super(props);
        this.updateStart     = this.updateStart    .bind(this);
        this.updateRotations = this.updateRotations.bind(this);
        this.updateHue       = this.updateHue      .bind(this);
        this.updateGamma     = this.updateGamma    .bind(this);
        this.restoreDefaults = this.restoreDefaults.bind(this);
        this.state = App.defaultConfig;
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
    restoreDefaults() {
        this.setState(App.defaultConfig);
    }
    render() {
        return (
                <div style={{width: this.props.geometry.width}}>
                <Text/>
                <ControlPanel leftMargin={this.props.geometry.leftMargin}
                              updateStart={this.updateStart}
                              updateRotations={this.updateRotations}
                              updateHue={this.updateHue}
                              updateGamma={this.updateGamma}
                              helixConfig={{ start    : this.state.start,
                                             rotations: this.state.rotations,
                                             hue      : this.state.hue,
                                             gamma    : this.state.gamma
                                           }}
                              restoreDefaults={this.restoreDefaults}

                />
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

App.defaultConfig = {start: 0.5, rotations: -1.5, hue: 1.2, gamma: 1};


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
            backgroundColor: 'white',
            marginBottom: '100px'
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

