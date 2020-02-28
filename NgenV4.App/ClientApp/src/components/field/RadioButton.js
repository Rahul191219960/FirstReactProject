import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './RadioButton.scss'

class RadioButton extends Component {

    static propTypes = {
        class: PropTypes.string,
        type: PropTypes.string.isRequired,
        id: PropTypes.string.isRequired,
        value: PropTypes.any,
        name: PropTypes.string,
        display: PropTypes.any
    }
    static defaultProps = {
        class: "radiobutton-input-css",
        id: "",
        value: "",
        display: "",
        name: ""
    }
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    render() {
        return (
            <div className="radiobutton-div" value={this.props.value}>
                <input
                    autoComplete="off"
                    className={"radiobutton-input-css"}
                    type="radio"
                    id={this.props.id}
                    name={this.props.name}
                    value={this.props.value}
                    checked={this.props.checked}
                    onChange={(e) => this.props.changeInputValue(e, this.props)}
                />
                <span className="radiobutton-span" id={"span_" + this.props.id}>{this.props.display}</span>
            </div>
        )
    }
}
export default RadioButton;