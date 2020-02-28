import React, { Component } from 'react'
import { apiPath } from '../../../config.js'
import gridModel from './Sample_Model'
import axios from 'axios'
import Header from '../../shell/Header'
import Panel from '../../widgets/Panel';
import Field from '../../field/Field';
import { Link } from 'react-router-dom'
import { i18n } from '../../../i18n/i18n'

const e = 'sample2';
const title = 'Employee';

export default class Sample2_Read extends Component {

    constructor(props) {
        super(props)
        this.state = {
            dataFetched: false,
            customButtons: []
        }
    }

    componentDidMount() {
        //Getting the data from server side

        let newState = {}
        const id = this.props.match.url.split('/')[this.props.match.url.split('/').length - 1];
        const qUrl = apiPath + gridModel.id + '/GetRecord/' + id
        const formAction = this.props.match.url.split('/')[this.props.match.url.split('/').length - 2];
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

        if (formAction.toUpperCase() == 'DELETE') {
            this.setState({
                customButtons: ['delete']
            })
        } else {
            this.setState({
                customButtons: ['edit']
            })
        }
    }

    render() {
        console.log(this.state)
        const dataFetched = this.state.dataFetched;
        const data = this.state.data ? this.state.data : undefined
        const linkBrowse = '/' + gridModel.id + '/list/'
        return (
            <div>
                {
                    (dataFetched && data) ? (
                        <div>
                            <Header
                                entity={e}
                                title={data["EmployeeName"]}
                                model={{}}
                                cardinality={'custom'}
                                customButtons={this.state.customButtons}
                                id={data['id']}
                                isCustomPage={true}
                                history={this.props.history}
                            />

                            <div className="cf-one-edit">
                                <div className="cf-pnls">
                                    <Panel
                                        key={"booking-characteristics"}
                                        title={"Sample 2"}>

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
                                                readOnly={true}
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
                                                readOnly={true}
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
                                                readOnly={true}
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
                                                readOnly={true}
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
                                                readOnly={true}
                                                entity={e}
                                                value={data["Address"]}
                                            />
                                        </div>

                                    </Panel>

                                    <Panel key="formButtons">
                                        <div className="cf-buttons">
                                            <Link className="btn btn-default" to={linkBrowse}><i className="glyphicon glyphicon-remove"></i> {i18n.i18n_actions.cancel}</Link>
                                        </div>
                                    </Panel>
                                </div>
                            </div>

                        </div>
                    ) : (
                            <div>
                                Read Page Here
                            </div>
                        )
                }
            </div>
        )
    }
}
