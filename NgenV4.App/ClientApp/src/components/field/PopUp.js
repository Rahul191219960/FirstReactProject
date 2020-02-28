import React from 'react'
import Panel from '../widgets/Panel'
import Field from '../field/Field'
import RTvalidation from '../../utils/RTvalidation'
import { i18n } from '../../i18n/i18n'
import { dataTitle, fieldId2Field, fieldTypes as ft, hById } from '../../utils/dico'
import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';
import './PopUp.scss'
import { Link } from 'react-router-dom'

export default class PopUp extends React.Component {

    static defaultProps = {
        show: false,
        type: "popup",
        data: {},
        popupModel: {},
        entity: "",
        id: "defaultID",
        onClickSave: function () { },
        fieldChange: function () { },
        afterMount: function () { },
        onClose: function () { }
    }

    componentDidMount() {
        this.props.afterMount(this.props);
    }

    constructor(props) {
        super(props);
        this.state = { show: this.props.show, data: this.props.data }
    }

    addEventListener = (event, id, func) => {
        document.getElementById(id).addEventListener(event, func);
    }

    render() {
        const entity = this.props.entity,
            m = this.props.popupModel,
            data = this.state.data,
            //this cbs is used only for dynamic fields
            cbs = {
                change: this.fieldChange,
                dropFile: this.uploadFileOne,
                fieldKeyPress: this.fieldKeyPress,
                fieldOnBlur: this.fieldOnBlur,
                dependentAutoCompletes: this.dependentAutoCompletes
            }
        const fnField = (f) => {
            if (f) {
                if (f.type === ft.lov && !f.list) {
                    // - fetch list values
                    this.getLOV(f.id)
                }
                return (
                    <Field
                        key={f.id}
                        ref={f.id}
                        model={f}
                        value={data[f.id] ? data[f.id] : ''}
                        data={data}
                        callbacks={cbs}
                        entity={entity}
                    />
                )
            }
            return null
        }
        const fnButton = (b) => {
            if (b) {
                return (
                    <button
                        className={b.className ? b.className : "btn btn-primary"}
                        ref={b.id}
                        key={b.id}
                        id={b.id}
                    >
                        <span className="glyphicon glyphicon-ok"></span> {b.label}
                    </button>
                )
            }
        }
        return (
            this.state.show ? (
                <div className="hover_bkgr_fricc" onDragOver={this.onDragOver} onDrop={this.onDrop}>
                    {/* <SimpleBar style={{ maxHeight: `500px` }} autoHide={false}> */}
                    <div draggable onDragStart={this.onDragStart} className="resize-div" id={m.id || this.props.id} style={m.style || this.props.style}>
                        <div className="popup-header">
                            <div className="popupCloseButton" onClick={this.closePopUp}>
                                <i className="fas fa-times-circle" style={{ marginTop: "5px", marginRight: "5px" }} aria-hidden="true"></i>
                            </div>
                        </div>
                        <div className="cf-pnls popup-pnl">
                            {(m && m.groups) ? (
                                m.groups.map(function (g, idx) {
                                    const groupFields = fieldId2Field(g.fields, hById(m.fields))
                                    return (
                                        g.type === "panel" ? <Panel key={g.id || ('g' + idx)}
                                            title={g.label || g.title || ''}
                                            header={g.header}
                                            footer={g.footer}
                                            width={g.width}
                                            height={g.height}
                                            style={g.style}
                                        >
                                            <div className="cf-fset">
                                                {groupFields.map(fnField)}
                                            </div>
                                        </Panel> : g.type === "gif" || g.type === "image" ? <Panel key={g.id || ('g' + idx)}
                                            title={g.label || g.title || ''}
                                            header={g.header}
                                            footer={g.footer}
                                            width={g.width}
                                            height={g.height}
                                            style={g.style}>
                                            <img className={"popup-media-image"} src={g.src} alt={g.alt} />
                                        </Panel> : g.type === "video" ? <Panel key={g.id || ('g' + idx)}
                                            title={g.label || g.title || ''}
                                            header={g.header}
                                            footer={g.footer}
                                            width={g.width}
                                            height={g.height}
                                            style={g.style}>
                                            <video className={"popup-media-image"} controls>
                                                <source src={g.src} />
                                            </video>
                                        </Panel> : null
                                    )
                                })
                            ) : (m && m.fields) ? (
                                <Panel title={"noGroups"} key="pAllFields">
                                    <div className="cf-fset">
                                        {m.fields.map(fnField)}
                                    </div>
                                </Panel>
                            ) : this.props.children}
                        </div>
                        <Panel key="formButtons" className={'popup-pnl-button'}>
                            <div className="cf-buttons">
                                {this.props.hideCancel ? (null) :
                                    <button className="btn btn-default" onClick={this.closePopUp}><i className="glyphicon glyphicon-remove"></i> {i18n.i18n_actions.cancel}</button>
                                }
                                {this.props.hideSave ? (null) :
                                    <button className="btn btn-primary popup-button" onClick={this.clickSave}>
                                        <i className="glyphicon glyphicon-ok"></i> {i18n.i18n_actions.save}
                                    </button>
                                }
                                {this.props.buttons ? this.props.buttons.map(fnButton) : null}
                                {this.state.error ? i18n.i18n_validation.incomplete : null}
                            </div>
                        </Panel>
                    </div>
                    {/* </SimpleBar> */}
                </div>
            ) : (
                    <div></div>
                )
        )
    }
    closePopUp = () => {
        this.setState({
            show: false
        });
        this.props.onClose(this.props);
    }
    openPopUp = () => {
        this.setState({
            show: true
        });
    }
    onDragStart = (event) => {
        var style = window.getComputedStyle(event.target, null);
        var targetH = parseInt(style.getPropertyValue("left"), 10) - event.clientX;
        var targetW = parseInt(style.getPropertyValue("top"), 10) - event.clientY;
        event.dataTransfer.setData("text/plain",
            (targetH) + ',' + (targetW));
    }
    onDragOver = (event) => {
        event.preventDefault();
    }
    onDrop = (event) => {
        var offset = event.dataTransfer.getData("text/plain").split(',');
        var dm = document.getElementById(this.props.popupModel.id || this.props.id);
        dm.style.left = (event.clientX + parseInt(offset[0], 10)) + 'px';
        dm.style.top = (event.clientY + parseInt(offset[1], 10)) + 'px';
        event.preventDefault();
    }

