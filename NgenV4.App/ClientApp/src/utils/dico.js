import { fieldValue } from './format'
import { i18nApp } from '../i18n/i18nApp'

// - Field Types
const ft = {
	label: 'label',
	text: 'text',
	textml: 'textmultiline',
	bool: 'boolean',
	int: 'integer',
	dec: 'decimal',
	numeric: 'numeric',
	alphaNumeric: "alphanumeric",
	alpha: "alpha",
	money: 'money',
	date: 'date',
	datetime: 'datetime',
	time: 'time',
	lov: 'lov',
	list: 'list', // many values for one field (behave like tags - return an array of strings)
	html: 'html',
	formula: 'formula', // soon to be a field attribute rather than a field type
	email: 'email',
	phone: 'phone',
	image: 'image',
	doc: 'document',
	//geoloc: 'geolocation',
	url: 'url',
	color: 'color',
	hidden: 'hidden',
	json: 'json',
	multicontrol: 'multicontrol', //Used to create multiple controls in a single control (under single label)
	//Added By Shubham
	checkbox: 'checkbox',
	checkboxlist: 'checkboxlist',
	radiobuttonlist: 'radiobuttonlist',
	autocomplete: 'autocomplete',
	multiselect: 'multiselect',
	button: 'button'
};
const fta = Object.keys(ft).map(k => ft[k])

const isFunction = x => typeof x === "function"

export const fieldTypes = ft
export const fieldTypeStrings = fta

export const fieldIsNumber = f => f.type === ft.int || f.type === ft.money || f.type === ft.numeric || f.type === ft.dec

export const fieldIsInteger = f => f.type === ft.int
export const fieldIsNumeric = f => f.type === ft.numeric
export const fieldIsDecimal = f => f.type === ft.dec
export const fieldIsMoney = f => f.type === ft.money
export const fieldIsAlphanumeric = f => f.type === ft.alphaNumeric
export const fieldIsAlpha = f => f.type === ft.alpha
export const fieldIsEmail = f => f.type === ft.email
export const fieldIsPhone = f => f.type === ft.phone
export const fieldIsUrl = f => f.type === ft.url
export const fieldIsRadioButtonList = f => f.type === ft.radiobuttonlist

export const fieldIsDateOrTime = f => f.type === ft.date || f.type === ft.datetime || f.type === ft.time

export const fieldInCharts = f => fieldChartable(f) && !f.noCharts;
export const fieldIsCheckBoxList = f => f.type === ft.checkboxlist

export const fieldChartable = f => f.type === ft.lov || f.type === ft.bool || fieldIsNumber(f);

export function hById(arr, prop = 'id') {
	var objH = {};
	if (arr) {
		arr.forEach(function (o) {
			objH[o[prop]] = o;
		});
	}
	return objH;
}

function getFields(model) {
	const fs = [];

	function collateFields(te) {
		if (te && te.elements && te.elements.length > 0) {
			te.elements.forEach(function (te) {
				if (te.type !== 'panel-list') {
					collateFields(te);
				}
			});
		} else {
			if (te.type && te.type !== 'formula') {
				fs.push(te);
			}
		}
	}

	if (model) {
		if (model.fields) {
			return model.fields;
		} else {
			collateFields(model);
			model.fields = fs;
			return fs;
		}
	}
	return []
}

export function prepModel(m) {
	if (m) {
		if (!m.prepared) {
			// - Model
			m.defaultViewOne = m.defaultViewOne || 'browse'
			//m.defaultViewMany = m.defaultViewMany || 'list'
			if (!m.label) {
				m.label = m.title || m.namePlural || m.name;
			}
			// - Fields
			if (!m.fields) {
				m.fields = getFields(m);
			}
			if (!m.fieldsH) {
				m.fieldsH = hById(m.fields);
			}
			if (!m.titleField) {
				m.titleField = m.fields[0];
			}
			if (m.fields.filter(fieldInCharts).length < 1) {
				m.noCharts = true
			}
			m.prepared = true
		}
		return m;
	}
	return null;
}

export function prepModelCollecs(models, m) {
	if (m) {
		if (!m.preparedCollecs) {
			if (m.collections) {
				m.collections.forEach((c) => {
					if (c.object) {
						const collecModel = models[c.object]
						if (collecModel) {
							const fsh = collecModel.fieldsH
							c.fields.forEach((f, idx) => {
								if (typeof (f) === 'string') {
									c.fields[idx] = JSON.parse(JSON.stringify(fsh[f]))
								}
							})
						} else {
							console.log('Model "' + c.object + '" not found in model "' + m.id + '".')
						}
					}
				})
			}
			m.preparedCollecs = true
		}
		return m;
	}
	return null;
}

export const dataTitle = (m, data, isNew) => {

	if (m) {
		let f, title = ''
		if (isNew) {
			title = 'New ' + ((i18nApp[m.id + '_name'] ? i18nApp[m.id + '_name'] : 'item') || 'item')
			// title = 'New ' + (m.name || 'item')
		} else if (m.titleField) {
			if (isFunction(m.titleField)) {
				title = m.titleField(data)
			} else {
				f = m.fieldsH[m.titleField]
				if (!f) {
					f = m.fields[0]
				}
				if (f && data) {
					const isAutoComplete = f.type === ft.autocomplete
					// title = fieldValue(f,data[f.id])
					title = fieldValue(f, data[isAutoComplete ? f.id + 'Text' : f.id])
				}
			}
		}
		return title
	} else {
		return 'New item'
	}
}

export const getLabel = (appKey) => {

	if (appKey) {
		return i18nApp[appKey] ? i18nApp[appKey] : '';
	}
}

export const isFieldMany = f => f.inList || f.inMany

export const fieldIsText = f => [ft.text, ft.textml, ft.url, ft.html, ft.email].indexOf(f.type) > -1;

export const fieldId2Field = (fieldIds, fieldsH) => fieldIds ? fieldIds.map(id => fieldsH[id] || null) : null

export default {
	fieldTypes: ft,
	fieldTypeStrings: fta,

	fieldIsInteger: fieldIsInteger,
	fieldIsNumber: fieldIsNumber,
	fieldIsDecimal: fieldIsDecimal,
	fieldIsAlphanumeric: fieldIsAlphanumeric,

	fieldIsDateOrTime: fieldIsDateOrTime,
	fieldIsNumeric: fieldIsNumeric,
	fieldInCharts: fieldInCharts,
	fieldChartable: fieldChartable,
	hById: hById,
	hByX: hById,
	prepModel: prepModel,
	prepModelCollecs: prepModelCollecs,
	dataTitle: dataTitle,
	isFieldMany: isFieldMany,
	fieldIsText: fieldIsText,
	fieldId2Field: fieldId2Field,
	fieldIsCheckBoxList: fieldIsCheckBoxList,
	fieldIsRadioButtonList: fieldIsRadioButtonList
}