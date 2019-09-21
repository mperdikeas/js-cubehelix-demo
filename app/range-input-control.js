const React = require('react');
import PropTypes from 'prop-types';

class RangeInputControl extends React.Component {
    constructor(props) {
        super(props);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.y2x = this.y2x.bind(this);
        this.coef = RangeInputControl.calculateCoefficients(this.props.valueConfig.min
                                                            , this.props.valueConfig.max);
    }
    handleInputChange(e) {
        const y = this.props.valueConfig.power?this.quadraticLaw(parseFloat(e.target.value))
                  :parseFloat(e.target.value);
        this.props.updateValue(y);
    }


    quadraticLaw(x) {
        return this.coef.a*Math.pow(x, 4)+this.coef.b;
    }

    quadraticLawReverse(y) {
        const x = Math.pow((y-this.coef.b)/this.coef.a, 1/4);
        return x;
    }

    y2x(y) {
        if (this.props.valueConfig.power)
            return this.quadraticLawReverse(y);
        else
            return y;
    }

    render() {
        return (
            <div>
                <label htmlFor='inputValue' style={{display: 'inline-block'
                                                    , width: '5em'
                                                    , verticalAlign: 'middle'}}>{this.props.name}</label>
                <input style={{verticalAlign: 'middle'}} id='inputValue'
                       type='range'
                       min   ={this.y2x(this.props.valueConfig.min)}
                       max   ={this.y2x(this.props.valueConfig.max)}
                       step  ={this.props.valueConfig.step}
                       value ={this.y2x(this.props.valueConfig.value)}
                       onChange={this.handleInputChange}/>
                <span style={{verticalAlign: 'middle', textAlign: 'right', display:'inline-block', width: '3em'}}>{this.props.valueConfig.value.toFixed(3)}</span> 
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
        value: PropTypes.number.isRequired,
        power: PropTypes.bool.isRequired
    })
    
};

RangeInputControl.MAX = 10;

RangeInputControl.calculateCoefficients = (y1, y2)=>{
        const x1 = 0;
        const x2 = RangeInputControl.MAX;
        const b = y1;
        const a = (y2-y1)/Math.pow(x2, 4);
        return {a: a, b:b};
};


export default RangeInputControl;
