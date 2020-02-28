import React, { Component } from 'react'
import SimpleBar from 'simplebar-react';
import Panel from '../../widgets/Panel';
import Field from '../../field/Field';
import List from '../../views/many/List'
import PopUp from '../../field/PopUp';
import Edit from '../../views/one/Edit';
export default class Permission extends Edit {

    constructor(props) {
        super(props);
        this.state = {
            selectedPage: "",
            selectedRows: [],
            popup: null
        }
    }

    createSelectedPage = (e, li) => {
        this.setState({ selectedPage: li })
    }

    setSelectedRow = (e, id) => {
        let previousRows = this.state.selectedRows
        if (e.target.checked) {
            if (!previousRows.includes(id)) {
                previousRows.push(id);
            }
        }
        else {
            if (previousRows.includes(id)) {
                previousRows.pop(id);
            }
        }
    }

    render() {
        const gridModel = {
            "id": "Sample4",
            "title": this.state.selectedPage,
            "customTitle": true,
            "name": "employee",
            "namePlural": "employees",
            "icon": "fas fa-book",
            "fields": [
                {
                    "id": "Name",
                    "inMany": true
                },
                {
                    "id": "Type",
                    "inMany": true
                }
            ]
        }

        const cbs = {
            change: this.fieldChange,
            dropFile: this.uploadFileOne,
            fieldKeyPress: this.fieldKeyPress,
            fieldOnBlur: this.fieldOnBlur,
            dependentAutoCompletes: this.dependentAutoCompletes,
            stateVariable: 'PopUpData'
        }

        const liApplication = li => {
            return (
                <li className="zen-category-content" key={li} onClick={(e) => this.createSelectedPage(e, li)}>
                    <a className="toggle">
                        <div className="zen-hoverable">
                            <div className="zen-menu-item">
                                <div className="zen-menu-item-icon"><i className="fas fa-bullseye" aria-hidden="true"></i></div>
                                <div className="zen-menu-item-label ">{li}</div>
                            </div>
                        </div>
                    </a>
                </li>
            )
        }

        const appPage = p => {
            return (
                this.state.selectedPage ?
                    <List
                        ref={this.state.selectedPage}
                        isCustomPage={true}
                        cardinality={'custom'}
                        customButtons={[]}
                        customActionButtons={[
                            {
                                type: 'checkbox',
                                onClick: (e, id) => this.setSelectedRow(e, id)
                            }
                        ]}
                        hideActions={["read", "delete", "edit"]}
                        postData={this.state.selectedPage}
                        gridModel={gridModel}>
                    </List> : null
            )
        }

        const fnButton = (b) => {
            return (
                this.state.selectedPage ?
                    <button
                        className={"btn btn-primary"}
                        ref={b.id}
                        key={b.id}
                        id={b.id}
                        onClick={b.onClick}
                    >
                        {b.label}
                    </button> : null
            )
        }

        return (
            <div style={{ display: 'flex' }}>
                <div className='zen-container' style={{ position: 'relative', minHeight: '600px' }}>
                    <SimpleBar style={{ maxHeight: `100%` }}>
                        <div className="zen-navigation-container">
                            <ul>
                                <li className="zen-category">
                                    <div className="zen-category-header"><span>Permission:</span></div>
                                    <ul>
                                        <li className="zen-category-content">
                                            <a className="toggle" href="/sample1">
                                                <div className="zen-hoverable">
                                                    <div className="zen-menu-item">
                                                        <div className="zen-menu-item-icon"><i className="fas fa-bullseye" aria-hidden="true"></i></div>
                                                        <div className="zen-menu-item-label ">User</div>
                                                    </div>
                                                </div>
                                            </a>
                                        </li>
                                        <li className="zen-category-content">
                                            <a className="toggle" href="/sample1">
                                                <div className="zen-hoverable">
                                                    <div className="zen-menu-item">
                                                        <div className="zen-menu-item-icon"><i className="fas fa-bullseye" aria-hidden="true"></i></div>
                                                        <div className="zen-menu-item-label ">Group</div>
                                                    </div>
                                                </div>
                                            </a>
                                        </li>
                                    </ul>
                                    <div className="zen-category-header" style={{ margin: '0px' }}><span>Application:</span></div>
                                    <ul>
                                        {["City"].map(liApplication)}
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </SimpleBar>
                </div>
                <div style={{ flex: 1, marginLeft: '10px' }}>
                    {appPage()}
                    <div className="cf-buttons">
                        {[
                            {
                                id: 'addUser', label: "Add User", onClick: this.AddNewUser
                            },
                            {
                                id: 'delete', label: "Delete", onClick: this.DeleteUser
                            },
                            {
                                id: 'deleteGroup', label: "Add Group", onClick: this.AddNewGroup
                            }
                        ].map(fnButton)}
                    </div>
                </div>
                <div id="popups">
                    {this.state.popup ?
                        <PopUp
                            ref={this.state.popup + "PopUp"}
                            show={true}
                            style={{
                                'minWidth': '30%',
                                'minHeight': '35%'
                            }}
                            id={this.state.popup + "PopUp"}
                            onClickSave={this.saveData}
                            onClose={this.popUpClose}
                        >
                            <Panel
                                key={this.state.popup + "PopUp"}
                                title={this.state.popup === "AddUser" ? "Add User" : this.state.popup === "AddGroup" ? "Add Group" : ""}
                                width={100}
                            >
                                <div className="cf-fset">
                                    {this.state.popup === "AddUser" ?
                                        <Field
                                            key={"User"}
                                            ref={"User"}
                                            model={{
                                                "id": "User",
                                                "type": "autocomplete",
                                                "required": true,
                                                "maxLength": 15,
                                                "width": 50,
                                                "serverSide": true,
                                                "autocompleteName": "permission_user"
                                            }}
                                            callbacks={cbs}
                                        /> :
                                        this.state.popup === "AddGroup" ? <Field
                                            key={"Group"}
                                            ref={"Group"}
                                            model={{
                                                "id": "Group",
                                                "type": "multiselect",
                                                "required": true,
                                                "maxLength": 15,
                                                "width": 50,
                                                "serverSide": true,
                                                "autocompleteName": "permission_user"
                                            }}
                                            callbacks={cbs}
                                        /> : null
                                    }
                                </div>
                            </Panel>
                        </PopUp> : null
                    }
                </div>
            </div>
        );
    }

    AddNewUser = (e) => {
        this.setState({ popup: "AddUser" });
    }
    AddNewGroup = (e) => {
        this.setState({ popup: "AddGroup" });
    }
    DeleteUser = (e) => {

    }
    saveData = (e, id) => {
        debugger;
        const { selectedPage, popup, PopUpData } = this.state;
        if (popup === "AddUser") {
            console.log(PopUpData);
        }
        else if (popup === "AddGroup") {
            console.log(PopUpData);
        }
    }
    popUpClose = (props) => {
        this.setState({ popup: null, PopUpData: null });
    }
}