    clickSave = (e) => {
        const m = this.props.popupModel;
        this.props.onClickSave(e, m.id || this.props.id, this.state.data);
    }

    setData = (value, id) => {
        const newData = JSON.parse(JSON.stringify(this.state.data || {})),
            m = this.props.popupModel
        newData[id] = value;
        this.setState({
            data: newData
        });
    }
    //////////////////////////these callbacks are only for dynamic popup//////////////////////////////////////

    fieldChange = (evt, model) => {
        if (model.id === evt.target.id) {
            const fid = model.id,
                newData = JSON.parse(JSON.stringify(this.state.data || {})),
                toUpperCase = model.toUpperCase ? model.toUpperCase : false
            let v = evt.target.value
            if (model.type === 'checkbox') {
                v = evt.target.checked;
            }
            //Added by shubham on 17-01-2020
            else if (model.type === ft.phone) {
                v = RTvalidation.addDashes(v);
            }
            //-----------------------------------Added By Rahul on 14-01-2020---------------------------------------------
            if (toUpperCase.toString().toLowerCase() === "true") {
                v = RTvalidation.convertToUppercase(v);
            }
            //------------------------------------------------------------------------------------------------------------
            newData[fid] = v
            this.setState({
                data: newData
            })
        }
    }

    fieldKeyPress = (evt, model) => {
        let cMsg,
            field = evt.target.id,
            value = evt.key;
        if (model) {
            if (model.id === field) {
                cMsg = RTvalidation.validateField(model, value, evt.target.value);
                if (cMsg) {
                    if (this.refs[model.id]) {
                        evt.preventDefault();
                        this.refs[model.id].setState({
                            invalid: true,
                            message: cMsg
                        })
                    } else {
                        console.error('Field ref for "' + model.id + '" not found. The field doesn\'t not belong to any group in the model.')
                    }
                }
                else if (this.refs[model.id] && this.refs[model.id].state.invalid) {
                    this.refs[model.id].setState({
                        invalid: false,
                        message: null
                    })
                }
            }
        }
    }

    fieldOnBlur = (evt, model) => {
        const f = evt.target.id,
            newData = JSON.parse(JSON.stringify(this.state.data || {}))
        let v = evt.target.value
        if (v) {
            if (model) {
                if (model.id === f) {
                    if (model.type.toLowerCase() === "numeric" || model.type.toString().toLowerCase() === "decimal") {
                        v = parseFloat(v) ? parseFloat(v).toString() : v;
                        newData[model.id] = v
                        this.setState({ data: newData })
                    }
                    let cMsg = RTvalidation.validateOnBlur(model, v);
                    if (cMsg) {
                        if (this.refs[model.id]) {
                            evt.preventDefault();
                            this.refs[model.id].setState({
                                invalid: true,
                                message: cMsg
                            })
                        } else {
                            console.error('Field ref for "' + model.id + '" not found. The field doesn\'t not belong to any group in the model.')
                        }
                    }
                    else if (this.refs[model.id] && this.refs[model.id].state.invalid) {
                        this.refs[model.id].setState({
                            invalid: false,
                            message: null
                        })

                    }
                }
            }
        }
    }

    dependentAutoCompletes = (model, value) => {
        Object.keys(model.dependents).forEach((key, index) => {
            if (this.refs[key])
                this.refs[key].changeState(model.dependents[key], value);
        });
    }

    setDeltaField(fid, value) {
        if (!this.delta) {
            this.delta = {}
        }
        this.delta[fid] = value
        this._dirty = true
    }

    /////////////////////////////////////////////////////////////////////////////////////////////////////
}