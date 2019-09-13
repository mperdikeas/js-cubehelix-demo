const React = require('react');
import PropTypes from 'prop-types';

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

export default RangeInputControl;
