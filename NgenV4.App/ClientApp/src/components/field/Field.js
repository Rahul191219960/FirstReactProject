import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Input from './Input'
import { fieldTypes as ft, getLabel } from '../../utils/dico'
import { fieldValue, image, doc } from '../../utils/format'
import { i18n } from '../../i18n/i18n'
import { dateFormat, dateTimeFormat, filesUrl } from '../../config.js'
import { DateInput } from '@opuscapita/react-dates'
import FieldLabel from './FieldLabel'
// import TimePicker from './TimePicker'

// - components for some field types:
// - date
import Datepicker from 'react-datepicker'
// import TimePicker from'react-timepicker'
// - image & documents
import Dropzone from 'react-dropzone'
// - list
import MultiSelect from "@khanacademy/react-multi-select";

import CheckBox from "./CheckBox.js";

import './Field.scss'
import CheckBoxList from './CheckBoxList';
import RadioButtonList from './RadioButtonList';
import Phone from './Phone';
// import AutoComplete from './AutoComplete';
import AutoComplete from './ReactAutoComplete';


function isObject(obj) {
	return (typeof obj === "object" && obj !== null)// || typeof obj === "function";
}

function emHeight(f) {
	let fh = parseInt(f.height || 2, 10);
	if (fh < 2) {
		fh = 2;
	}
	return Math.trunc(fh * 1.6);
}

function createMarkup(d) {
	// TODO: good enough?
	return { __html: d ? d.replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\n/g, '<br/>') : '' }
}

function createOption(id, text) {
	return <option key={id} value={'' + id}>{text}</option>
}

function itemInList(id, list) {
	const tag = list.find(item => item.id === id)
	if (tag) {
		return tag.text
	}
	return 'N/A'
}

