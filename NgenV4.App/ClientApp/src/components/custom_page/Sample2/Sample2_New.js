import React, { Component } from 'react'
import Header from '../../shell/Header'
import Panel from '../../widgets/Panel';
import Field from '../../field/Field';
import { Link } from 'react-router-dom'
import { i18n } from '../../../i18n/i18n'
import gridModel from './Sample_Model'
import Edit from '../../views/one/Edit';
import { apiPath } from '../../../config.js'
import axios from 'axios'
import { toast } from 'react-toastify';
import { capitalize } from '../../../utils/format'
import List from '../../views/many/List';
import PopUp from '../../field/PopUp';
import { dataTitle, getLabel } from '../../../utils/dico'

const e = 'sample2';
const title = 'New employee';

export default class Sample2_New extends Edit {

    constructor(props) {
        super(props);
        this.state = {
            data: {
                EmployeeID: '',
                EmployeeName: '',
                Designation: '',
                Gender: '',
                Address: '',
                Title: '',
                FirstName: '',
                LastName: ''
            },
            popUpData: {
                EmployeeID: '',
                EmployeeName: '',
                Designation: '',
                Gender: '',
                Address: ''
            },
            isCustomPage: true
        }
    }

    componentDidMount() {
        const id = this.props.match.url.split('/')[this.props.match.url.split('/').length - 1];
        if (id !== "0") {
            //Case of edit, fetch the data and set it in state
            let newState = {}
            const qUrl = apiPath + gridModel.id + '/GetRecord/' + id
            axios.get(qUrl)
                .then((response) => {
                    if (response.data !== null && response.data !== '') {
                        newState.data = response.data
                    } else {
                        newState.info = i18n.i18n_errors.badId.replace('{0}', id)
                    }
                    this.lastQuery = null
                    this.setState(newState)
                })
                .catch(err => {
                    newState.error = {
                        message: err.message || i18n.i18n_errors.badId.replace('{0}', id)
                    }
                    this.setState(newState)
                })
            this.setState({
                dataFetched: true
            })
        }
    }

    clickSave = (evt) => {
        const fields = gridModel.fields,
            v = this.validate(fields, this.state.data)
        if (v.valid) {
            const id = parseInt(this.props.match.params.id || '', 10);
            let data;
            const isNew = id ? false : true;
            const url = apiPath + e + '/' + (id ? 'UpdateRecord/' + id : 'SaveRecord');

            if (isNew) {
                data = this.state.data
            } else {
                data = this.delta
            }

            if (data && Object.keys(data).length) {
                axios['post'](url, data)
                    .then(response => {

                        toast.success(response.data.StatusMessage)
                        this.props.history.push('/' + e + '/list/')
                    })
                    .catch(error => {
                        try {
                            toast.error(error.response.data.title)
                            console.log(error);
                        } catch (e) {
                            toast.error(i18n.i18n_errors.serverError)
                        }
                    });
            } else {
                toast.info(i18n.i18n_msg.noUpdate)
            }
        } else {
            this.setState({
                invalid: !v.valid
            })
        }
    }

