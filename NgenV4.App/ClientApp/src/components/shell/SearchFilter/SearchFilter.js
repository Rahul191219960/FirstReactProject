import React, { Component } from 'react'
import './SearchFilter.scss';
import SearchFilterColor from './SearchFilterColors';
import uuid from 'uuid';
import { i18n } from '../../../i18n/i18n';
import { toast } from 'react-toastify';
import { GridOperators } from './GridOperators';
// import Axios from 'axios';
import { apiPath } from '../../../config.js'

export default class SearchFilter extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showFilterContainer: false,
            filterRows: [
                {
                    rowid: uuid(),
                    andOr: null,
                    field: '',
                    _operator: '',
                    value: '',
                    groupChecked: false
                }
            ],
            groupList: [],
            groupIndicator: [],
            operatorList: [],
            firstRender: true
        }
        this.addRowToTable = this.addRowToTable.bind(this);
        this.executeSearch = this.executeSearch.bind(this);
        this.deleteRow = this.deleteRow.bind(this);
        this.setValues = this.setValues.bind(this);
        this.makeGroup = this.makeGroup.bind(this);
        this.onClickDeleteGroup = this.onClickDeleteGroup.bind(this);
        this.setOperator = this.setOperator.bind(this);
    }

    updateState = () => {
        let filterRows = this.state.filterRows;
        // let rows = [];
        let dataset = this.refs;

        filterRows.forEach(element => {
            const field = dataset[element.rowid + "_field"].value
            const operator = dataset[element.rowid + "_operator"].value
            const value = dataset[element.rowid + "_value"].value
            element.field = field
            element._operator = operator
            element.valueList = value
        })

        this.setState({
            filterRows: filterRows
        })
    }

    addRowToTable = (e) => {
        let rows = this.state.filterRows;
        rows.push({
            rowid: uuid(),
            andOr: '',
            field: '',
            _operator: '',
            value: '',
            groupChecked: false
        });

        this.setState({
            filterRows: rows,
            firstRender: false
        })
    }

    deleteRowFromGroup = (groupList, rowId) => {
        for (var i = 0; i < groupList.length; i++) {
            var element = groupList[i];
            var findIdx = element.valueList.findIndex(x => x == rowId);

            if (findIdx !== -1) {

                //Remove the element from the array of values
                element.valueList.splice(findIdx, 1);

                //If 1 element left in array then remove the whole group
                if (element.valueList.length <= 1) {
                    groupList.splice(i, 1);
                    continue;
                }

                //If subgroup exists then recursively remove from child too
                if (element.subGroups.length > 0) {
                    this.deleteRowFromGroup(element.subGroups, rowId);
                }
            }
        }
    }

    deleteRow = (rowId) => {
        let rows = this.state.filterRows;
        let idx = rows.findIndex(x => x.rowid == rowId);
        rows.splice(idx, 1);

        let groupList = this.state.groupList;

        if (groupList.length > 0) {
            this.deleteRowFromGroup(groupList, rowId);
        }

        this.segregateGroups();

        this.setState({
            filterRows: rows,
            groupList: groupList
        })
    }

    setValues = (rowid, e) => {
        let rows = this.state.filterRows;
        let obj = rows.find(x => x.rowid == rowid);
        let val;
        if (e.currentTarget.type == "checkbox") {
            val = e.currentTarget.checked;
        } else {
            val = e.currentTarget.value;
        }
        obj[e.currentTarget.name] = val;
        this.setState({
            filterRows: rows,
            firstRender: false
        })
    }

    checkSuperGroupInChildren = (groupList, checkedList, idList) => {
        let atleast1Child = false;
        var obj = undefined;
        var elemPos = 0;
        for (i = 0; i < groupList.length; i++) {
            let element = groupList[i];
            var arr1 = element.valueList;
            var arr2 = checkedList;
            let supergrp = true;
            arr1.forEach(element => {
                var find = arr2.find(x => x.rowid == element);
                if (find == undefined) {
                    supergrp = false;
                    return;
                }
            });

            //New group is a super group so move all the current group elements in this group
            if (supergrp) {
                if (!atleast1Child) {
                    var temp = [];
                    temp.push(element);
                    obj = {
                        groupId: uuid(),
                        valueList: idList,
                        subGroups: temp,
                        _operator: 'AND'
                    }
                    atleast1Child = true;
                } else {
                    obj.subGroups.push(element);
                }

                elemPos = i;
                groupList.splice(i, 1);
                i--;
            }
        }

        if (atleast1Child) {
            groupList.push(obj);
        } else {
            //No child group found on this level so now check in deeper levels
            for (var i = 0; i < groupList.length; i++) {
                var elem = groupList[i];
                if (elem.subGroups.length > 0) {
                    let processFurther = this.checkSuperGroupInChildren(elem.subGroups, checkedList, idList);
                    if (!processFurther)
                        return false;
                }
            }
        }
        return atleast1Child;
    }

    makeGroup = () => {
        let rowList = this.state.filterRows;

        //Find checked list
        let checkedList = [];
        for (var i = 0; i < rowList.length; i++) {
            let element = rowList[i];
            if (element.groupChecked)
                checkedList.push(element);
        }

        var idList = [];
        checkedList.forEach(element => {
            idList.push(element.rowid)
        });

        //Check if 2 boxes are selected or not!
        let checkedCount = 0;
        rowList.forEach(element => {
            if (element.groupChecked)
                ++checkedCount;
            if (checkedCount >= 2)
                return;
        })
        if (checkedCount < 2) {
            toast.info(i18n.i18n_CF_GridSearch.checkbox_min_select);
            return;
        }

        //Check if groups are adjacent or not
        let startObj = checkedList[0];
        let endObj = checkedList[checkedList.length - 1];
        let startIdx = rowList.findIndex(x => x.rowid == startObj.rowid);
        let endIdx = rowList.findIndex(x => x.rowid == endObj.rowid);
        let adjacent = true;
        for (startIdx; startIdx <= endIdx; startIdx++) {
            if (rowList[startIdx].groupChecked == false) {
                adjacent = false;
                break;
            }
        }

        if (!adjacent) {
            toast.info(i18n.i18n_CF_GridSearch.adjacent);
            return;
        }

        let groupList = this.state.groupList;

        //Check if same group exists
        for (i = 0; i < groupList.length; i++) {
            let element = groupList[i];
            let elem1_checked_rowid = checkedList[0].rowid;                             //start
            let elem2_checked_rowid = checkedList[checkedList.length - 1].rowid;        //end
            let elem1_group_rowid = element.valueList[0];
            let elem2_group_rowid = element.valueList[element.valueList.length - 1];
            if (elem1_checked_rowid == elem1_group_rowid && elem2_checked_rowid == elem2_group_rowid) {
                toast.info(i18n.i18n_CF_GridSearch.exists);
                return;
            }
        }

        //Check if groups intersect or not & new one is not a sub group
        for (i = 0; i < groupList.length; i++) {
            let element = groupList[i];
            var arr1 = element.valueList;
            var arr2 = checkedList;
            let intersect = false;
            let s1 = arr1[0];
            let e1 = arr1[arr1.length - 1];
            let s2 = arr2[0].rowid;
            let e2 = arr2[arr2.length - 1].rowid;
            if (s1 != s2 && e1 != e2) {
                arr1.forEach(element => {
                    var find = arr2.find(x => x.rowid == element);
                    if (find != undefined) {
                        intersect = true;
                        return;
                    }
                });
            }

            //If intersect is true, then check if new group is supergroup or not, if yes then set intersect to false;
            let supergrp = true;
            arr1.forEach(element => {
                var find = arr2.find(x => x.rowid == element)
                if (find == undefined) {
                    supergrp = false;
                    return;
                }
            })
            if (supergrp == true)
                intersect = false;

            let subgrp = true;
            arr2.forEach(element => {
                var find = arr1.find(x => x == element.rowid);
                if (find == undefined) {
                    subgrp = false;
                    return;
                }
            });
            if (intersect == true && subgrp == false) {
                toast.info(i18n.i18n_CF_GridSearch.intersect);
                return;
            }
        }

        //Check if new one is super-group or not
        let atleast1Child = false;
        var obj = undefined;
        var elemPos = 0;
        for (i = 0; i < groupList.length; i++) {
            let element = groupList[i];
            var arr1 = element.valueList;
            var arr2 = checkedList;
            let supergrp = true;
            arr1.forEach(element => {
                var find = arr2.find(x => x.rowid == element);
                if (find == undefined) {
                    supergrp = false;
                    return;
                }
            });

            //New group is a super group so move all the current group elements in this group
            if (supergrp) {
                if (!atleast1Child) {
                    var temp = [];
                    temp.push(element);
                    obj = {
                        groupId: uuid(),
                        valueList: idList,
                        subGroups: temp,
                        _operator: 'AND'
                    }
                    atleast1Child = true;
                } else {
                    obj.subGroups.push(element);
                }

                elemPos = i;
                groupList.splice(i, 1);
                i--;
            }
        }

        if (atleast1Child) {
            groupList.push(obj);
            this.setState({
                groupList: groupList
            })
            this.segregateGroups();
            return;
        } else {
            //No child group found on this level so now check in deeper levels
            for (var i = 0; i < groupList.length; i++) {
                var elem = groupList[i];
                if (elem.subGroups.length > 0) {
                    let processFurther = !this.checkSuperGroupInChildren(elem.subGroups, checkedList, idList);
                    if (!processFurther) {
                        this.setState({
                            groupList: groupList
                        })
                        this.segregateGroups();
                        return;
                    }
                }
            }
        }

        //Check if new one is subgroup or not
        for (i = 0; i < groupList.length; i++) {
            let element = groupList[i];
            var arr1 = element.valueList;
            var arr2 = checkedList;
            let subgrp = true;
            arr2.forEach(element => {
                var find = arr1.find(x => x == element.rowid);
                if (find == undefined) {
                    subgrp = false;
                    return;
                }
            });

            //New group is a sub-group. Process recursively for childs
            if (subgrp) {
                this.processSubGroup(element.subGroups, checkedList);
                this.setState({
                    groupList: groupList
                })
                this.segregateGroups();
                return;
            }
        }

        var newObj = {
            groupId: uuid(),
            valueList: idList,
            subGroups: [],
            _operator: 'AND'
        }
        //No condition is fullfilled so add it to the list
        groupList.push(newObj);

        this.segregateGroups();

        this.setState({
            groupList: groupList
        })
    }

    processSubGroup = (groupList, checkedList) => {
        var idList = [];
        checkedList.forEach(element => {
            idList.push(element.rowid)
        });

        //Check if same group exists
        for (var i = 0; i < groupList.length; i++) {
            let element = groupList[i];
            let elem1_checked_rowid = checkedList[0].rowid;                             //start
            let elem2_checked_rowid = checkedList[checkedList.length - 1].rowid;        //end
            let elem1_group_rowid = element.valueList[0];
            let elem2_group_rowid = element.valueList[element.valueList.length - 1];
            if (elem1_checked_rowid == elem1_group_rowid && elem2_checked_rowid == elem2_group_rowid) {
                toast.info(i18n.i18n_CF_GridSearch.exists);
                return;
            }
        }

        //Check if groups intersect or not & new one is not a sub group
        for (i = 0; i < groupList.length; i++) {
            let element = groupList[i];
            var arr1 = element.valueList;
            var arr2 = checkedList;
            let intersect = false;
            let s1 = arr1[0];
            let e1 = arr1[arr1.length - 1];
            let s2 = arr2[0].rowid;
            let e2 = arr2[arr2.length - 1].rowid;
            if (s1 != s2 && e1 != e2) {
                arr1.forEach(element => {
                    var find = arr2.find(x => x.rowid == element);
                    if (find != undefined) {
                        intersect = true;
                        return;
                    }
                });
            }

            //If intersect is true, then check if new group is supergroup or not, if yes then set intersect to false;
            let supergrp = true;
            arr1.forEach(element => {
                var find = arr2.find(x => x.rowid == element)
                if (find == undefined) {
                    supergrp = false;
                    return;
                }
            })
            if (supergrp == true)
                intersect = false;

            let subgrp = true;
            arr2.forEach(element => {
                var find = arr1.find(x => x == element.rowid);
                if (find == undefined) {
                    subgrp = false;
                    return;
                }
            });
            if (intersect == true && subgrp == false) {
                toast.info(i18n.i18n_CF_GridSearch.intersect);
                return;
            }
        }

        //Check if new one is super-group or not
        for (i = 0; i < groupList.length; i++) {
            let element = groupList[i];
            var arr1 = element.valueList;
            var arr2 = checkedList;
            let supergrp = true;
            arr1.forEach(element => {
                var find = arr2.find(x => x.rowid == element);
                if (find == undefined) {
                    supergrp = false;
                    return;
                }
            });

            //New group is a super group so move all the current group elements in this group
            if (supergrp) {
                var obj = {
                    groupId: uuid(),
                    valueList: idList,
                    subGroups: element,
                    _operator: 'AND'
                }
                groupList[i] = obj;
                return;
            }
        }

        //Check if new one is subgroup or not
        for (i = 0; i < groupList.length; i++) {
            let element = groupList[i];
            var arr1 = element.valueList;
            var arr2 = checkedList;
            let subgrp = true;
            arr2.forEach(element => {
                var find = arr1.find(x => x == element.rowid);
                if (find == undefined) {
                    subgrp = false;
                    return;
                }
            });

            //New group is a sub-group. Process recursively for childs
            if (subgrp) {
                this.processSubGroup(element.subGroups, checkedList);
                return;
            }
        }

        var newObj = {
            groupId: uuid(),
            valueList: idList,
            subGroups: [],
            _operator: 'AND'
        }
        //No condition is fullfilled so add it to the list
        groupList.push(newObj);
    }

    findDepth = (groupList, depth) => {
        if (groupList.length > 0) {
            depth++;
        }
        let prevDepth = depth;
        var newDepth = depth;
        for (var i = 0; i < groupList.length; i++) {
            var obj = groupList[i].subGroups;
            if (obj.length > 0) {
                depth = this.findDepth(obj, depth);
                newDepth = (newDepth > depth) ? newDepth : depth;
                depth = prevDepth;
            }
        }
        return newDepth;
    }

    processSingleRowForGroup = (groupList, rowId, groupIndicator, rowObj) => {
        for (var i = 0; i < groupList.length; i++) {
            let obj = groupList[i];
            let findObj = obj.valueList.find(x => x == rowId);
            if (findObj != undefined) {
                rowObj.indicator.push(obj.groupId);
                if (obj.subGroups.length > 0) {
                    this.processSingleRowForGroup(obj.subGroups, rowId, groupIndicator, rowObj);
                }
                break;
            }
        }
    }

    getPosition(groupList, rowId, groupId) {
        let position = "";
        for (var i = 0; i < groupList.length; i++) {
            var elem = groupList[i];
            if (elem.groupId == groupId) {
                let idx = elem.valueList.findIndex(x => x == rowId);
                if (idx == 0) {
                    position = "start";
                } else if (idx == elem.valueList.length - 1) {
                    position = "end";
                } else {
                    position = "mid";
                }
                break;
            }

            if (elem.subGroups.length > 0) {
                position = this.getPosition(elem.subGroups, rowId, groupId);
                if (position != "")
                    break;
            }
        }
        return position;
    }

    segregateGroups = () => {
        let filterRows = this.state.filterRows;
        let groupList = this.state.groupList;

        let groupIndicator = [];

        filterRows.forEach(element => {
            var rowId = element.rowid;
            var rowObj = {
                rowId: rowId,
                indicator: []
            }
            this.processSingleRowForGroup(groupList, rowId, groupIndicator, rowObj);
            groupIndicator.push(rowObj);
        });

        const depth = this.findDepth(this.state.groupList, 0);
        groupIndicator.forEach(element => {
            if (element.indicator.length != depth) {
                var counter = depth - element.indicator.length;
                while (counter > 0) {
                    element.indicator.push(-1);
                    counter--;
                }
            }
        });

        groupIndicator.forEach(element => {
            for (var i = 0; i < element.indicator.length; i++) {
                var item = element.indicator[i];
                var position = "";
                if (item != -1) {
                    position = this.getPosition(groupList, element.rowId, item);
                }
                var obj = {
                    groupId: item,
                    position: position
                }
                element.indicator[i] = obj;
            }
        })


        filterRows.forEach(_object => {
            _object.groupChecked = false;
        })

        this.setState({
            groupIndicator: groupIndicator,
            filterRows: filterRows
        });
    }

    createOperatorList = (groupList, operatorList) => {
        for (var i = 0; i < groupList.length; i++) {
            let obj = groupList[i];
            operatorList.push({
                groupId: obj.groupId,
                _operator: obj._operator
            })
            if (obj.subGroups.length > 0) {
                this.createOperatorList(obj.subGroups, operatorList);
            }
        }
    }

    setOperatorInChild = (groupList, groupId, e) => {
        for (var i = 0; i < groupList.length; i++) {
            let obj = groupList[i];
            if (obj.groupId == groupId) {
                obj._operator = e.currentTarget.value;
                break;
            }
            if (obj.subGroups.length > 0) {
                this.setOperatorInChild(obj.subGroups, groupId, e);
            }
        }
    }

    setOperator = (groupId, e) => {
        let groupList = this.state.groupList;
        for (var i = 0; i < groupList.length; i++) {
            let obj = groupList[i];
            if (obj.groupId == groupId) {
                obj._operator = e.currentTarget.value;
                break;
            }
            if (obj.subGroups.length > 0) {
                this.setOperatorInChild(obj.subGroups, groupId, e);
            }
        }

        //Create operatorList
        let operatorList = [];
        this.createOperatorList(groupList, operatorList);

        this.setState({
            groupList: groupList,
            operatorList: operatorList
        })
    }

    deleteGroupFromChild = (groupList, groupId) => {
        for (var i = 0; i < groupList.length; i++) {
            let obj = groupList[i];
            if (obj.groupId == groupId) {
                //Move all child groups to parent level and remove parent group
                if (obj.subGroups.length > 0) {
                    obj.subGroups.forEach(element => {
                        groupList.push(element);
                    });
                }
                groupList.splice(i, 1);
                break;
            }
            if (obj.subGroups.length > 0) {
                this.deleteGroupFromChild(obj.subGroups, groupId);
            }
        }
    }

    onClickDeleteGroup = (groupId) => {
        let groupList = this.state.groupList;
        for (var i = 0; i < groupList.length; i++) {
            let obj = groupList[i];
            if (obj.groupId == groupId) {
                //Move all child groups to parent level and remove parent group
                if (obj.subGroups.length > 0) {
                    obj.subGroups.forEach(element => {
                        groupList.push(element);
                    });
                }
                groupList.splice(i, 1);
                break;
            }
            if (obj.subGroups.length > 0) {
                this.deleteGroupFromChild(obj.subGroups, groupId);
            }
        }
        this.setState({
            groupList: groupList
        })
        this.segregateGroups();
    }

    executeSearch = () => {
        this.updateState();
        let groupList = this.state.groupList || []
        let filterRows = this.state.filterRows
        let rowIdList = []
        groupList.forEach(element => {
            element.valueList.forEach(elem => {
                let idx = rowIdList.findIndex(x => x == elem);
                if (idx == -1)
                    rowIdList.push(elem);
            });
        })

        let allFound = true;
        filterRows.forEach(element => {
            let idx = rowIdList.findIndex(x => x == element.rowid);
            if (idx == -1) {
                allFound = false;
                return;
            }
        });

        let list = []

        if (!allFound) {
            let valueList = []
            filterRows.forEach(a => {
                valueList.push(a.rowid);
            })

            let subGroups = []
            groupList.forEach(element => {
                subGroups.push(element)
            })

            let obj = {
                groupId: uuid(),
                valueList: valueList,
                subGroups: subGroups,
                _operator: 'AND'
            }

            list.push(obj)
        }

        if (list.length === 0) {
            list = this.state.groupList
        }

        //Send axios request
        const url = apiPath + this.props.entity + '/GetList';
        let searchParams = {
            filterRows: this.state.filterRows,
            groupList: list
        }

        this.props.searchDataHandler(searchParams);
    }

    render() {
        let filterRows = this.state.filterRows;
        let groupIndicator = this.state.groupIndicator;
        let operatorList = this.state.operatorList;
        let fields = this.props.model.fields ? this.props.model.fields : [];
        fields = fields.filter(x => x.inMany == true);
        let operatorArray = [];
        let rowFieldType = 'text';

        if (this.state.firstRender) {
            if (fields.length > 0) {
                const firstRowField = fields[0];
                operatorArray = GridOperators[firstRowField.type] || GridOperators[`text`];
            }
        }

        return (
            // <div className={`filter-container`}>
            <div className={`filter-container ${this.props.display}`}>
                <hr className="search-divider"></hr>
                <table className="filter-table-container">
                    <tbody>
                        <tr>
                            <th><i title="Create Group" onClick={this.makeGroup} className="fas fa-layer-group make-group"></i></th>
                            <th style={{ width: `70px` }}>{i18n.i18n_CF_GridSearch.gridLabels.delete}</th>
                            <th></th>
                            <th style={{ width: `auto` }}>{i18n.i18n_CF_GridSearch.gridLabels.field}</th>
                            <th style={{ width: `auto` }}>{i18n.i18n_CF_GridSearch.gridLabels.operator}</th>
                            <th style={{ width: `auto` }}>{i18n.i18n_CF_GridSearch.gridLabels.value}</th>
                        </tr>
                        {filterRows.map((item, index) => {
                            const makeAndOrBox = !(item.andOr == null);
                            const checkboxval = (item.groupChecked == "on" || item.groupChecked == true) ? true : false;
                            const val = item.value;
                            const fieldval = item.field != '' ? item.field : "";
                            const operatorVal = item._operator != '' ? item._operator : "";
                            const grp = groupIndicator.find(x => x.rowId == item.rowid);
                            if (!this.state.firstRender) {
                                let _typeObj = {};
                                if (item.field == undefined || item.field.length == 0) {
                                    if (fields.length > 0) {
                                        const firstRowField = fields[0];
                                        operatorArray = GridOperators[firstRowField.type];
                                        rowFieldType = firstRowField.type;
                                    }
                                } else {
                                    _typeObj = fields.find(x => x.label == item.field);
                                    operatorArray = GridOperators[_typeObj.type];
                                    rowFieldType = _typeObj.type;
                                }
                            }

                            return (
                                <tr key={index} id={item.rowid}>
                                    <td><input checked={checkboxval} type="checkbox" name="groupChecked" onChange={(e) => this.setValues(item.rowid, e)}></input></td>
                                    <td>
                                        {makeAndOrBox ? (
                                            <i title="Delete Row" className="fas fa-times red delete-row" onClick={() => { this.deleteRow(item.rowid) }}></i>
                                        ) : (
                                                <div></div>
                                            )}
                                    </td>
                                    <td className="group-selection">
                                        {
                                            (grp != undefined) ? (
                                                grp.indicator.map((item, idx) => {
                                                    idx = idx % 4;
                                                    const newIdx = 4 - (idx + 1);
                                                    const color = SearchFilterColor[newIdx];
                                                    let groupDiv = <div></div>
                                                    const andOrObj = operatorList.find(x => x.groupId == item.groupId);
                                                    let andOrVal = "AND";
                                                    if (andOrObj != undefined) {
                                                        andOrVal = andOrObj._operator;
                                                    }
                                                    if (item.position == "start") {
                                                        groupDiv = <div title="Delete Group" className="group-trash-icon" onClick={() => this.onClickDeleteGroup(item.groupId)}><i className="fas fa-trash"></i></div>
                                                    } else if (item.position == "end") {
                                                        groupDiv =
                                                            <div>
                                                                <select value={andOrVal} type="select" className="select-group-operation" name="andOr" onChange={(e) => this.setOperator(item.groupId, e)}>
                                                                    <option value="AND">AND</option>
                                                                    <option value="OR">OR</option>
                                                                </select>
                                                            </div>
                                                    } else {
                                                        groupDiv = <div></div>
                                                    }
                                                    return (
                                                        (item.groupId != -1) ? (
                                                            <div key={idx} style={{ backgroundColor: color }} className={`colored-group ${item.position}`}>
                                                                {groupDiv}
                                                            </div>
                                                        ) : (
                                                                <div key={idx} className="empty-group"></div>
                                                            )
                                                    );
                                                })
                                            ) : (
                                                    <div></div>
                                                )
                                        }
                                    </td>
                                    <td>
                                        <select ref={item.rowid + '_field'} autoComplete="off" value={fieldval} type="select" className="form-control" name="field" onChange={(e) => this.setValues(item.rowid, e)} style={{ width: `200px` }}>
                                            {
                                                fields.map((item, index) => {
                                                    return (
                                                        <option key={index} value={item.label}>{item.label}</option>
                                                    )
                                                })
                                            }
                                        </select>
                                    </td>
                                    <td>
                                        <select ref={item.rowid + '_operator'} autoComplete="off" value={operatorVal} type="select" className="form-control" name="_operator" onChange={(e) => this.setValues(item.rowid, e)} style={{ width: `200px` }}>
                                            {
                                                operatorArray.map((tp, index) => {
                                                    return (
                                                        <option key={index} value={tp}>{tp}</option>
                                                    );
                                                })
                                            }
                                        </select>
                                    </td>
                                    <td>
                                        <input ref={item.rowid + '_value'} autoComplete="off" value={val} type="select" className="form-control" name="value" onChange={(e) => this.setValues(item.rowid, e)} style={{ width: `200px` }}></input>
                                    </td>
                                </tr>
                            )
                        }, this)}
                    </tbody>
                </table>
                <div className="add-row-wrapper">
                    <div className="add-row-btn-container" onClick={this.addRowToTable}>
                        <i className="fas fa-plus add-row green"></i>
                        <span>{i18n.i18n_CF_GridSearch.gridButtons.addClause}</span>
                    </div>

                    <div className="add-row-btn-container" onClick={this.executeSearch}>
                        <i className="fas fa-search green"></i>
                        <span>{i18n.i18n_CF_GridSearch.gridButtons.runQuery}</span>
                    </div>
                </div>
            </div>
        )
    }
}