import React from 'react'
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify';
// import { i18n_actions, i18n_validation, i18n_errors } from '../../../i18n/i18n'
import { i18n } from '../../../i18n/i18n'
import { i18nApp } from '../../../i18n/i18nApp'
import { dataTitle, fieldId2Field, fieldTypes as ft } from '../../../utils/dico'
import validation from '../../../utils/validation'
import RTvalidation from '../../../utils/RTvalidation'
import OneReadWrite from './one-readwrite'
import List from '../many/List'
import Alert from '../../widgets/Alert'
import Field from '../../field/Field'
import Panel from '../../widgets/Panel'
import Header from '../../shell/Header'
import PopUp from '../../field/PopUp';
import Spinner from '../../shell/Spinner';

export default class Edit extends OneReadWrite {

	viewId = 'edit'
	constructor(props) {
		super(props);
		this.uploadFileOne = this.uploadFileOne.bind(this);
	}

	getDataDelta() {
		return this.delta || null
	}

	clickSave = evt => {
		const fields = this.model.fields,
			v = this.validate(fields, this.state.data)
		if (v.valid) {
			this.upsertOne()
		} else {
			this.setState({
				invalid: !v.valid
			})
		}
	}

	getPopUpData = (evt, id, data) => {
		data = data ? data : '';
		const newData = JSON.parse(JSON.stringify(this.state.data || {}))
		newData[id] = data;
		this.setDeltaField(id, data)
		this.setState({ data: newData })
	}

	dependentAutoCompletes = (model, value) => {
		Object.keys(model.dependents).forEach((key, index) => {
			if (this.refs[key])
				this.refs[key].changeState(model.dependents[key], value);
		});
	}

	fieldChange = (evt, model, stateVariable) => {
		const fid = evt.target.id,
			newData = JSON.parse(JSON.stringify((stateVariable ? this.state[stateVariable] : this.state.data) || {}))
		let v = evt.target.value
		if (model && model.type === 'checkbox') {
			v = evt.target.checked;
		}
		//Added by shubham on 17-01-2020
		else if (model && model.type === ft.phone) {
			v = RTvalidation.addDashes(v);
		}
		else if (model && model.type.toLowerCase() === ft.autocomplete) {
			newData[fid + 'Key'] = v.value
			this.setDeltaField(fid + 'Key', v.value)
			newData[fid + 'Text'] = v.label
			this.setDeltaField(fid + 'Text', v.label)
			this.setState({
				[stateVariable ? stateVariable : 'data']: newData
			});
			return
		}
		//-----------------------------------Added By Rahul on 14-01-2020---------------------------------------------
		if (typeof v === 'string' && model.toUpperCase && model.toUpperCase.toString().toLowerCase() === "true") {
			v = RTvalidation.convertToUppercase(v);
		}
		//------------------------------------------------------------------------------------------------------------
		newData[fid] = v
		this.setDeltaField(fid, v)
		this.setState({
			[stateVariable ? stateVariable : 'data']: newData
		})
	}

	// Added By shubham
	fieldKeyPress = (evt, model, stateVariable) => {
		const fields = this.model.fields;
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
		// else if (fields) {
		// 	fields.every((f) => {
		// 		if (f.id === field) {
		// 			cMsg = RTvalidation.validateField(f, value, evt.target.value);
		// 			if (cMsg) {
		// 				if (this.refs[f.id]) {
		// 					evt.preventDefault();
		// 					this.refs[f.id].setState({
		// 						invalid: true,
		// 						message: cMsg
		// 					})
		// 				} else {
		// 					console.error('Field ref for "' + f.id + '" not found. The field doesn\'t not belong to any group in the model.')
		// 				}
		// 			}
		// 			else if (this.refs[f.id] && this.refs[f.id].state.invalid) {
		// 				this.refs[f.id].setState({
		// 					invalid: false,
		// 					message: null
		// 				})
		// 			}
		// 			return false;
		// 		}
		// 		return true;
		// 	})
		// }
	}