    render() {

        //Assigining the generic callback functions for validations
        const cbs = {
            change: this.fieldChange,
            dropFile: this.uploadFileOne,
            fieldKeyPress: this.fieldKeyPress,
            fieldOnBlur: this.fieldOnBlur,
            dependentAutoCompletes: this.dependentAutoCompletes
        }

        const cbsPopUp = {
            change: this.fieldChange,
            dropFile: this.uploadFileOne,
            fieldKeyPress: this.fieldKeyPress,
            fieldOnBlur: this.fieldOnBlur,
            dependentAutoCompletes: this.dependentAutoCompletes,
            stateVariable: 'popUpData'
        }

        //To provide the model for validation
        this.model = gridModel

        const data = this.state.data;
        const popUpData = this.state.popUpData;
        const { id = 0, view = 'browse' } = this.props.match.params,
            entity = this.props.match.url.split('/')[1],
            isNew = id === 0 || id === '0',
            ep = '/' + entity + '/',
            linkBrowse = '/' + gridModel.id + '/list/'

        return (
            <div>
                <Header
                    entity={e}
                    title={dataTitle(gridModel, null, isNew)}
                    model={{}}
                />

                <div className="cf-one-edit">
                    <div className="cf-pnls">
                        <Panel
                            key={"booking-characteristics"}
                            title={getLabel('Sample2_Panel_1')}>

                            <div className="cf-fset">
                                <Field
                                    key={"MultiControl"}
                                    ref={"MultiControl"}
                                    model={{
                                        "id": "MultiControl",
                                        "label": "Multi Control",
                                        "width": 50,
                                        "type": "multicontrol",
                                        "fields": [
                                            {
                                                "id": "Title",
                                                "label": "Title",
                                                "maxLength": 5,
                                                "inMany": true,
                                                "type": "text",
                                                "minLength": 2,
                                                "toUpperCase": true,
                                                "multiControlWidth": 10,
                                                "value": data['Title']
                                            },
                                            {
                                                "id": "FirstName",
                                                "label": "First Name",
                                                "maxLength": 5,
                                                "inMany": true,
                                                "type": "text",
                                                "minLength": 2,
                                                "toUpperCase": true,
                                                "multiControlWidth": 30,
                                                "value": data['FirstName']
                                            },
                                            {
                                                "id": "LastName",
                                                "label": "Last Name",
                                                "maxLength": 5,
                                                "inMany": true,
                                                "type": "text",
                                                "minLength": 2,
                                                "toUpperCase": true,
                                                "multiControlWidth": 30,
                                                "value": data['LastName']
                                            }
                                        ]
                                    }}
                                    callbacks={cbs}
                                    entity={e}
                                    value={data["Title"]}
                                />

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
                                    entity={e}
                                    value={data["EmployeeID"]}
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
                                    entity={e}
                                    value={data["EmployeeName"]}
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
                                    entity={e}
                                    value={data["Designation"]}
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
                                    entity={e}
                                    value={data["Gender"]}
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
                                    entity={e}
                                    value={data["Address"]}
                                />

                                <Field
                                    key={"Address"}
                                    ref={"Address"}
                                    model={{
                                        "id": "z1",
                                        "label": "Address",
                                        "maxLength": 5,
                                        "inMany": true,
                                        "width": 1,
                                        "type": "text",
                                        "minLength": 2,
                                        "toUpperCase": true
                                    }}
                                    callbacks={cbs}
                                    entity={e}
                                    value={data["Address"]}
                                />
                                <Field
                                    key={"Address"}
                                    ref={"Address"}
                                    model={{
                                        "id": "z2",
                                        "label": "Address",
                                        "maxLength": 1,
                                        "inMany": true,
                                        "width": 5,
                                        "type": "text",
                                        "minLength": 2,
                                        "toUpperCase": true
                                    }}
                                    callbacks={cbs}
                                    entity={e}
                                    value={data["Address"]}
                                />
                                <Field
                                    key={"Address"}
                                    ref={"Address"}
                                    model={{
                                        "id": "z3",
                                        "label": "Address",
                                        "maxLength": 5,
                                        "inMany": true,
                                        "width": 10,
                                        "type": "text",
                                        "minLength": 2,
                                        "toUpperCase": true,
                                        "controlWidth": 50
                                    }}
                                    callbacks={cbs}
                                    entity={e}
                                    value={data["Address"]}
                                />

                                <Field
                                    key={"Address"}
                                    ref={"Address"}
                                    model={{
                                        "id": "Address",
                                        "label": "Address",
                                        "maxLength": 5,
                                        "inMany": true,
                                        "width": 28,
                                        "type": "text",
                                        "minLength": 2,
                                        "toUpperCase": true
                                    }}
                                    callbacks={cbs}
                                    entity={e}
                                    value={data["Address"]}
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
                                        "type": "text",
                                        "minLength": 2,
                                        "toUpperCase": true
                                    }}
                                    callbacks={cbs}
                                    entity={e}
                                    value={data["Address"]}
                                />
                            </div>

                        </Panel>

                        <Panel key="formButtons">
                            <div className="cf-buttons">
                                <Link className="btn btn-default" to={linkBrowse}><i className="glyphicon glyphicon-remove"></i> {i18n.i18n_actions.cancel}</Link>
                                <button className="btn btn-primary" onClick={this.clickSave}><i className="glyphicon glyphicon-ok"></i> {i18n.i18n_actions.save}</button>
                            </div>
                        </Panel>
                    </div>
                </div>