export default class Field extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			help: false,
			invalid: false,
			value: this.props.value
		}
	}

	_fieldElem(f, d, cbs) {
		// - return the widget needed for the specific field type
		const usualProps = {
			id: f.id,
			key: f.id,
			onChange: cbs.change,
		}

		let controlWidth;
		if (this.props.model.controlWidth) {
			if (this.props.model.controlWidth.toLowerCase().includes("px") || this.props.model.controlWidth.toLowerCase().includes("%")) {
				controlWidth = this.props.model.controlWidth;
			} else {
				controlWidth = this.props.model.controlWidth + "%";
			}
		} else {
			controlWidth = '100%'
		}

		//Added by Shubham
		if (f.type === ft.textml) {
			return <textarea {...usualProps}
				rows={f.height || 4}
				className="form-control"
				value={d ? d : ''}
				autoComplete={`off`}
				style={{ width: controlWidth }} />
		} else if (f.type === ft.json) {
			return <textarea {...usualProps}
				rows={f.height || 4}
				className="form-control"
				value={isObject(d) ? JSON.stringify(d, null, 2) : (d || '')}
				autoComplete={`off`}
			/>
		} else if (f.type === ft.lov) {
			let opts = f.list ? f.list.map(item => createOption(item.id, item.text))
				: [createOption(f.id + "loading", i18n.i18n_msg.loading)]
			return <select {...usualProps}
				className="form-control"
				value={d || ''}
				style={{ width: controlWidth }}>
				<option />
				{opts}
			</select>
		} else if (f.type === ft.list) {
			let opts = f.list ? f.list.map(item => ({
				value: item.id,
				label: item.text
			})) : null
			return <MultiSelect
				options={opts}
				selected={d || []}
				onSelectedChanged={this.getMultiselectFieldChange(f)}
			/>
		} else if (f.type === ft.checkbox) {
			return (<CheckBox {...f} onChange={cbs.change} />)
		} else if (f.type === ft.checkboxlist) {
			return (<CheckBoxList {...f} onChange={(v) => this.getCheckBoxListFieldChange(v)} />)
		} else if (f.type === ft.radiobuttonlist) {
			return (
				<RadioButtonList
					defaultValue={d ? d : f.defaultValue}
					id={f.id}
					name={f.name}
					ref={f.id}
					radioList={f.radioList}
					onChange={(v) => this.getRadioButtonListFieldChange(v)}
				/>
			)
		} else if (f.type === ft.phone) {
			return (
				<Phone {...f} {...this.props} {...cbs} onChange={(v) => this.getPhoneValueObject(v)}></Phone>
			)
		} else if (f.type === ft.autocomplete) {
			return (
				<AutoComplete
					defaultValue={d ? d : null}
					ref={f.id}
					IsMulti={false}
					id={f.id}
					name={f.name}
					extraCondition={this.props.extraCondition}
					extraParameter={this.props.extraParameter}
					OnSelectedOption={this.setAutoComplete}
					defaultOptions={f.defaultOptions}
					serverSide={f.serverSide}
					model={f}
					closeMenuOnSelect={true}
				/>
			)
		} else if (f.type === ft.multiselect) {
			return (
				<AutoComplete
					ref={f.id}
					IsMulti={true}
					id={f.id}
					name={f.name}
					extraCondition={this.props.extraCondition}
					extraParameter={this.props.extraParameter}
					OnSelectedOption={this.setAutoComplete}
					defaultOptions={f.defaultOptions}
					serverSide={f.serverSide}
					model={f}
					closeMenuOnSelect={false}
				/>
			)
		} else if (f.type === ft.date) {
			return <DateInput
				autoComplete='off'
				value={d ? new Date(d) : null}
				onChange={this.getDateFieldChange(f.id)}
				dateFormat={dateFormat}
				modifiers={{
					disabled: {
						after: new Date(f.daysForward ? new Date().setDate(new Date().getDate() + f.daysForward) : ""),
						before: new Date(f.daysBack ? new Date().setDate(new Date().getDate() - f.daysBack) : "")
					}
				}}
			/>
		} else if (f.type === ft.datetime) {
			var maxDate = new Date();
			maxDate = f.daysForward ? new Date().setDate(new Date().getDate() + f.daysForward) : new Date();
			return <React.Fragment>
				{/* <Datepicker {...usualProps}
					className="form-control inline"
					selected={d ? new Date(d) : null}
					onChange={this.getDateFieldChange(f.id)}
					dateFormat={dateTimeFormat}
					maxDate={f.daysForward ? new Date().setDate(new Date().getDate() + f.daysForward) : ""}
					minDate={f.daysBack ? new Date().setDate(new Date().getDate() - f.daysBack) : ""}
					showMonthDropdown
					showYearDropdown
					dropdownMode="scroll"
					timeIntervals={1}
					scrollableYearDropdown
					yearDropdownItemNumber={50}
					autoComplete='off'
					showTimeSelect
					timeFormat="p"
					isClearable
				/> */}

				<DateInput
					autoComplete='off'
					value={d ? new Date(d) : null}
					dateFormat={dateFormat}
					modifiers={{
						disabled: {
							after: new Date(f.daysForward ? new Date().setDate(new Date().getDate() + f.daysForward) : ""),
							before: new Date(f.daysBack ? new Date().setDate(new Date().getDate() - f.daysBack) : "")
						}
					}}
				/>

				{/* <input {...usualProps}
					key={usualProps.key + '_time'}
					type="time"
					value={d ? (d + '').substr(11, 8) : ''}
					className="form-control"
				/> */}
			</React.Fragment>
		} else if (f.type === ft.time) {
			// return<TimePicker/>
		} else if (f.type === ft.image || f.type === ft.doc) {
			let pix = null
			if (d) {
				if (f.type === ft.image && d) {
					pix = <img {...usualProps}
						className="img-thumbnail"
						src={filesUrl + d}
						alt=""
					/>
				} else {
					pix = doc(d, filesUrl)
				}
			}

			return (
				<div>
					{pix}
					{d ? (
						<div className="evol-remove" onClick={this.removeFile}>
							<span className="fakeLink">
								<i className="glyphicon glyphicon-remove" />
								{i18n.i18n_actions['remove_' + f.type]}
							</span>
						</div>
					) : null}
					<Dropzone onDrop={this.onDropFile}>
						{({ getRootProps, getInputProps, isDragActive }) => {
							return (
								<div
									{...getRootProps()}
									className={'pixdrop dropzone ' + (isDragActive ? 'dropzone--isActive' : '')}
								>
									<input {...getInputProps()} />
									{
										isDragActive ?
											<p>Drop files here...</p> :
											<p>{i18n.i18n_actions.dropFile}</p>
									}
								</div>
							)
						}}
					</Dropzone>
					<i></i>

				</div>
			)
		} else if (f.type === ft.email || f.type === ft.money) {
			const symbol = f.type === ft.email ? '@' : (f.currencySymbol ? f.currencySymbol : '$')
			return <div className="input-group">
				<span className="input-group-addon icon-bold">{symbol}</span>
				<Input {...f} {...this.props}{...cbs} />
			</div>
		} else if (f.type === ft.label) {
			return <span>{f.value}</span>
		} else {
			return <Input style={{ width: controlWidth }} {...f} {...this.props}{...cbs} />
		}
	}

	_fieldElemReadOnly(f, d, d_id) {
		// - return the formatted field value
		let fw

		if (f.type === ft.textml) {
			const height = emHeight(f) + 'em'
			return <div key={f.id} className="disabled evo-rdonly scroll-y" style={{ height: height }}
				dangerouslySetInnerHTML={createMarkup(d)}
			/>
		} else if (f.type === ft.image && d) {
			fw = image(filesUrl + d)
		} else if (f.type === ft.doc) {
			fw = doc(d, filesUrl)
			//{f.country_icon && d.country_icon ? <img src={d.country_icon}/> : null}
		} else if (f.type === ft.lov) {
			if (f.object) {
				fw = <Link to={'/' + f.object + '/browse/' + d_id}>
					{fieldValue(f, d)}
				</Link>
			} else {
				if (f.lovIcon && this.props.icon) {
					fw = <span>
						<img src={'/pix/' + this.props.icon} className="lov-icon" alt="" />
						{fieldValue(f, d)}
					</span>
				}
				//----------added by rahul on 14-02-2020--------------------
				/*
					to bind the value of lov at the time of read and delete
				*/
				else if (f.list.length > 0 && this.props.valueId) {
					fw = f.list.find(x => x.id == this.props.valueId)
					fw = fw.text
				}
				//-----------------------------------------------------------

				else {
					fw = fieldValue(f, d)
				}
			}
		} else if (f.type === ft.list) {
			if (f.list) {
				fw = <div key={f.id + '_list'} className="list-tags">
					{(d || []).map(itemid => <div key={itemid}>{itemInList(itemid, f.list)}</div>)}
				</div>
			} else {
				fw = fieldValue(f, d)
			}
		} else if (f.type === ft.json) {
			fw = <pre>{isObject(d) ? JSON.stringify(d, null, 2) : (d || '')}</pre>
		} else if (f.type === ft.checkbox) {
			fw = d ? 'YES' : 'NO'
		}
		else {
			fw = fieldValue(f, d)
		}
		return (
			<div key={f.id} className="disabled evo-rdonly">
				{fw}
			</div>
		)
	}

	clickHelp = () => {
		this.setState({
			help: !this.state.help
		})
	}

	render() {

		const f = this.props.model || { type: 'text' },
			readOnly = this.props.readOnly || f.readOnly,
			cbs = this.props.callbacks || {},
			{ value, valueId } = this.props,
			invalid = this.state.invalid,
			hideLabel = f.hideLabel || false,
			label = getLabel(f.id)
		// label = this.props.label || f.label
		let cbs_state = Object.create(cbs);
		if (cbs) {
			cbs_state.change = (e) => cbs.change(e, f, cbs.stateVariable)
			cbs_state.fieldKeyPress = (e) => cbs.fieldKeyPress(e, f, cbs.stateVariable)
			cbs_state.fieldOnBlur = (e) => cbs.fieldOnBlur(e, f, cbs.stateVariable)
		}

		return (
			<div className={'cf-fld' + (invalid ? ' has-error' : '')} style={{ width: (f.width || 100) + '%' }}>

				<FieldLabel
					hideLabel={hideLabel}
					label={label}
					field={f}
					readOnly={readOnly}
					clickHelp={this.clickHelp} />

				{f.help && this.state.help ? <div className="evo-fld-help">{f.help}</div> : null}

				{readOnly ?
					this._fieldElemReadOnly(f, value, valueId)
					:
					this._fieldElem(f, value, cbs_state)
				}

				{invalid ? <div className="evo-fld-invalid">{this.state.message}</div> : null}

			</div>
		)
	}

	getDateFieldChange(fid) {
		// - for fields of type date (using react-datepicker)
		return v => {
			this.props.callbacks.change({
				target: {
					id: fid,
					value: v
				}
			})
		}
	}

	getMultiselectFieldChange = () => {
		// - for fields of type list (using react-multi-select)
		return v => {
			const f = this.props.model
			this.props.callbacks.change({
				target: {
					id: f.id,
					value: v
				}
			})
		}
	}

	//Adde By Shubham
	getCheckBoxListFieldChange = (value) => {
		const f = this.props.model
		this.props.callbacks.change({
			target: {
				id: f.id,
				value: value
			}
		}, f)
	}
	getRadioButtonListFieldChange = (value) => {
		const f = this.props.model
		this.props.callbacks.change({
			target: {
				id: f.id,
				value: value
			}
		}, f)
	}
	getPhoneValueObject = (value) => {
		const f = this.props.model
		this.props.callbacks.change({
			target: {
				id: f.id,
				type: f.type,
				value: value,
			}
		}, f)
	}
	setAutoComplete = (value) => {
		const f = this.props.model
		this.props.callbacks.change({
			target: {
				id: f.id,
				type: f.type,
				value: value
			}
		}, f, this.props.callbacks.stateVariable);
		if (f && f.dependents && typeof f.dependents === 'object') {
			this.props.callbacks.dependentAutoCompletes(f, value);
		}
	}
	changeState = (f, value) => {
		const m = this.props.model;
		this.refs[m.id].setDefaultOptions(f, value);
	}
	////////////////////

	onDropFile = (files) => {
		// - only for fields of type image or document
		const f = this.props.model
		if (files.length && (f.type === ft.image || f.type === ft.doc)) {
			const formData = new FormData()
			files.forEach((f, idx) => {
				formData.append('filename', files[idx])
			})
			this.props.callbacks.dropFile(f.id, formData)
		}
	}

	removeFile = () => {
		// - only for fields of type image or document
		const f = this.props.model
		if (this.props.callbacks.dropFile) {
			this.props.callbacks.dropFile(f.id, null)
		}
	}

}

Field.propTypes = {
	model: PropTypes.object.isRequired, // model is a field definition (field model)
	callbacks: PropTypes.shape({
		change: PropTypes.func,
		dropFile: PropTypes.func
	}),
	data: PropTypes.any,  // object or atomic values depending on field type
	value: PropTypes.any, // field value
	label: PropTypes.string, // override label in model
	readOnly: PropTypes.bool, // override readOnly in model
}