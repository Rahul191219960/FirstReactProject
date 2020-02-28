import React from 'react'
import axios from 'axios'
import models from '../../../models/all_models'
import { capitalize } from '../../../utils/format'
import { i18n } from '../../../i18n/i18n'
import { apiPath } from '../../../config.js'
import OneRead from './one-read'
import ft from './../../../utils/dico'

import { toast } from 'react-toastify';

export default class OneReadWrite extends OneRead {

	upsertOne = entity => {
		const e = entity || this.props.match.params.entity,
			m = models[e],
			id = parseInt(this.props.match.params.id || '', 10),
			data = this.delta,
			url = apiPath + e + '/' + (id ? 'UpdateRecord/' + id : 'SaveRecord');

		const isNew = id ? false : true;
		if (data && Object.keys(data).length) {
			axios['post'](url, data)
				.then(response => {

					toast.success(response.data.StatusMessage)
					this.props.history.push('/' + e + '/list/')

					this.setState({
						data: response.data,
						invalid: false
					})
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
	}

	uploadFileOne = (fieldId, formData) => {
		// - only for fields of type image or document
		const mid = this.model.id,
			f = this.model.fieldsH[fieldId],
			stateData = this.state.data || {}

		const setData = filePath => {
			const newData = JSON.parse(JSON.stringify(stateData))
			newData[f.id] = filePath
			this.setDeltaField(f.id, filePath)
			this.setState({
				data: newData
			})
		}

		if (formData && (f.type === 'image' || f.type === 'document')) {
			let url = apiPath + mid + '/upload/' + stateData.id + '?field=' + f.id

			axios.post(url, formData)
				.then(response => {
					setData(mid + '/' + response.data.fileName)
				})
				.catch(error => {
					toast.error(i18n.i18n_errors.badUpload)
					console.log(error);
				});
		} else {
			setData('')
		}
	}

	setDeltaField(fid, value) {

		if (!this.delta) {
			this.delta = {}
		}
		this.delta[fid] = value
		this._dirty = true
	}

	getLOV(fid) {
		const mid = this.model.id

		if (!this.lovs) {
			axios.get(apiPath + mid + '/lov/' + fid)
				.then(response => {
					this.model.fieldsH[fid].list = response.data.map(d => ({
						id: d.id,
						text: d.text
					}))
					if (this.refs[fid]) {
						this.refs[fid].forceUpdate()
					}
					this.lovs = true
				})
				.catch(err => {
					const errorMsg = 'Error retrieving list of values for field "' + fid + '".'
					toast.error(errorMsg)
					this.setState({
						message: errorMsg
					})
				})
		}
	}
	/*
		routerWillLeave(nextLocation) {
			// - return false to prevent a transition w/o prompting the user,
			// - or return a string to allow the user to decide.
			if (this.isDirty && this.isDirty()){
				if(evoGlobals.skip_confirm){
					delete(evoGlobals.skip_confirm)
				}else{
					// TODO: same msg and actions as SublimeText
					return i18n.i18n_msg.confirmLeave
				}
			}
		}
	*/
	getDefaultData() {
		const obj = {};
		if (this.model && this.model !== -1) {
			this.model.fields.forEach(function (f) {
				obj[f.id] = f.defaultValue ? f.defaultValue : '';
				/*--------------------added by rahul on 23-01-2020--------------------------------
				-----------to override the value if all check box is checked by default----------*/
				if (f.type.toLowerCase() === 'checkboxlist') {
					var isAllChecked = f.allController ? f.allController.checked : false
					if (isAllChecked) {
						let values = []
						for (var i = 0; i < f.checkBoxList.length; i++) {
							values.push(f.checkBoxList[i].value)
						}
						obj[f.id] = values.toString();
					}
				} else if (f.type === ft.autocomplete) {
					obj[f.id + 'Key'] = ''
					obj[f.id + 'Text'] = ''
				}
				else if (f.type === 'lov' && obj[f.id] == null) {
					obj[f.id] = '';
				}
			})
		}
		return obj;
	}

} 