                {
                    isNew ? (
                        null
                    ) : (
                            <div>
                                <List
                                    ref={'list'}
                                    cardinality={'custom'}
                                    customButtons={['new']}
                                    isCustomPage={true}
                                    gridModel={gridModel}
                                    onClickRead={this.showReadPopUp}
                                    onClickNew={this.showPopUp}
                                    onClickEdit={this.showPopUp}
                                    onClickDelete={this.showDeletePopUp}
                                >

                                </List>
                                {/* Pop up for new and edit */}
                                <PopUp
                                    ref={"NewPopUp"}
                                    show={false}
                                    style={{
                                        'minWidth': '30%',
                                        'minHeight': '35%'
                                    }}
                                    id={"NewPopUp"}
                                    onClickSave={this.savePopUpData}>
                                    <Panel
                                        key={"sample2"}
                                        title={"Add"}
                                        width={100}>
                                        <div className="cf-fset">
                                            <Field
                                                stateVariable={"popUpData"}
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
                                                callbacks={cbsPopUp}
                                                value={popUpData["EmployeeID"]}
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
                                                callbacks={cbsPopUp}
                                                value={popUpData["EmployeeName"]}
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
                                                callbacks={cbsPopUp}
                                                value={popUpData["Designation"]}
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
                                                callbacks={cbsPopUp}
                                                value={popUpData["Gender"]}
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
                                                callbacks={cbsPopUp}
                                                value={popUpData["Address"]}
                                            />
                                        </div>
                                    </Panel>
                                </PopUp>

                                {/* Pop up for delete */}
                                <PopUp
                                    ref={"DeletePopUp"}
                                    show={false}
                                    style={{
                                        'minWidth': '30%',
                                        'minHeight': '35%'
                                    }}
                                    id={"DeletePopUp"}
                                    hideSave={true}
                                    buttons={[
                                        {
                                            "id": "delete",
                                            "onClick": "deleteData",
                                            "label": "Delete"
                                        }
                                    ]}
                                    deleteData={this.deleteData}
                                >
                                    <Panel
                                        key={"sample2"}
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
                                                callbacks={cbs}
                                                value={popUpData["EmployeeID"]}
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
                                                value={popUpData["EmployeeName"]}
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
                                                value={popUpData["Designation"]}
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
                                                value={popUpData["Gender"]}
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
                                                value={popUpData["Address"]}
                                                readOnly={true}
                                            />
                                        </div>
                                    </Panel>
                                </PopUp>

                                {/* Pop up for read */}
                                <PopUp
                                    ref={"ReadPopUp"}
                                    show={false}
                                    style={{
                                        'minWidth': '30%',
                                        'minHeight': '35%'
                                    }}
                                    id={"ReadPopUp"}
                                    hideSave={true}
                                >
                                    <Panel
                                        key={"sample2"}
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
                                                callbacks={cbs}
                                                value={popUpData["EmployeeID"]}
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
                                                value={popUpData["EmployeeName"]}
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
                                                value={popUpData["Designation"]}
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
                                                value={popUpData["Gender"]}
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
                                                value={popUpData["Address"]}
                                                readOnly={true}
                                            />
                                        </div>
                                    </Panel>
                                </PopUp>
                            </div>

                        )
                }
            </div>
        )
    }

    savePopUpData = () => {
        const fields = gridModel.fields,
            v = this.validate(fields, this.state.data)
        if (v.valid) {
            const id = parseInt(this.props.match.params.id || '', 10);
            let data;
            const isNew = id ? false : true;
            const url = apiPath + e + '/' + (id ? 'UpdateRecord/' + id : 'SaveRecord');

            if (isNew) {
                data = this.state.data
            } else {
                data = this.delta
            }

            if (data && Object.keys(data).length) {
                axios['post'](url, data)
                    .then(response => {

                        toast.success(response.data.StatusMessage)
                        this.props.history.push('/' + e + '/list/')
                    })
                    .catch(error => {
                        try {
                            toast.error(error.response.data.title)
                            console.log(error);
                        } catch (e) {
                            toast.error(i18n.i18n_errors.serverError)
                        }
                    });
            } else {
                toast.info(i18n.i18n_msg.noUpdate)
            }
        } else {
            this.setState({
                invalid: !v.valid
            })
        }
    }

    showPopUp = (evt, id) => {
        //Case of edit
        if (id) {
            //Get Data from DB
            this.getPopUpData(id);
        } else {
            //Clear the data of pop up from state
            this.setState({
                popUpData: {
                    EmployeeID: '',
                    EmployeeName: '',
                    Designation: '',
                    Gender: '',
                    Address: ''
                }
            })
        }
        this.refs[`NewPopUp`].openPopUp()
    }

    showDeletePopUp = (evt, id) => {
        this.getPopUpData(id);
        this.refs[`DeletePopUp`].openPopUp()
    }

    showReadPopUp = (evt, id) => {
        this.getPopUpData(id);
        this.refs[`ReadPopUp`].openPopUp()
    }

    deleteData = () => {
        this.getPopUpData(this.state.id);
    }

    setId = (id) => {
        this.setState({
            id: id
        })
    }

    getPopUpData = (id) => {
        const qUrl = apiPath + 'sample2/GetRecord/' + id
        axios.get(qUrl)
            .then((response) => {
                if (response.data !== null && response.data !== '') {
                    this.setState({ popUpData: response.data });
                    this.setId(response.data.id);
                }
            })
            .catch(error => {
                toast.error(error.response.data.title);
            })
    }
}
