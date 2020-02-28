import React, { Component } from 'react';
import PropTypes from 'prop-types';

import CheckBox from './CheckBox';

class CheckBoxList extends Component {

    static propTypes = {
        class: PropTypes.string,
        type: PropTypes.string.isRequired,
        id: PropTypes.string.isRequired,
        checkBoxList: PropTypes.arrayOf(PropTypes.shape({
            value: PropTypes.any.isRequired,
            display: PropTypes.any.isRequired
        })).isRequired
    }
    static defaultProps = {
        class: "radiobutton-input-css",
        id: "",
        value: "",
        display: "",
        defaultValue: "",

        setValue: function () { }
    }
    constructor(props) {
        super(props);
        let defaultValue = []
        if (props.allController !== undefined && props.allController.checked) {
            for (var j of props.checkBoxList) {
                defaultValue.push(j.value)
            }
            this.state = {
                defaultValue: defaultValue,
                isAll: true,
                stringValue: defaultValue.toString()
            }
        }
        else {
            this.state = {
                defaultValue: props.defaultValue ? props.defaultValue.toString().split(",") : [],
                isAll: props.allController !== undefined ? (props.allController.checked !== undefined ? props.allController.checked : false) : null,
                stringValue: props.defaultValue
            }
        }
        this.props.setValue(this.state.stringValue, props.name || props.id);
    }
    render() {
        return (<div>{this.createList()}</div>);
    }
    changeInputValue = (e, checked) => {
        let valueList = [];
        if (this.props.allController !== undefined && checked.id === this.props.id + "_" + this.props.allController.value) {
            if (checked.checked) {
                this.setState({
                    defaultValue: valueList,
                    isAll: false,
                    stringValue: ""
                });
            }
            else {
                for (var i = 0; i < this.props.checkBoxList.length; i++) {
                    valueList.push(this.props.checkBoxList[i].value);
                }
                this.setState({
                    defaultValue: valueList,
                    isAll: true,
                    stringValue: valueList.toString()
                });
            }
        }
        else if (checked !== undefined && !checked.checked) {
            valueList = this.state.defaultValue.slice();
            let index = valueList.indexOf(checked.value);
            let setIsAll = true;
            if (index < 0)
                valueList.push(checked.value);
            for (var j of this.props.checkBoxList) {
                if (!valueList.includes(j.value)) {
                    setIsAll = false;
                }
            }
            if (setIsAll) {
                this.setState({
                    defaultValue: valueList,
                    isAll: true,
                    stringValue: valueList.toString()
                });
            }
            else {
                this.setState({
                    defaultValue: valueList,
                    stringValue: valueList.toString()
                });
            }
        }
        else if (checked !== undefined && checked.checked) {
            valueList = this.state.defaultValue.slice();
            let index = valueList.indexOf(checked.value);
            if (index >= 0)
                valueList.splice(index, 1);
            this.setState({
                defaultValue: valueList,
                isAll: false,
                stringValue: valueList.toString()
            });
        }
        // var val = this.props.onChange(valueList.toString());
    }
    createList = () => {
        let list = [];
        const checkBoxList = this.props.checkBoxList;
        const defaultValuearray = this.state.defaultValue;
        if (this.props.allController !== undefined) {
            list.push(
                <CheckBox
                    class={this.props.class}
                    type={this.props.type}
                    id={this.props.id + "_" + this.props.allController.value}
                    key={this.props.id + "_" + this.props.allController.value}
                    value={this.props.allController.value}
                    name={this.props.id}
                    display={this.props.allController.display}
                    checked={this.state.isAll}
                    changeInputValue={(e, checked) => this.changeInputValue(e, checked)}
                />
            )
        }
        for (var i = 0; i < checkBoxList.length; i++) {
            list.push(
                <CheckBox
                    class={this.props.class}
                    type={this.props.type}
                    id={this.props.id + i}
                    key={this.props.id + i}
                    value={checkBoxList[i].value}
                    name={this.props.id}
                    display={checkBoxList[i].display}
                    checked={defaultValuearray.includes(checkBoxList[i].value)}
                    changeInputValue={(e, checked) => this.changeInputValue(e, checked)}
                />
            );
        }
        return list;
    }
}
export default CheckBoxList;