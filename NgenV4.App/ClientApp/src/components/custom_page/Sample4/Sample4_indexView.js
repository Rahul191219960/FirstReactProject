import React, { Component } from 'react'
import List from '../../views/many/List'
import PopUp from '../../field/PopUp';
import Panel from '../../widgets/Panel';
import Field from '../../field/Field';
import { apiPath } from '../../../config.js'
import axios from 'axios'
import { toast } from 'react-toastify';
import Edit from '../../views/one/Edit';
import { i18n } from '../../../i18n/i18n'

const gridModel = {
    "id": "Sample4",
    "title": "Employee",
    "name": "employee",
    "namePlural": "employees",
    "icon": "fas fa-book",
    "fields": [
        {
            "id": "EmployeeID",
            "label": "Employee ID",
            "inMany": true
        },
        {
            "id": "EmployeeName",
            "label": "Employee Name",
            "inMany": true
        },
        {
            "id": "Designation",
            "label": "Designation",
            "inMany": true
        }
    ]
}

export default class Sample4_IndexView extends Edit {

    constructor(props) {
        super(props);
        this.state = {
            data: {
                EmployeeID: "",
                EmployeeName: "",
                Designation: "",
                Gender: "",
                Address: ""
            },
            id: -1
        }
    }

    afterMount = (props) => {
        document.getElementById('delete').addEventListener('click', this.deleteData);
    }

