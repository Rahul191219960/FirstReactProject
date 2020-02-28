import React, { Component } from 'react';
import axios from 'axios'
import { apiPath, autocompletePath, autocompletePazeSize } from '../../../src/config'
import AsyncSelect from 'react-select/async';
import Select from "react-select";
import { isThisQuarter } from 'date-fns';

export default class AutoComplete extends Component {

    static defaultProps = {
        OnSelectedOption: function () { },
        extraCondition: function () { },
        extraParameter: function () { }
    }

    constructor(props) {
        super(props);
        this.state = {
            inputValue: '',
            selectedOption: this.props.defaultValue,
            defaultOptions: this.props.defaultOptions,
            dependents: this.props.defaultOptions
        };
        this.getOptions = this.getOptions.bind(this);
        this.setDefaultOptions = this.setDefaultOptions.bind(this);
    }

    handleChange = (selectedOption) => {
        this.setState({
            selectedOption: selectedOption
        });
        // ;
        if (this.isMulti === false) {
            if (selectedOption) {
                this.props.OnSelectedOption(selectedOption);
            }
            else {
                this.props.OnSelectedOption({ label: '', value: '' });
            }
        }
        else {
            this.getOptions("", (data) => { this.setState({ defaultOptions: data }) }); //only for multiselect
            if (selectedOption) {
                this.props.OnSelectedOption(selectedOption);
            }
            else {
                this.props.OnSelectedOption([{ label: '', value: '' }]);
            }
        }
    }

    handleInputChange = (inputValue) => {
        this.setState({ inputValue });
        return inputValue;
    }

    handleFocus = (e) => {
        this.getOptions(e.target.value, (data) => { this.setState({ defaultOptions: data }) });
    }

    async getOptions(inputValue, callback) {
        if (this.props.serverSide) {
            const createFilter = () => {
                if (this.props.IsMulti)
                    return ({
                        Filters: this.props.extraCondition(this.props.model, this.state.selectedOption, inputValue),
                        Params: this.props.extraParameter(this.props.model, this.state.selectedOption, inputValue),
                        AutoCompleteNames: this.props.model.autocompleteName,
                        Value: inputValue,
                        PageSize: autocompletePazeSize,
                        IsMulti: true,
                        ForMulti: this.state.selectedOption
                    });
                else
                    return ({
                        Filters: this.props.extraCondition(this.props.model, this.state.selectedOption, inputValue),
                        Params: this.props.extraParameter(this.props.model, this.state.selectedOption, inputValue),
                        AutoCompleteNames: this.props.model.autocompleteName,
                        Value: inputValue,
                        PageSize: autocompletePazeSize
                    });
            }
            await axios(
                {
                    method: 'post',
                    url: apiPath + autocompletePath,
                    data: JSON.stringify(createFilter()),
                    headers: { "Content-Type": "application/json" }
                }
            ).then(response => {
                callback(response.data.Data);
            }).catch(error => {
                callback([]);
            });
        }
        else if (this.state.isDependent) {
            // if (inputValue === "" && this.state.dependents) {
            //     let templist = [];
            //     for (var i = 0; i < autocompletePazeSize; i++) {
            //         templist.push(this.state);
            //     }
            // }
            // else
            callback(
                this.state.dependents ? this.state.dependents.filter((i, index) =>
                    i.label.toLowerCase().includes(inputValue.toLowerCase()) && index < autocompletePazeSize
                ) : []
            );
        }
        else {
            callback(
                this.state.defaultOptions ? this.state.defaultOptions.filter(i =>
                    i.label.toLowerCase().includes(inputValue.toLowerCase())
                ) : []
            );
        }
    }

    noOptionsMessage = (props) => {

    }

    getOptionValue = option => {
        return option.value || option.id;
    };

    getOptionLabel = option => {
        return option.label || option.name;
    }

    onmenuOpen = (a, b) => {
    }

    async setDefaultOptions(autocompleteName, value) {
        const createFilter = () => {
            return ({
                Filters: this.props.extraCondition(this.props.model, value, this.state.inputValue),
                Params: this.props.extraParameter(this.props.model, value, this.state.inputValue),
                AutoCompleteNames: autocompleteName,
                Value: "",
                PageSize: 20000
            });
        }
        await axios(
            {
                method: 'post',
                url: apiPath + autocompletePath,
                data: JSON.stringify(createFilter()),
                headers: { "Content-Type": "application/json" }
            }
        ).then(response => {
            this.setState({ dependents: response.data.Data, selectedOption: [], defaultOptions: [], isDependent: true });
        }).catch(error => {
            this.setState({ defaultOptions: [], dependents: [], isDependent: true });
        });
    }
    render() {
        const { id, name, placeholder, IsMulti, closeMenuOnSelect } = this.props;
        return (
            <AsyncSelect
                id={id}
                name={name}
                value={this.state.selectedOption}
                isMulti={IsMulti}
                isClearable={true}
                getOptionValue={this.getOptionValue}
                getOptionLabel={this.getOptionLabel}
                defaultOptions={this.state.defaultOptions}
                loadOptions={this.getOptions}
                placeholder={placeholder}
                onChange={this.handleChange}
                onFocus={this.handleFocus}
                closeMenuOnSelect={closeMenuOnSelect}
            />
        );
    }
}