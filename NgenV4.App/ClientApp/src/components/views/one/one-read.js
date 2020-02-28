import React from 'react'
import axios from 'axios'
//import { withRouter, browserHistory } from 'react-router'

import { i18n } from '../../../i18n/i18n'
import { apiPath } from '../../../config.js'
import models from '../../../models/all_models'
import { prepModel, prepModelCollecs } from '../../../utils/dico'
import FilterGenerator from './FilterGenerator'

import './one.scss'

export default class OneRead extends FilterGenerator {

	viewSuperType = '1' // = one

	state = {
		data: this.props.match.params.id === '0' & this.getDefaultData ? this.getDefaultData() : {},
		loading: true,
		invalid: false,
		modelFetched: false,
		dataFetched: false
	}

	componentWillMount() {
		if (!this.state.isCustomPage)
			this.setModel()
	}

	getData(entity, nid) {
		const e = entity || this.props.match.params.entity,
			id = nid || this.props.match.params.id
		let newState = {
			data: {},
			loading: false,
			invalid: false
		}

		this.setState({
			dataFetched: false
		})

		if (this.clearValidation && this.viewId !== 'browse') {
			this.clearValidation()
		}
		if (id && id !== '0') {
			this.setState({
				loading: true
			});
			const qUrl = apiPath + e + '/GetRecord/' + id
			// const qUrl = apiPath + e + '/' + id
			this.lastQuery = qUrl
			axios.get(qUrl)
				.then((response) => {
					if (this.lastQuery === qUrl) {
						if (response.data !== null && response.data !== '') {
							this.emptyDelta(false)
							newState.data = response.data
						} else {
							newState.info = i18n.i18n_errors.badId.replace('{0}', id)
						}
						this.lastQuery = null
						this.setState(newState)
					} else {
						console.log('Navigated before response: ' + qUrl)
					}
					this.setState({
						dataFetched: true
					})
				})
				.catch(err => {
					newState.error = {
						message: err.message || i18n.i18n_errors.badId.replace('{0}', id)
					}
					this.setState(newState)
					this.setState({
						dataFetched: true
					})
				})
		} else if (id === '0') {
			this.emptyDelta(true)
			newState.data = this.getDefaultData()
			this.setState(newState)
		}
	}

	componentDidMount() {

		const props = this.props
		// - set hook to confirm navigation (on leave if dirty data)
		if (props.router) {
			props.router.setRouteLeaveHook(props.route, this.routerWillLeave)
		}
		window.scrollTo(0, 0)
		// - get data or if new then clear data
		if (this.props.match.params.id && this.props.match.params.id !== '0') {
			this.getData()
		} else {
			this.emptyDelta(true)
			this.setState({
				data: this.props.match.params.id === '0' && this.getDefaultData ? this.getDefaultData() : {},
				invalid: false
			})
		}
	}

	componentWillUnmount() {
		this.done = true
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.match.params && (nextProps.match.params.entity !== this.props.match.params.entity
			|| nextProps.match.params.id !== this.props.match.params.id)) {
			this.setModel(nextProps.match.params.entity)
			// TODO: alternative to isMounted
			if (!this.done) {
				//if(this.isMounted()){ 
				const isNew = nextProps.match.params.id === '0'
				this.emptyDelta(isNew)
				this.setState({
					data: isNew ? this.getDefaultData() : {},
					invalid: false
				})
				if (!isNew) {
					this.getData(nextProps.match.params.entity, nextProps.match.params.id)
				}
			}
		}
	}

	setModel(entity, id) {

		//this.model cases
		//-1 : when there is no data present
		//undefined : when data is not returned correctly or error is caught
		//...: it will contain data if request is successful

		this.model = -1;

		const modelName = entity || this.props.match.params.entity

		this.setState({
			loading: true,
			modelFetched: false
		});

		return axios.get(apiPath + 'FormModel', {
			params: {
				"modelName": modelName
			}
		}).then((response) => {
			if (response.data !== null && response.data !== '') {
				let models = []
				models[0] = response.data
				prepModel(models[0])
				prepModelCollecs(models, models[0])
				this.model = models[0]
				//return models[0];

				if (!this.done) {
					//if(this.isMounted()){ 
					const isNew = id === '0'
					this.emptyDelta(isNew)
					this.setState({
						data: isNew ? this.getDefaultData() : {},
						invalid: false
					})
					if (!isNew) {
						this.getData(modelName, id)
					}
				}
				this.setState({
					loading: false,
					modelFetched: true
				});
			} else {
				prepModel(models.todo)
				prepModelCollecs(models, models.todo)
				this.model = models.todo
				this.setState({
					loading: false,
					modelFetched: true
				});
			}
		}).catch(() => {
			this.model = undefined;
			this.setState({
				loading: false,
				modelFetched: false
			});
		})
	}

	emptyDelta(useDefault) {

		this._dirty = false
		this.delta = (useDefault && this.getDefaultData) ? this.getDefaultData() : {}
	}

}