    render() {
        const cbs = {
            change: this.fieldChange,
            dropFile: this.uploadFileOne,
            fieldKeyPress: this.fieldKeyPress,
            fieldOnBlur: this.fieldOnBlur,
            dependentAutoCompletes: this.dependentAutoCompletes,
            stateVariable: 'data'
        }
        return (
            <div>
                <List ref={"list"} onClickEdit={this.openEdit} onClickNew={this.openNew} onClickRead={this.openRead} onClickDelete={this.openDelete} isCustomPage={true} gridModel={gridModel}></List>
                {this.state.mode === "new" ? <PopUp
                    ref={"NewPopUp"}
                    show={true}
                    style={{
                        'maxWidth': '40%',
                        'minHeight': '75%'
                    }}
                    id={"NewPopUp"}
                    onClickSave={this.saveData}
                    onClose={this.popUpClose}
                >
                    <Panel
                        key={"sample4"}
                        title={"Add"}
                        width={100}
                    >
                        <div className="cf-fset">
                            <Field
                                key={"EmployeeID"}
                                ref={"EmployeeID"}
                                model={{
                                    "id": "EmployeeID",
                                    "label": "Employee ID",
                                    "maxLength": 5,
                                    "inMany": true,
                                    "width": 50,
                                    "type": "text",
                                    "minLength": 2,
                                    "toUpperCase": true
                                }}
                                callbacks={cbs}
                                value={this.state.data["EmployeeID"]}
                            />

                            <Field
                                key={"EmployeeName"}
                                ref={"EmployeeName"}
                                model={{
                                    "id": "EmployeeName",
                                    "label": "Employee Name",
                                    "maxLength": 5,
                                    "inMany": true,
                                    "width": 50,
                                    "type": "text",
                                    "minLength": 2,
                                    "toUpperCase": true
                                }}
                                callbacks={cbs}
                                value={this.state.data["EmployeeName"]}
                            />

                            <Field
                                key={"Designation"}
                                ref={"Designation"}
                                model={{
                                    "id": "Designation",
                                    "label": "Designation",
                                    "maxLength": 5,
                                    "inMany": true,
                                    "width": 50,
                                    "type": "text",
                                    "minLength": 2,
                                    "toUpperCase": true
                                }}
                                callbacks={cbs}
                                value={this.state.data["Designation"]}
                            />

                            <Field
                                key={"Gender"}
                                ref={"Gender"}
                                model={{
                                    "id": "Gender",
                                    "label": "Gender",
                                    "maxLength": 5,
                                    "inMany": true,
                                    "width": 50,
                                    "type": "text",
                                    "minLength": 2,
                                    "toUpperCase": true
                                }}
                                callbacks={cbs}
                                value={this.state.data["Gender"]}
                            />

                            <Field
                                key={"Address"}
                                ref={"Address"}
                                model={{
                                    "id": "Address",
                                    "label": "Address",
                                    "maxLength": 5,
                                    "inMany": true,
                                    "width": 50,
                                    "type": "textmultiline",
                                    "minLength": 2,
                                    "toUpperCase": true
                                }}
                                callbacks={cbs}
                                value={this.state.data["Address"]}
                            />

                            <Field
                                key={"country"}
                                ref={"country"}
                                model={{
                                    "id": "country",
                                    "type": "autocomplete",
                                    "label": "Country",
                                    "required": true,
                                    "maxLength": 15,
                                    "inMany": false,
                                    "width": 50,
                                    "serverSide": true,
                                    "autocompleteName": "todo_country"
                                }}
                                callbacks={cbs}
                                value={this.state.data["country"]}
                            />

                            <Field
                                key={"city"}
                                ref={"city"}
                                model={{
                                    "id": "city",
                                    "type": "multiselect",
                                    "label": "City",
                                    "required": true,
                                    "maxLength": 15,
                                    "inMany": false,
                                    "width": 50,
                                    "serverSide": true,
                                    "autocompleteName": "todo_city"
                                }}
                                callbacks={cbs}
                                value={this.state.data["city"]}
                            />

                        </div>
                    </Panel>
                </PopUp> : null}
                {this.state.mode === "read" ? <PopUp
                    ref={"ReadPopUp"}
                    show={true}
                    style={{
                        'minWidth': '30%',
                        'minHeight': '35%'
                    }}
                    id={"ReadPopUp"}
                    hideSave={true}
                    onClose={this.popUpClose}
                >
                    <Panel
                        key={"sample4"}
                        title={"Read"}
                        width={100}
                    >
                        <div className="cf-fset">
                            <Field
                                key={"EmployeeID"}
                                ref={"EmployeeID"}
                                model={{
                                    "id": "EmployeeID",
                                    "label": "Employee ID",
                                    "maxLength": 5,
                                    "inMany": true,
                                    "width": 50,
                                    "type": "text",
                                    "minLength": 2,
                                    "toUpperCase": true
                                }}
                                callbacks={cbs}
                                value={this.state.data["EmployeeID"]}
                                readOnly={true}
                            />

                            <Field
                                key={"EmployeeName"}
                                ref={"EmployeeName"}
                                model={{
                                    "id": "EmployeeName",
                                    "label": "Employee Name",
                                    "maxLength": 5,
                                    "inMany": true,
                                    "width": 50,
                                    "type": "text",
                                    "minLength": 2,
                                    "toUpperCase": true
                                }}
                                callbacks={cbs}
                                value={this.state.data["EmployeeName"]}
                                readOnly={true}
                            />

                            <Field
                                key={"Designation"}
                                ref={"Designation"}
                                model={{
                                    "id": "Designation",
                                    "label": "Designation",
                                    "maxLength": 5,
                                    "inMany": true,
                                    "width": 50,
                                    "type": "text",
                                    "minLength": 2,
                                    "toUpperCase": true
                                }}
                                callbacks={cbs}
                                value={this.state.data["Designation"]}
                                readOnly={true}
                            />

                            <Field
                                key={"Gender"}
                                ref={"Gender"}
                                model={{
                                    "id": "Gender",
                                    "label": "Gender",
                                    "maxLength": 5,
                                    "inMany": true,
                                    "width": 50,
                                    "type": "text",
                                    "minLength": 2,
                                    "toUpperCase": true
                                }}
                                callbacks={cbs}
                                value={this.state.data["Gender"]}
                                readOnly={true}
                            />

                            <Field
                                key={"Address"}
                                ref={"Address"}
                                model={{
                                    "id": "Address",
                                    "label": "Address",
                                    "maxLength": 5,
                                    "inMany": true,
                                    "width": 50,
                                    "type": "textmultiline",
                                    "minLength": 2,
                                    "toUpperCase": true
                                }}
                                callbacks={cbs}
                                value={this.state.data["Address"]}
                                readOnly={true}
                            />

                            <Field
                                key={"country"}
                                ref={"country"}
                                model={{
                                    "id": "country",
                                    "type": "autocomplete",
                                    "label": "Country",
                                    "required": false,
                                    "maxLength": 15,
                                    "inMany": false,
                                    "width": 50,
                                    "serverSide": true,
                                    "autocompleteName": "todo_country"
                                }}
                                callbacks={cbs}
                                value={{ value: this.state.data["countryKey"], label: this.state.data["countryText"] }}
                                readOnly={true}
                            />

                            <Field
                                key={"city"}
                                ref={"city"}
                                model={{
                                    "id": "city",
                                    "type": "multiselect",
                                    "label": "City",
                                    "required": true,
                                    "maxLength": 15,
                                    "inMany": false,
                                    "width": 50,
                                    "serverSide": true,
                                    "autocompleteName": "todo_city"
                                }}
                                callbacks={cbs}
                                value={this.state.data["city"]}
                                readOnly={true}
                            />
                        </div>
                    </Panel>
                </PopUp> : null}
                {this.state.mode === "delete" ? <PopUp
                    afterMount={this.afterMount}
                    ref={"DeletePopUp"}
                    show={true}
                    style={{
                        'minWidth': '30%',
                        'minHeight': '35%'
                    }}
                    id={"DeletePopUp"}
                    hideSave={true}
                    buttons={[
                        {
                            "id": "delete",
                            "label": "Delete"
                        }
                    ]}
                    onClose={this.popUpClose}
                >
                    <Panel
                        key={"sample4"}
                        title={"Delete"}
                        width={100}
                    >
                        <div className="cf-fset">
                            <Field
                                key={"EmployeeID"}
                                ref={"EmployeeID"}
                                model={{
                                    "id": "EmployeeID",
                                    "label": "Employee ID",
                                    "maxLength": 5,
                                    "inMany": true,
                                    "width": 50,
                                    "type": "text",
                                    "minLength": 2,
                                    "toUpperCase": true
                                }}
                                callbacks={{ change: this.fieldChange }}
                                value={this.state.data["EmployeeID"]}
                                readOnly={true}
                            />

                            <Field
                                key={"EmployeeName"}
                                ref={"EmployeeName"}
                                model={{
                                    "id": "EmployeeName",
                                    "label": "Employee Name",
                                    "maxLength": 5,
                                    "inMany": true,
                                    "width": 50,
                                    "type": "text",
                                    "minLength": 2,
                                    "toUpperCase": true
                                }}
                                callbacks={{ change: this.fieldChange }}
                                value={this.state.data["EmployeeName"]}
                                readOnly={true}
                            />

                            <Field
                                key={"Designation"}
                                ref={"Designation"}
                                model={{
                                    "id": "Designation",
                                    "label": "Designation",
                                    "maxLength": 5,
                                    "inMany": true,
                                    "width": 50,
                                    "type": "text",
                                    "minLength": 2,
                                    "toUpperCase": true
                                }}
                                callbacks={{ change: this.fieldChange }}
                                value={this.state.data["Designation"]}
                                readOnly={true}
                            />

                            <Field
                                key={"Gender"}
                                ref={"Gender"}
                                model={{
                                    "id": "Gender",
                                    "label": "Gender",
                                    "maxLength": 5,
                                    "inMany": true,
                                    "width": 50,
                                    "type": "text",
                                    "minLength": 2,
                                    "toUpperCase": true
                                }}
                                callbacks={{ change: this.fieldChange }}
                                value={this.state.data["Gender"]}
                                readOnly={true}
                            />

                            <Field
                                key={"Address"}
                                ref={"Address"}
                                model={{
                                    "id": "Address",
                                    "label": "Address",
                                    "maxLength": 5,
                                    "inMany": true,
                                    "width": 50,
                                    "type": "textmultiline",
                                    "minLength": 2,
                                    "toUpperCase": true
                                }}
                                callbacks={{ change: this.fieldChange }}
                                value={this.state.data["Address"]}
                                readOnly={true}
                            />

                            <Field
                                key={"country"}
                                ref={"country"}
                                model={{
                                    "id": "country",
                                    "type": "autocomplete",
                                    "label": "Country",
                                    "required": false,
                                    "maxLength": 15,
                                    "inMany": false,
                                    "width": 50,
                                    "serverSide": true,
                                    "autocompleteName": "todo_country"
                                }}
                                callbacks={cbs}
                                value={{ value: this.state.data["countryKey"], label: this.state.data["countryText"] }}
                                readOnly={true}
                            />

                            <Field
                                key={"city"}
                                ref={"city"}
                                model={{
                                    "id": "city",
                                    "type": "multiselect",
                                    "label": "City",
                                    "required": true,
                                    "maxLength": 15,
                                    "inMany": false,
                                    "width": 50,
                                    "serverSide": true,
                                    "autocompleteName": "todo_city"
                                }}
                                callbacks={cbs}
                                value={this.state.data["city"]}
                                readOnly={true}
                            />
                        </div>
                    </Panel>
                </PopUp> : null}
                {this.state.mode === "edit" ? <PopUp
                    ref={"EditPopUp"}
                    show={true}
                    style={{
                        'maxWidth': '30%',
                        'minHeight': '35%'
                    }}
                    id={"EditPopUp"}
                    onClickSave={this.updateData}
                    onClose={this.popUpClose}
                >
                    <Panel
                        key={"sample4"}
                        title={"Edit"}
                        width={100}
                    >
                        <div className="cf-fset">
                            <Field
                                key={"EmployeeID"}
                                ref={"EmployeeID"}
                                model={{
                                    "id": "EmployeeID",
                                    "label": "Employee ID",
                                    "maxLength": 5,
                                    "inMany": true,
                                    "width": 50,
                                    "type": "text",
                                    "minLength": 2,
                                    "toUpperCase": true
                                }}
                                callbacks={cbs}
                                value={this.state.data["EmployeeID"]}
                            />

                            <Field
                                key={"EmployeeName"}
                                ref={"EmployeeName"}
                                model={{
                                    "id": "EmployeeName",
                                    "label": "Employee Name",
                                    "maxLength": 5,
                                    "inMany": true,
                                    "width": 50,
                                    "type": "text",
                                    "minLength": 2,
                                    "toUpperCase": true
                                }}
                                callbacks={cbs}
                                value={this.state.data["EmployeeName"]}
                            />

                            <Field
                                key={"Designation"}
                                ref={"Designation"}
                                model={{
                                    "id": "Designation",
                                    "label": "Designation",
                                    "maxLength": 5,
                                    "inMany": true,
                                    "width": 50,
                                    "type": "text",
                                    "minLength": 2,
                                    "toUpperCase": true
                                }}
                                callbacks={cbs}
                                value={this.state.data["Designation"]}
                            />

                            <Field
                                key={"Gender"}
                                ref={"Gender"}
                                model={{
                                    "id": "Gender",
                                    "label": "Gender",
                                    "maxLength": 5,
                                    "inMany": true,
                                    "width": 50,
                                    "type": "text",
                                    "minLength": 2,
                                    "toUpperCase": true
                                }}
                                callbacks={cbs}
                                value={this.state.data["Gender"]}
                            />

                            <Field
                                key={"Address"}
                                ref={"Address"}
                                model={{
                                    "id": "Address",
                                    "label": "Address",
                                    "maxLength": 5,
                                    "inMany": true,
                                    "width": 50,
                                    "type": "textmultiline",
                                    "minLength": 2,
                                    "toUpperCase": true
                                }}
                                callbacks={cbs}
                                value={this.state.data["Address"]}
                            />

                            <Field
                                key={"country"}
                                ref={"country"}
                                model={{
                                    "id": "country",
                                    "type": "autocomplete",
                                    "label": "Country",
                                    "required": false,
                                    "maxLength": 15,
                                    "inMany": false,
                                    "width": 50,
                                    "serverSide": true,
                                    "autocompleteName": "todo_country"
                                }}
                                callbacks={cbs}
                                value={{ value: this.state.data["countryKey"], label: this.state.data["countryText"] }}
                            />

                            <Field
                                key={"city"}
                                ref={"city"}
                                model={{
                                    "id": "city",
                                    "type": "multiselect",
                                    "label": "City",
                                    "required": true,
                                    "maxLength": 15,
                                    "inMany": false,
                                    "width": 50,
                                    "serverSide": true,
                                    "autocompleteName": "todo_city"
                                }}
                                callbacks={cbs}
                                value={this.state.data["city"]}
                            />
                        </div>
                    </Panel>
                </PopUp> : null}
            </div>
        )
    }

