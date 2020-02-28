import React, { Component } from 'react'
import './AutoComplete.scss';
import PropTypes from 'prop-types';
import Spinner from '../shell/Spinner'

import Input from './Input';
import AutoCompleteFilter from './AutoCompleteFilter'


class AutoComplete extends AutoCompleteFilter {

    loadData = () => {
        if (this.props.selectAbles !== undefined && !this.props.serverSide) {
            this.data = this.props.selectAbles.slice();
            this.setState({
                selectAbles: this.props.selectAbles,
                dataList: this.props.selectAbles
            });
        }
    }

    render() {
        var suggestion_div_width = "100%"
        if (this.props.style !== undefined && this.props.style["padding"] !== undefined) {
            suggestion_div_width = "calc(100% - 2*" + this.props.style["padding"] + ")";
        }
        return (
            <div style={this.props.style} ref={node => this.node = node} id={"div_" + this.props.id} className={"dropdown-container-div"}>
                {
                    <Input {...this.props} value={this.state.selectedValue}
                        // key={this.state.selectedValue}
                        focus={(e) => this.showSuggestion(e)} // onFocus
                        keyUp={(e) => this.handleKeyUp(e)} // onKeyUp
                        keyDown={(e) => this.handleKeyDown(e)} // onKeyDown
                        fieldOnBlur={(e) => this.checkBeforeSet(e)} // onBlur
                        change={(e) => this.changeInputValue(e)}
                    />
                }
                {this.state.isShow ? <SuggestionDiv style={{ width: suggestion_div_width }} {...this.state} onSelectElement={(t, e) => this.onSelectElement(e, t)} setPointer={(p) => this.setPointer(p)} /> : null}
            </div>
        )
    }

    // This Method will show DropDown list
    showSuggestion = (e) => {
        if (this.props.serverSide) {
            this.getServerData(e.target.value, this.props.model);
        }
        else {
            this.setState({
                selectAbles: this.state.dataList,
                isShow: true
            });
            this.props.onOpen({ type: this.props.type, id: this.props.id, name: this.props.name, selectedValue: this.state.selectedValue, selectedKey: this.state.selectedKey });
        }
    }
    // This will filter list while typing and rerender the list
    handleKeyUp = (e) => {
        if (this.props.serverSide) {
            const val = e.target.value;
            if (e.keyCode !== 13 && e.keyCode !== 40 && e.keyCode !== 38) {
                this.getServerData(val, this.props.model, true);
            }
        }
        else {
            var val = e.target.value.toLowerCase();
            var templist = []; //this will contain filtered list
            for (var i = 0; i < this.state.dataList.length; i++) {
                if (this.state.dataList[i].Text.toLowerCase().includes(val)) {
                    templist.push(this.state.dataList[i]);
                }
            }
            if (e.keyCode !== 13 && e.keyCode !== 40 && e.keyCode !== 38) {
                this.setState({
                    selectAbles: templist,
                    isShow: true, //this will rerender the list
                    pointer: 0,
                });
                if (templist.length === 0) {
                    this.closeSuggestion();
                }
            }
        }
    }
    handleKeyDown = (e) => {
        // Close dropdown when tab is pressed
        if (e.keyCode === 9 && this.state.isShow) {
            this.setValue({ Text: this.state.selectAbles[this.state.pointer].Text, Key: this.state.selectAbles[this.state.pointer].Key })
            this.setState({
                isShow: false //close Dropdown
            });
        }
        // Navigate in list when down key is pressed
        else if (e.keyCode === 40 && this.state.isShow) {
            if (this.state.pointer < this.state.selectAbles.length - 1) {
                this.setState({
                    pointer: this.state.pointer + 1
                });
            }
            else {
                this.setState({
                    pointer: 0
                });
            }
        }
        //show div when element is selected from the list and then down key is pressed
        else if (e.keyCode === 40 && !this.state.isShow) {
            if (this.doContains() !== -1)
                this.showSuggestion(e);
        }
        // Navigate in list when up key is pressed
        else if (e.keyCode === 38 && this.state.isShow) {
            if (this.state.pointer === 0) {
                this.setState({
                    pointer: this.state.selectAbles.length - 1
                });
            }
            else {
                this.setState({
                    pointer: this.state.pointer - 1
                });
            }
        }
        // When Enter key is pressed on element
        else if (e.keyCode === 13 && this.state.isShow) {
            var obj = {
                Text: this.state.selectAbles[this.state.pointer].Text,
                Key: this.state.selectAbles[this.state.pointer].Key,
            }
            this.onSelectElement(e, obj);
        }
    }
    //check whether list contain the selected element
    checkBeforeSet = (e) => {
        if (e.target.value !== "" && this.doContains() === -1) {
            this.setValue({ Text: "", Key: -1 });
        }
    }
    // This will change the input box value
    changeInputValue = (e) => {
        var val = e.target.value;
        this.setValue({ Text: val, Key: this.state.selectedKey });
    }
}

class SuggestionDiv extends Component {
    render() {
        return (this.props.spinner ? (
            <div style={this.props.style} className="dropdown-suggestion-div">
                <Spinner message=""></Spinner>
            </div>
        ) : this.props.error ? (
            <div style={this.props.style} className="dropdown-suggestion-div">
                <span>{this.props.error}</span>
            </div>
        ) :
                (
                    <div style={this.props.style} className="dropdown-suggestion-div" id={"div_Suggestion_" + this.props.id}>
                        <ul className="dropdown-suggestion-ul" id={"ul_Suggestion_" + this.props.id}>
                            {this.loadOptions()}
                        </ul>
                    </div>
                )
        )
    }
    componentDidMount() {
        if (this.props.selectedKey && this.props.selectedValue) {
            this.props.setPointer(this.props.selectedKey);
        }
    }
    loadOptions() {
        var list = [];
        if (this.props.selectAbles) {
            for (var i = 0; i < this.props.selectAbles.length; i++) {
                if (i === this.props.pointer)
                    list.push(
                        <li
                            value={this.props.selectAbles[i].Text}
                            onClick={this.props.onSelectElement.bind(this, this.props.selectAbles[i])}
                            className={"dropdown-suggestion-li selected"}
                            key={this.props.selectAbles[i].Key}
                        >
                            {this.props.selectAbles[i].TemplateColumn || this.props.selectAbles[i].Text}
                        </li>
                    )
                else
                    list.push(
                        <li
                            value={this.props.selectAbles[i].Text}
                            onClick={this.props.onSelectElement.bind(this, this.props.selectAbles[i])}
                            className={"dropdown-suggestion-li"}
                            key={this.props.selectAbles[i].Key}
                        >
                            {this.props.selectAbles[i].TemplateColumn || this.props.selectAbles[i].Text}
                        </li>
                    )
            }
        }
        return list;
    }
}

export default AutoComplete
