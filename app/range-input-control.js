const React = require('react');
import PropTypes from 'prop-types';

class RangeInputControl extends React.Component {
    constructor(props) {
        super(props);
        this.handleInputChange = this.handleInputChange.bind(this);
    }
    handleInputChange(e) {
        this.props.updateValue(parseFloat(e.target.value));
    }

    render() {
        return (
            <div>
                <label htmlFor='inputValue' style={{display: 'inline-block'
                                                    , width: '5em'
                                                    , verticalAlign: 'middle'}}>{this.props.name}</label>
                <input style={{verticalAlign: 'middle'}} id='inputValue'
                       type='range'
                       min   ={this.props.valueConfig.min}
                       max   ={this.props.valueConfig.max}
                       step  ={this.props.valueConfig.step}
                       value ={this.props.valueConfig.value}
                       onChange={this.handleInputChange}/>
                <span style={{verticalAlign: 'middle', textAlign: 'right', display:'inline-block', width: '3em'}}>{this.props.valueConfig.value}</span> 
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
        value: PropTypes.number.isRequired
    })
    
};

export default RangeInputControl;
