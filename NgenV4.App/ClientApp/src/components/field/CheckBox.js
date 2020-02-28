import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './CheckBox.scss'

class CheckBox extends Component {

    static propTypes = {
        class: PropTypes.string,
        type: PropTypes.string.isRequired,
        id: PropTypes.string.isRequired,
        value: PropTypes.any,
        name: PropTypes.string,
        display: PropTypes.any,
        checked: PropTypes.bool
    }
    static defaultProps = {
        class: "checkbox-input-css",
        id: "",
        value: "",
        display: "",
        name: "",
        checked: false,
        type: "checkbox",
        setValue: function () { }
    }
    constructor(props) {
        super(props);
        this.state = {
            checked: props.checked
        }
    }
    render() {
        return (
            <div className="checkbox-div" value={this.props.value} >
                <input
                    autoComplete="off"
                    className={this.props.class}
                    type="checkbox"
                    id={this.props.id}
                    name={this.props.name}
                    value={this.props.value}
                    checked={this.props.type.toLowerCase() === "checkboxlist" ? this.props.checked : this.state.checked}
                    onChange={this.props.type.toLowerCase() === "checkboxlist" ? (e) => this.props.changeInputValue(e, this.props) : (e) => this.onChange(e)}
                />
                <span className="checkbox-span" id={"span_" + this.props.id} >{this.props.display}</span>
            </div>
        )
    }
    onChange = (e) => {
        this.setState({
            checked: !this.state.checked
        });
        this.props.onChange(e);
    }
}
export default CheckBox;