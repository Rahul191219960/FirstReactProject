import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import { pageSize } from '../../../config'

import Many from './many'

import { isFieldMany, fieldIsNumber, fieldTypes as ft } from '../../../utils/dico'
import { getSearchText } from '../../../utils/url'
import { fieldValue } from '../../../utils/format'
import Header from '../../shell/Header'
import Spinner from '../../shell/Spinner'
import NoData from './NoData'
import Alert from '../../widgets/Alert'
import PageNotFound from '../../pages/PageNotFound'
import Pagination from '../../widgets/Pagination'
import { i18nApp } from '../../../i18n/i18nApp'
import { getLabel } from '../../../utils/dico'
import CheckBox from "../../../components/field/CheckBox";

import './List.scss'

const sliceData = data => data.length > pageSize ? data.slice(0, pageSize) : (data || [])


// TODO: search w/ pagination
export default class List extends Many {

	viewId = 'list'

	lovMaps = {}

	tableHeader(fields) {

		const fnCell = this.props.paramsCollec ?
			// - header sub-collection table
			f => <th key={'c' + f.id}>{getLabel(f.id)}</th>
			:
			// - header main table
			f => <th id={f.id} key={f.id} onClick={this.clickSort}
				className={fieldIsNumber(f) ? 'alignR' : ''}>
				{getLabel(f.id)}
				{f.id === this._sortField ? (
					<i className={"glyphicon glyphicon-arrow-" + (this._sortDirection === 'desc' ? 'down' : 'up')}></i>
				) : null}
			</th>

		return (
			<tr>
				<th style={{ width: `100px` }}>Action</th>
				{fields.map(fnCell)}
			</tr>
		)
	}

	searchDataHandler = (searchParams) => {
		this.getData(undefined, undefined, searchParams);
	}