	fieldOnBlur = (evt, model, stateVariable) => {
		const f = evt.target.id,
			fields = this.model.fields,
			newData = JSON.parse(JSON.stringify((stateVariable ? this.state[stateVariable] : this.state.data) || {})),
			type = evt.target.attributes ? (evt.target.attributes["data-textType"] ? evt.target.attributes["data-textType"].value : false) : false;
		let v = evt.target.value
		if (v) {
			if (model) {
				if (model.id === f) {
					//-----------------------------------Added By Rahul on 16-01-2020--------------------------------------------
					if (type.toString().toLowerCase() === "numeric" || type.toString().toLowerCase() === "decimal") {
						v = parseFloat(v) ? parseFloat(v).toString() : v;
						newData[model.id] = v
						this.setDeltaField(model.id, v)
						this.setState({ [stateVariable ? stateVariable : 'data']: newData })
					}
					//------------------------------------------------------------------------------------------------------------
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
					return false;
				}
			}
			// else if (fields) {
			// 	fields.every((field) => {
			// 		if (field.id === f) {
			// 			//-----------------------------------Added By Rahul on 16-01-2020--------------------------------------------
			// 			if (type.toString().toLowerCase() === "numeric" || type.toString().toLowerCase() === "decimal") {
			// 				v = parseFloat(v) ? parseFloat(v).toString() : v;
			// 				newData[field.id] = v
			// 				this.setDeltaField(field.id, v)
			// 				this.setState({ [stateVariable ? stateVariable : 'data']: newData })
			// 			}
			// 			//------------------------------------------------------------------------------------------------------------
			// 			let cMsg = RTvalidation.validateOnBlur(field, v);
			// 			if (cMsg) {
			// 				if (this.refs[field.id]) {
			// 					evt.preventDefault();
			// 					this.refs[field.id].setState({
			// 						invalid: true,
			// 						message: cMsg
			// 					})
			// 				} else {
			// 					console.error('Field ref for "' + field.id + '" not found. The field doesn\'t not belong to any group in the model.')
			// 				}
			// 			}
			// 			else if (this.refs[field.id] && this.refs[field.id].state.invalid) {
			// 				this.refs[field.id].setState({
			// 					invalid: false,
			// 					message: null
			// 				})

			// 			}
			// 			return false;
			// 		}
			// 		return true;
			// 	});
			// }
		}
	}

	isDirty() {
		return this._dirty
	}