    openNew = (e) => {
        this.setData();
        this.setId(-1);
        this.setState({ mode: "new" });
    }

    openEdit = (e, id) => {
        this.getRecord(id).then(() => {
            this.setState({ mode: "edit" });
        });
    }

    openDelete = (e, id) => {
        this.setState({ mode: "delete" });
        this.getRecord(id);
    }

    openRead = (e, id) => {
        this.setState({ mode: "read" });
        this.getRecord(id);
    }

    popUpClose = (props) => {
        this.setState({ mode: "" });
    }

    saveData = (e, id) => {
        const url = apiPath + 'Sample4/SaveRecord';
        axios['post'](url, this.state.data)
            .then(response => {
                toast.success(response.data.StatusMessage);
                this.refs["NewPopUp"].closePopUp();
                this.refs["list"].getData();
            })
            .catch(error => {
                toast.error(error.response.data.title);
            });
    }

    updateData = (e, id) => {
        let data = this.delta
        const url = apiPath + 'Sample4/UpdateRecord/' + this.state.id;
        if (data && Object.keys(data).length) {
            axios['post'](url, data)
                .then(response => {
                    toast.success(response.data.StatusMessage)
                    this.refs["EditPopUp"].closePopUp();
                    this.delta = {};
                    this.refs["list"].getData();
                })
                .catch(error => {
                    toast.error(error.response.data.title)
                    console.log(error);
                });
        } else {
            toast.info(i18n.i18n_msg.noUpdate)
        }
    }

    getRecord = async (id) => {
        const qUrl = apiPath + 'Sample4/GetRecord/' + id
        await axios.get(qUrl)
            .then((response) => {
                if (response.data !== null && response.data !== '') {
                    this.setState({ data: response.data });
                    this.setId(response.data.id);
                }
            })
            .catch(error => {
                toast.error(error.response.data.title);
            })
    }

    deleteData = (e, id) => {
        let url = apiPath + 'Sample4/DeleteRecord/' + this.state.id;
        axios['get'](url)
            .then(response => {
                toast.success(response.data.StatusMessage)
                this.refs["DeletePopUp"].closePopUp();
                this.refs["list"].getData();
            })
            .catch(error => {
                toast.error('Server error occured.')
                console.log(error);
            });
    }

    setData = () => {
        this.setState({
            data: {
                EmployeeID: "",
                EmployeeName: "",
                Designation: "",
                Gender: "",
                Address: ""
            }
        });
    }

    setId = (id) => {
        this.setState({
            id: id
        })
    }
}
