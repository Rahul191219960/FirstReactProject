import React from 'react'
import axios from 'axios'
import { apiPath, autocompletePath } from '../../../src/config'
import { i18n_stats } from '../../i18n/i18n'

export default class AutoCompleteFilter extends React.Component {

    static defaultProps = {
        id: "",
        defaultValue: "",
        defaultKey: "",
        selectAbles: [],
        setValue: function () { },
        extraCondition: function () { },
        // If User Want custom event function to be called
        onSelect: function () { },//on Select Element from the list
        onOpen: function () { },//on Div Open
        onClose: function () { }//on Div close
    }

    constructor(props) {
        super(props);
        this.data = [];
        this.state = {
            dataList: [],
            selectAbles: [],
            selectedValue: props.defaultValue,
            selectedKey: props.defaultKey,
            isShow: false,
            pointer: 0
        }
    }

    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
        if (this.state.selectedKey !== undefined && this.state.selectedValue !== undefined) {
            var index = this.doContains();
            if (index !== -1) {
                this.setState({
                    pointer: index
                });
            }
            else {
                this.setState({
                    pointer: 0
                });
            }
        }
        this.loadData();
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }

    // This Method will close DropDown list
    closeSuggestion = () => {
        this.setState({
            isShow: false
        }, () => {
            this.props.onClose({ type: this.props.type, id: this.props.id, name: this.props.name, selectedValue: this.state.selectedValue, selectedKey: this.state.selectedKey });
        });
    }

    // This will bind value to input box
    setValue = (t) => {
        this.setState({
            selectedValue: t.Text,
            selectedKey: t.Key
        });
        this.setPointer(t.Key);
        this.props.setValue({ value: t.Text, key: t.Key });
    }

    //set pointer
    setPointer = (p) => {
        ;
        for (var i = 0; i < this.state.selectAbles.length; i++) {
            if (this.state.selectAbles[i].Key === p) {
                this.setState({
                    pointer: i
                });
                return;
            }
        }
    }

    //check whether list contain the selected element
    doContains = () => {
        for (var i = 0; i < this.state.selectAbles.length; i++) {
            if (this.state.selectAbles[i].Key === this.state.selectedKey && this.state.selectAbles[i].Text === this.state.selectedValue) {
                return i;
            }
        }
        return -1;
    }

    // This will work when element is selected from the list
    onSelectElement = (e, t) => {
        this.props.onSelect(e, t);
        this.setValue(t);
        this.closeSuggestion();
    }
    // This will close the list if mouse click is outside the dropdown 
    handleClickOutside = (e) => {
        if (this.node !== undefined && this.node.contains(e.target)) {
            return;
        }
        else {
            if (this.state.isShow) {
                this.closeSuggestion();
            }
        }
    }
    //provide event functions that user passed
    getFunctionsToBind = () => {
        var functionLists = [];
        for (var key in this.props) {
            if (this.props[key] instanceof Function) {
                var obj = {
                    event: key.toLowerCase().replace("on", ""),
                    func: this.props[key]
                }
                functionLists.push(obj);
            }
        }
        return functionLists;
    }

    //get data from server

    getServerData = (val, model) => {
        this.setState({
            isShow: true,
            spinner: true //this will rerender the list
        });
        const createFilter = () => {
            const obj = this.props.extraCondition(model);
            const autocomplete = {
                Filters: obj,
                AutoCompleteNames: model.autocompleteName,
                PageSize: 20
            }
            return autocomplete;
        }
        axios(
            {
                method: 'post',
                url: apiPath + autocompletePath,
                data: JSON.stringify(createFilter()),
                headers: { "Content-Type": "application/json" }
            }
        ).then(response => {
            const templist = response.data.Data;
            this.setState({
                selectAbles: templist,
                isShow: true, //this will rerender the list
                pointer: 0,
                spinner: false
            });
            if (templist.length === 0) {
                this.closeSuggestion();
            }
        }).catch(error => {
            this.setState({
                error: i18n_stats.noData,
                spinner: false
            });
        });
    }
}