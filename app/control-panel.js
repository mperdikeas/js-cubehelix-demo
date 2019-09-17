const React = require('react');
import PropTypes from 'prop-types';
import RangeInputControl from './range-input-control.js';


class ControlPanel extends React.Component {

    render() {
        return (
                <div style={{display: 'flex'
                             , marginLeft: this.props.leftMargin
                             , flexDirection: 'row'
                             , justifyContent: 'space-between'
                             }}>
                    <Controls updateStart    ={this.props.updateStart}
                              updateRotations={this.props.updateRotations}
                              updateHue      ={this.props.updateHue}
                              updateGamma    ={this.props.updateGamma}
                              helixConfig    ={this.props.helixConfig}
                    />
                    <div style={{display: 'flex', flexDirection: 'column'}}>
                        <div style={{marginLeft: '2em'}}>
                            For an explanation on the nature of the <i>start</i>
                            , <i>rotations</i>, <i>hue</i> and <i>gamma</i> parameters
                            refer to
                            the <span className='bold'>cubehelix</span> algorithm
                           (see the links above).
                        </div>
                <button style={{marginTop: '1em', padding: '10px', marginLeft: '2em', width: '10em'}}
                                onClick={this.props.restoreDefaults}
                        >
                            restore defaults
                        </button>
                    </div>
                </div>
        );
    }        

}

ControlPanel.propTypes = {
    leftMargin: PropTypes.number.isRequired,
    updateStart: PropTypes.func.isRequired,
    updateRotations: PropTypes.func.isRequired,
    updateHue: PropTypes.func.isRequired,
    updateGamma: PropTypes.func.isRequired,
    helixConfig:  PropTypes.shape({
        start: PropTypes.number.isRequired,
        rotations: PropTypes.number.isRequired,
        hue: PropTypes.number.isRequired,
        gamma: PropTypes.number.isRequired
    }),
    restoreDefaults: PropTypes.func.isRequired
};


class Controls extends React.Component {

    constructor(props) {
        super(props);
    }
    
    render() {
        return (
                <div style={{minWidth: '275px', marginTop: '10px', marginBottom: '20px'}}>
                <RangeInputControl
                    name='Start'
                    updateValue={this.props.updateStart}
                    valueConfig={{min: 0, max: 5, step: 0.1, value: this.props.helixConfig.start}}
                />
                <RangeInputControl
                    name='Rotations'
                    updateValue={this.props.updateRotations}
                    valueConfig={{min: -10, max: 30, step: 0.1, value: this.props.helixConfig.rotations}}
                />
                <RangeInputControl
                    name='Hue'
                    updateValue={this.props.updateHue}
                    valueConfig={{min: 0, max: 10, step: 0.1, value: this.props.helixConfig.hue}}
                />                
                <RangeInputControl
                    name='Gamma'
                    updateValue={this.props.updateGamma}
                    valueConfig={{min: 0, max: 20, step: 0.1, value: this.props.helixConfig.gamma}}
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
    helixConfig:  PropTypes.shape({
        start: PropTypes.number.isRequired,
        rotations: PropTypes.number.isRequired,
        hue: PropTypes.number.isRequired,
        gamma: PropTypes.number.isRequired
    })
};

export default ControlPanel;
