import React, { Component } from 'react';
import PropTypes from 'prop-types';

import RadioButton from './RadioButton';

class RadioButtonList extends Component {

    static defaultProps = {
        id: "",
        value: "",
        display: "",
        radioList: []
    }
    constructor(props) {
        super(props);
        this.state = {
            defaultValue: props.defaultValue
        }
        // this.props.setValue(props.defaultValue, props.name || props.id);
    }
    render() {
        return (<div>{this.createList()}</div>);
    }
    changeInputValue = (e, props) => {
        this.setState({
            defaultValue: props.value
        });
        this.props.onChange(props.value);
    }
    createList = () => {
        let list = [];
        const radioList = this.props.radioList;
        for (var i = 0; i < radioList.length; i++) {
            list.push(
                <RadioButton
                    class={"radiobutton-input-css"}
                    type={this.props.type}
                    id={this.props.id + i}
                    key={this.props.id + i}
                    value={radioList[i].value}
                    name={this.props.name}
                    display={radioList[i].display}
                    checked={this.state.defaultValue.toString().toLowerCase() === radioList[i].value.toString().toLowerCase()}
                    changeInputValue={(e, props) => this.changeInputValue(e, props)}
                />
            );
        }
        return list;
    }
}
export default RadioButtonList;