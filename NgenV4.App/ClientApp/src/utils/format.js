// Evolutility-UI-React :: format.js

// Helpers for string, numbers, and date formats

// https://github.com/evoluteur/evolutility-ui-react
// (c) 2019 Olivier Giulieri

import React from 'react'
import numeral from 'numeral'
import moment from 'moment'

// include locale support for a few chosen countries -- add more as needed
//import 'moment/locale/en-gb'
//import 'moment/locale/en-au'
//import 'moment/locale/fr'
//import 'moment/locale/de'
//import 'moment/locale/es'

import { filesUrl, locale } from '../config.js'
import { fieldTypes as ft } from './dico.js'

// Set the locale from the browser -- which may need to be configured
moment.locale(locale || window.navigator.userLanguage || window.navigator.language)

export function capitalize(word) { // TODO: maybe use _.string.capitalize(word);
    if (word && word.length > 0) {
        return word.substring(0, 1).toUpperCase() + word.substring(1);//.toLowerCase();
    }
    return '';
}

export function image(d) {
    if (d === null) {
        return null
    }
    return <img src={d} className="img-thumbnail" alt="" />
}

export function doc(d, path) {
    if (nullOrUndefined(d)) {
        return null
    }
    return <a href={encodeURI(path + d)} target='_blank' rel="noopener noreferrer">{d}</a>
}

// --- date formats ---
function dateOpt(d, type) {
    if (type === ft.time) {
        return timeString(d)
    } else if (type === ft.datetime) {
        return dateString(d)
    }
    return dateString(d);
}

const dateString = d => mFormat(d, 'L')
//const timeString = d => mFormat(moment(d, 'HH:mm:ss'), 'LTS')
const timeString = d => mFormat(moment(d, 'HH:mm:ss'), 'hh:mm A')
const datetimeString = d => mFormat(d, 'L hh:mm A')
const decimalString = d => numFormat(d, d > 1 ? '0.00' : '0.000')
const moneyString = d => numFormat(d, '$0,0.00')
const jsonString = js => js ? JSON.stringify(js, null, '\t') : '';

export function fieldValue(f, d, abbr) {
    if (f.type === ft.bool) {
        return d ? <i className="glyphicon glyphicon-ok"></i> : ''
    } else if (f.type === ft.date) {
        return dateString(d)
    } else if (f.type === ft.time) {
        return timeString(d)
    } else if (f.type === ft.datetime) {
        return datetimeString(d)
    } else if (f.type === ft.color) {
        return (
            <div>
                <div className="evo-color-box" id={f.id}
                    style={{ backgroundColor: d }} title={d}>
                    {!abbr && d ? <span>{d}</span> : null}
                </div>
            </div>
        )
    } else if (f.type === ft.image && d) {
        return image(filesUrl + d)
    } else if (f.type === ft.url && d) {
        return <a href={d} target="_blank" rel="noopener noreferrer">{d}</a>
    } else if (f.type === ft.email && d) {
        return <a href={'mailto:' + d}>{d}</a>
    } else if (f.type === ft.json && d) {
        return jsonString(d)
    } else if (f.type === ft.dec && d) {
        return decimalString(d)
    } else if (f.type === ft.money && d) {
        return moneyString(d)
    } else if (f.type === ft.autocomplete && d) {
        // console.log(d);
        // return d.label
        if(typeof(d) === 'string'){
            return d;
        }
        else{
            return d.label ? d.label : d.value
        }
    }
    else if (f.type === ft.multiselect && d) {
        if (Array.isArray(d)) {
            var string = "";
            for (var i = 0; i < d.length; i++) {
                if (d[i].label) {
                    string = string + d[i].label + ","
                }
            }
            return string.slice(0, -1);
        }
        else {
            return d
        }
    }/*else if(f.type===ft.lov && icon){
        return <React.Fragment><img src={icon} alt=""></img>{d}</React.Fragment>
    }*/
    return d
}

const mFormat = (d, format) => nullOrUndefined(d) ? '' : moment(d).format(format)
const numFormat = (d, format) => nullOrUndefined(d) ? '' : numeral(d).format(format)
const nullOrUndefined = v => v === null || v === undefined

export function urlJoin(u1, u2) {
    const slashu2 = u2[0] === '/'
    const slashu1 = u1[u1.length - 1] === '/'
    if (slashu2 && slashu1) {
        return u1 + u2.substring(1)
    } else if (!slashu2 && !slashu1) {
        return u1 + '/' + u2
    } else {
        return u1 + u2
    }
}

const formatLib = {

    // config to override browser
    locale: moment.locale(),

    now: () => moment(),

    fieldValue: fieldValue,
    image: image,
    doc: doc,

    // --- date formats ---
    dateOpt: dateOpt,
    dateString: dateString,
    timeString: timeString,
    datetimeString: datetimeString,
    decimalString: decimalString,
    moneyString: moneyString,
    jsonString: jsonString,

    urlJoin: urlJoin,

    capitalize: capitalize

};

export default formatLib;