	render() {

		let props,
			isNested,
			e,
			m,
			paramsCollec,
			search,
			modelFetched;

		if (this.props.isCustomPage) {
			props = this.props
			isNested = props.isNested ? props.isNested : false
			e = props.gridModel.id
			m = this.model
			paramsCollec = this.model.paramsCollec
			search = getSearchText()
			modelFetched = this.state.modelFetched || false;
		} else {
			props = this.props
			isNested = props.isNested
			e = props.match.params.entity
			m = this.model
			paramsCollec = props.paramsCollec
			search = getSearchText()
			modelFetched = this.state.modelFetched || false;
		}

		if (modelFetched) {
			if (m || isNested) {
				const ico = (isNested ? (paramsCollec && paramsCollec.icon) : m.icon) || null
				// const icon = ico ? <i class={ico}></i> : null
				const realEntity = isNested ? paramsCollec.object || paramsCollec.entity : e
				const link = '/' + realEntity + '/' + ((m && m.defaultViewOne) || 'browse') + '/'
				const editLink = '/' + realEntity + '/' + 'edit' + '/';
				const deleteLink = '/' + realEntity + '/' + 'delete' + '/';
				const getLovMap = this.getLovMap

				const cell = (d, f, idx) => {
					const lovField = f.type === ft.lov
					const isAutocomplete = f.type === ft.autocomplete
					const value = d[lovField ? f.id + '_txt' : (isAutocomplete ? f.id + 'Text' : f.id)]
					// const value = d[lovField ? f.id + '_txt' : f.id]
					if (idx === 0) {
						// - Second column is a link
						return (
							<td key={f.id}>
								<Link to={link + d.id}>
									{/* {icon} */}
									{value ? fieldValue(f, value, true) : ('( ' + d.id + ' )')}
								</Link>
								{d.nb_comments ? (' ' + d.nb_comments + ' comments') : null}
							</td>
						)
					} else if (f.type === ft.image) {
						return <td key={f.id}>
							{value ? <Link to={link + d.id}>{fieldValue(f, value, true)}</Link> : ''}
						</td>
					} else if (f.type === ft.color) {
						return <td key={f.id}><div className="evo-color-box" id={f.id}
							style={{ backgroundColor: value }} title={value} /></td>
					} else if (lovField && f.lovIcon) {
						let icon = d[f.id + '_icon']
						if (icon) {
							return (
								<td key={f.id}>
									<div className="nobr">
										<img src={'/pix/' + icon} className="lov-icon" alt="" />
										{fieldValue(f, value, true)}
									</div>
								</td>
							)
						}
					} else if (f.type === ft.list) {
						const lovMap = getLovMap(f)
						return (
							<td key={f.id}>
								<div className="list-tags">
									{(value || []).map(v => <div key={v}>{lovMap[v] || 'N/A'}</div>)}
								</div>
							</td>
						)
					} else if (fieldIsNumber(f)) {
						return <td key={f.id} className="alignR">{fieldValue(f, value, true)}</td>
					}
					return <td key={f.id}>{fieldValue(f, value, true)}</td>
				}

				const createActionButtons = (b, d) => {
					if (b.type === ft.button) {
						return <div className="action-btn icon-edit" key={d.id}>
							<Link to={b.to ? b.to : "#"} onClick={b.onClick ? (e) => b.onClick(e, d.id) : function () { }}>
								<i className={b.icon}></i>
							</Link>
						</div>
					}
					else if (b.type === ft.checkbox) {
						return <div className="action-btn icon-edit" key={d.id}>
							<CheckBox id={"action_" + d.id} value={d.id} onChange={b.onClick ? (e) => b.onClick(e, d.id) : function () { }} />
						</div>
					}
				}

				const data = this.state.data ? this.state.data : [],
					full_count = this.pageSummary(data),
					fullCount = data.length ? (data[0]._full_count || data.length) : data.length,
					title = m.customTitle ? (getLabel(m.title)) : (getLabel(m.id)),
					// title = m ? (i18nApp[m.id] ? i18nApp[m.id] : 'N/A') : 'N/A',
					// title = m ? (m.title || m.label) : 'N/A',
					css = paramsCollec ? 'table sub' : 'table table-hover main'
				let body,
					pagination = null

				document.title = title
				if (this.state.loading) {
					body = <Spinner />
				} else if (this.state.error) {
					if (isNested) {
						body = <div className="nodata">No data.</div>
					} else {
						body = <Alert title="Error" message={this.state.error.message} />
					}
				} else {
					if (data.length) {
						const fields = paramsCollec ? paramsCollec.fields : m.fields.filter(isFieldMany)

						if (!fields.length) {
							body = <Alert title="Error" message="No fields are flagged as inMany to show in list." />
						} else {
							body = (
								<div className="cf-list-container">
									<table className={css}>
										<thead>
											{this.tableHeader(fields)}
										</thead>
										<tbody>
											{data.length ? sliceData(data).map((d) => {
												return (
													<tr key={`tr_` + d.id}>
														<td key={d.id} className="action-btn-container">
															{this.props.hideActions && !this.props.hideActions.includes("read") ? <div className="action-btn icon-read">
																{this.props.onClickRead ? (
																	<Link to={"#"}
																		onClick={(e) => this.props.onClickRead(e, d.id)}>
																		<i className="fas fa-eye"></i>
																	</Link>
																) : <Link to={link + d.id}>
																		<i className="fas fa-eye"></i>
																	</Link>}
															</div> : null}
															{this.props.hideActions && !this.props.hideActions.includes("edit") ? <div className="action-btn icon-edit">
																{this.props.onClickEdit ? (
																	<Link to={"#"}
																		onClick={(e) => this.props.onClickEdit(e, d.id)}>
																		<i className="fas fa-pencil-alt"></i>
																	</Link>
																) : <Link to={editLink + d.id}>
																		<i className="fas fa-pencil-alt"></i>
																	</Link>}
															</div> : null}
															{this.props.hideActions && !this.props.hideActions.includes("delete") ? <div className="action-btn icon-delete">
																{this.props.onClickDelete ? (
																	<Link to={"#"}
																		onClick={(e) => this.props.onClickDelete(e, d.id)}>
																		<i className="fas fa-trash"></i>
																	</Link>
																) : <Link to={deleteLink + d.id}>
																		<i className="fas fa-trash"></i>
																	</Link>}
															</div> : null}
															{this.props.customActionButtons ? (
																this.props.customActionButtons.map((b) => createActionButtons(b, d))
															) : null}
														</td>
														{fields.map((f, idx) => cell(d, f, idx))}
													</tr>
												)
											}) : null}
										</tbody>
									</table>
								</div>
							)
							pagination = (
								<Pagination
									count={data.length}
									fullCount={fullCount}
									fnClick={this.clickPagination}
									location={this.props.location}
								/>
							)
						}
					} else {
						// TODO: get model of nested obj
						if (this.props.isNested) {
							body = <div className="nodata">No data.</div>
						} else {
							body = <NoData name={m.name} namePlural={m.namePlural}></NoData>
						}
					}
				}
				return (
					<div data-entity={e} style={{ width: '100%' }}>
						{paramsCollec ? null : (
							<Header
								buttonCalls={
									{
										add: this.props.onClickNew ? this.props.onClickNew : null,
										list: this.props.onClickList ? this.props.onClickList : null,
									}
								}
								entity={e}
								title={title}
								model={m}
								count={full_count}
								cardinality={this.props.cardinality ? this.props.cardinality : 'n'}
								view={this.viewId}
								customButtons={this.props.customButtons}
								searchDataHandler={this.searchDataHandler}
							/>
						)}
						<div className="evolutility evol-many-list">
							{body}
							{(search && !this.state.loading) ? null : pagination}
						</div>
					</div>
				)
			} else {
				return <PageNotFound location={this.props.location} />
			}
		} else {
			return (<div></div>)
		}
	}

	getLovMap = f => {
		let map = this.lovMaps[f.id]
		if (!map && f.list) {
			map = {}
			f.list.forEach(item => map[item.id] = item.text)
			this.lovMaps[f.id] = map
		}
		return map
	}

}

List.propTypes = {
	params: PropTypes.shape({
		entity: PropTypes.string.isRequired
	}),
	paramsCollec: PropTypes.object,
	isNested: PropTypes.bool,
}