	render() {
		const { id = 0, entity = null, view = 'browse' } = this.props.match.params,
			modelFetched = this.state.modelFetched || false,
			dataFetched = this.state.dataFetched || false,
			isNew = id === 0 || id === '0',
			ep = '/' + entity + '/',
			m = this.model,
			data = this.state.data || {},
			cbs = {
				change: this.fieldChange,
				dropFile: this.uploadFileOne,
				fieldKeyPress: this.fieldKeyPress,
				fieldOnBlur: this.fieldOnBlur,
				dependentAutoCompletes: this.dependentAutoCompletes
			},
			title = this.state.error ? 'No data' : dataTitle(m, data, isNew),
			linkBrowse = isNew ? (ep + 'list') : (ep + view + (id ? ('/' + id) : ''));

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
						value={f.type.toLowerCase() === ft.autocomplete ? { value: data[f.id + 'Key'], label: data[f.id + 'Text'] } : data[f.id]}
						data={data}
						callbacks={cbs}
						entity={entity}
						extraCondition={this.extraCondition}
						extraParameter={this.extraParameter}
					/>
				)
			}
			return null
		}

		const fnPopUp = (p) => {
			if (p) {
				return (
					<PopUp
						key={p.id}
						ref={p.id}
						popupModel={p}
						value={data[p.id]}
						data={data}
						onClickSave={this.getPopUpData}
						entity={entity}
					// {...this}
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
						onClick={this[b.onClick]}
					>
						<span className="glyphicon glyphicon-ok"></span> {b.label}
					</button>
				)
			}
		}

		document.title = title
		this.isNew = isNew
		//const date = wTimestamp ? moment(data['u_date']) : null

		if (modelFetched) {
			if (id === "0" || dataFetched) {	//if data is fetched (edit case) or the id is 0 (new case), render the form
				if (!m || m === -2) {
					return <Alert title="Error" message={i18n.i18n_errors.badEntity.replace('{0}', entity)} />
				}
				else if (m === -1) {
					return (
						<div>
							<Spinner message="Fetching UI models..."></Spinner>
						</div>
					);
				}
				else {
					;
					return (
						<div className="evolutility" role="form">

							<Header {...this.props.match.params}
								title={title}
								model={m}
								comments={data.nb_comments}
								count={null}
								cardinality='1'
								view={this.viewId}
							/>

							<div className="cf-one-edit">

								{this.state.error ? (
									<Alert title="Error" message={this.state.error.message} />
								) : (
										<div className="cf-pnls">
											{(m && m.groups) ? (
												m.groups.map(function (g, idx) {
													const groupFields = fieldId2Field(g.fields, m.fieldsH)
													return (
														<Panel key={g.id || ('g' + idx)}
															title={i18nApp[g.appKey] ? i18nApp[g.appKey] : ''}
															header={g.header}
															footer={g.footer}
															width={g.width}
															buttons={g.footer && g.footer.buttons ? g.footer.buttons.map(fnButton) : null}>
															<div className="cf-fset">
																{groupFields.map(fnField)}
															</div>
														</Panel>
													)
												})
											) : (
													<Panel title={title} key="pAllFields">
														<div className="cf-fset">
															{m.fields.map(fnField)}
														</div>
													</Panel>
												)}

											{m.collections && !isNew ? (
												m.collections.map((c, idx) => {
													return (
														<Panel key={'collec_' + c.id}
															title={c.title}
															collapsible={true}
															header={c.header}
															footer={c.footer}>
															<List
																isNested={true}
																match={this.props.match}
																paramsCollec={c}
																style={{ width: '100%' }}
																location={this.props.location}
															/>
														</Panel>
													)
												})
											) : null}

											<Panel key="formButtons">
												<div className="cf-buttons">
													<Link className="btn btn-default" to={linkBrowse}><i className="glyphicon glyphicon-remove"></i> {i18n.i18n_actions.cancel}</Link>
													<button className="btn btn-primary" onClick={this.clickSave}><i className="glyphicon glyphicon-ok"></i> {i18n.i18n_actions.save}</button>
													{this.state.error ? i18n.i18n_validation.incomplete : null}
													{m.buttons ? m.buttons.map(fnButton) : null}
												</div>
											</Panel>

										</div>
									)
								}
							</div>
							{m.popups ? (
								<div>
									{m.popups.map((item, idx) => {
										return fnPopUp(item)
									})}
								</div>
							) : null}
						</div>
					)
				}
			} else {
				return (<div></div>)
			}

		} else {
			return (<div></div>)
		}
	}

	validate = (fields, data) => {
		let messages = [],
			invalids = {},
			cMsg;
		this.clearValidation()
		fields.forEach((f) => {
			cMsg = f.type === ft.autocomplete ? validation.validateField(f, { value: data[f.id + 'Key'], label: data[f.id + 'Text'] }) : validation.validateField(f, data[f.id])
			if (cMsg) {
				messages.push(cMsg)
				invalids[f.id] = true
				if (this.refs[f.id]) {
					this.refs[f.id].setState({
						invalid: true,
						message: cMsg
					})
				} else {
					console.error('Field ref for "' + f.id + '" not found. The field doesn\'t not belong to any group in the model.')
				}
			} else if (this.refs[f.id] && this.refs[f.id].invalid) {
				this.refs[f.id].setState({
					invalid: false,
					message: null
				})
			}
		})
		if (messages.length) {
			toast.error(i18n.i18n_validation.incomplete + ' ' + messages.join(' '))
		}

		console.log(this.state);

		return {
			valid: messages.length < 1,
			messages: messages,
			invalids: invalids
		}
	}

	clearValidation() {
		const modelFetched = this.state.modelFetched || false;
		if (modelFetched) {
			if (this.model) {
				if (this.model.fields) {
					this.model.fields.forEach((f) => {
						if (this.refs[f.id]) {
							this.refs[f.id].setState({
								invalid: false,
								message: null
							})
						} else {
							console.log('Missing field "' + f.id + '" in clearValidation.')
						}
					})
				}
			}
		}
	}

	setDeltaField(fid, value) {
		if (!this.delta) {
			this.delta = {}
		}
		this.delta[fid] = value
		this._dirty = true
	}
}

Edit.propTypes = {
	match: PropTypes.shape({
		params: PropTypes.shape({
			entity: PropTypes.string.isRequired,
			id: PropTypes.string
		}).isRequired
	}).isRequired,
}