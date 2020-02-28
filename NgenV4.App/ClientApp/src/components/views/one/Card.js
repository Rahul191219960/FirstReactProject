import React from 'react'
import PropTypes from 'prop-types';

// import Icon from 'react-crud-icons'
// import models from '../../../models/all_models'
import { fieldValue } from '../../../utils/format'
import { fieldTypes as ft } from '../../../utils/dico'
import { Link } from 'react-router-dom'
import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';

export default class Card extends React.PureComponent {

    viewId = 'card'

    lovMaps = {}

    segregateHeader = (fields) => {
        if (fields.length > 0) {
            return fields[0];
        }
    }

    segregateRows = (fields) => {
        if (fields.length > 0) {
            let newfields = [];
            fields.forEach((elem, idx) => {
                if (idx !== 0) {
                    newfields.push(elem);
                }
            })
            return newfields;
        }
    }

    render() {
        const d = this.props.data || {},
            oldfields = this.props.fields || [],
            entity = this.props.entity,
            m = this.props.model,
            link = '/' + entity + '/' + m.defaultViewOne + '/',
            linkEdit = '/' + entity + '/edit/',
            // icon = m.icon ? <img className="evol-many-icon" src={'/pix/' + m.icon} alt="" /> : null,    //old
            icon = m.icon ? <i className={`${m.icon} padding-right-10`}></i> : null,    //new
            getLovMap = this.getLovMap;

        const header = this.segregateHeader(oldfields) || undefined;
        const fields = this.segregateRows(oldfields) || undefined;

        let attr = undefined, fv = undefined;

        if (header) {
            attr = (header.type === ft.lov) ? header.id + '_txt' : header.id;
            fv = fieldValue(header, d[attr])
        }

        return (
            <div className="cf-card-panel">

                {
                    header ? (
                        <div className="cf-panel-header-container">
                            <header>
                                <Link to={link + d.id}>{icon}{fv ? fv : '( ' + d.id + ' )'}</Link>
                                <div className="flex-send-right">
                                    <Link to={linkEdit + d.id}><i className="fas fa-pencil-alt"></i></Link>
                                </div>
                            </header>
                        </div>
                    ) : (
                            <div className="cf-panel-header-container">
                                <header>
                                </header>
                            </div>
                        )
                }

                <div className="cf-panel-body-container">
                    <SimpleBar style={{ maxHeight: `100%` }}>
                        {
                            fields ? (
                                fields.map(function (f, idx) {
                                    attr = (f.type === ft.lov) ? f.id + '_txt' : f.id;
                                    fv = fieldValue(f, d[attr]);
                                    if (f.type === ft.image) {
                                        return <div key={f.id} className="card-fld-center"><Link to={link + d.id}>{fv}</Link></div>
                                    } else if (f.type === ft.list) {
                                        const lovMap = getLovMap(f)
                                        return (
                                            <div key={f.id}>
                                                <label>{f.labelShort || f.label}: </label>
                                                <div className="list-tags">
                                                    {fv ? fv.map(v => <div key={v}>{lovMap[v] || 'N/A'}</div>) : null}
                                                </div>
                                            </div>
                                        )
                                    } else {
                                        //Create the div for single property
                                        const icon = f.type === ft.lov && f.lovIcon ? d[f.id + '_icon'] : ''
                                        return (
                                            <div key={f.id} className="card-item-row">
                                                <label className="card-item-row-label">{f.labelShort || f.label}</label>
                                                <label className="card-item-row-divider"> : </label>
                                                <div className="card-item-row-value">
                                                    {icon ? <img src={'/pix/' + icon} className="lov-icon" alt="" /> : ''}
                                                    {fv}
                                                </div>
                                            </div>
                                        )
                                    }
                                })
                            ) : (
                                    <div></div>
                                )
                        }
                    </SimpleBar>
                </div>
            </div>
        )
    }

    getLovMap = f => {
        let map = this.lovMaps[f.id]
        if (!map && f.list) {
            map = {}
            f.list.forEach(item => map[item.id] = item.text)
            // - it would be better to not duplicate lovMap for fields sharing the same list
            this.lovMaps[f.id] = map
        }
        return map
    }

}

Card.propTypes = {
    entity: PropTypes.string.isRequired,
    fields: PropTypes.array,
    data: PropTypes.object
}