import React from 'react';
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Icon from 'react-crud-icons'
import Toolbar from '../widgets/Toolbar.js';
import axios from 'axios'
import { apiPath } from '../../config'
import { queryUrl, getSearchText } from '../../utils/url.js'
import { i18n_msg } from '../../i18n/i18n'
import './Header.scss'
import SearchFilter from './SearchFilter/SearchFilter.js';
import { toast } from 'react-toastify';

const iconH = {
    'n': {
        'new': { id: 'edit/0', icon: 'add', label: 'New' },
        'delete': { id: 'delete', icon: 'delete', label: 'Delete' },
        'filter': { id: 'filter', icon: 'filter', label: 'Filter' },
        'list': { id: 'list', icon: 'list', label: 'List' },
        'cards': { id: 'cards', icon: 'cards', label: 'Cards' },
        'charts': { id: 'charts', icon: 'dashboard', label: 'Dashboard' },
        'stats': { id: 'stats', icon: 'stats', label: 'Stats' }
    },
    '1': {
        'edit': { id: 'edit', icon: 'edit', label: 'Edit' },
        'browse': { id: 'browse', icon: 'browse', label: 'Browse' },
        'delete': { id: 'delete', icon: 'delete', label: 'Delete' },
    },
    'custom': {
        'new': { id: 'edit/0', icon: 'add', label: 'New' },
        'edit': { id: 'edit', icon: 'edit', label: 'Edit' },
        'delete': { id: 'delete', icon: 'delete', label: 'Delete' },
        'filter': { id: 'filter', icon: 'filter', label: 'Filter' },
        'list': { id: 'list', icon: 'list', label: 'List' },
        'cards': { id: 'cards', icon: 'cards', label: 'Cards' },
        'charts': { id: 'charts', icon: 'dashboard', label: 'Dashboard' },
        'stats': { id: 'stats', icon: 'stats', label: 'Stats' }
    }
}

export default class Header extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showFilterContainer: false
        }
    }

    clickDelete = (evt, id, entity, history) => {

        let url = apiPath + entity + '/DeleteRecord/' + id;
        axios['get'](url)
            .then(response => {

                toast.success(response.data.StatusMessage)
                history.push('/' + entity + '/list/')
            })
            .catch(error => {

                toast.error('Server error occured.')
                console.log(error);
            });
    }

    getIcons(cardinality, model, customButtons) {
        const ih = iconH[cardinality]
        let cardiIcons = []
        if (cardinality === '1') {
            cardiIcons = [
                ih.edit,
                ih.browse,
                ih.delete
            ]
        } else if (cardinality == 'n') {
            cardiIcons = [
                ih.new,
                ih.list,
                ih.cards,
                ih.filter
            ]
        }
        else if (cardinality == 'custom') {
            customButtons.forEach(element => {
                cardiIcons.push(ih[element])
            });
        }
        return cardiIcons;
    }

    iconViews(mid, cardinality, id, view, model, buttonFunctions, customButtons, history, isCustomPage) {

        if (cardinality === '1' && id === '0') {
            return null
        }
        const urlFrag = (id ? ('/' + id) : '') + queryUrl()
        return (
            <div className="hIcons">
                {this.getIcons(cardinality, model, customButtons).map(ico => {
                    return buttonFunctions && buttonFunctions[ico.icon] ?
                        <Link to={'#'} onClick={buttonFunctions[ico.icon]}
                            className={view === ico.id ? 'active' : ico.id}
                            key={ico.id}>
                            <Icon name={ico.icon} tooltip={ico.label} theme="light"></Icon>
                        </Link> :
                        ico.id === "delete" ?
                            (
                                <Link to={'#'} onClick={(evt) => { this.clickDelete(evt, id, isCustomPage ? mid : model.id, history, isCustomPage) }}
                                    className={view === ico.id ? 'active' : ico.id}
                                    key={ico.id}>
                                    <Icon name={ico.icon} tooltip={ico.label} theme="light"></Icon>
                                </Link>
                            )
                            :
                            (
                                ico.id === "filter" ?
                                    (
                                        <Link to={"#"} onClick={(evt) => { this.filterContainerStateHandler() }}
                                            className={view === ico.id ? 'active' : ico.id}
                                            key={ico.id}>
                                            <Icon name={ico.icon} tooltip={ico.label} theme="light"></Icon>
                                        </Link>
                                    )
                                    :
                                    (
                                        <Link to={ico.id === "edit/0" && model.isMyJs ? ('/' + mid + '/' + model.id + "/0" + urlFrag) : ('/' + mid + '/' + ico.id + urlFrag)}
                                            className={view === ico.id ? 'active' : ico.id}
                                            key={ico.id}>
                                            <Icon name={ico.icon} tooltip={ico.label} theme="light"></Icon>
                                        </Link>
                                    )
                            )
                })}
            </div>
        )
    }

    filterContainerStateHandler = () => {
        const val = !this.state.showFilterContainer;
        this.setState({
            showFilterContainer: val
        });
    }

    render() {

        const filterCSS = this.state.showFilterContainer ? "" : "hidden";
        const model = this.props.model ? this.props.model : {};

        let search = this.props.view === 'charts' ? null : getSearchText()
        let { count, comments } = this.props
        if (comments) {
            comments += comments === 1 ? ' comment' : ' comments'
        }

        if (this.state.delete) {
            return <Link to={'/' + this.props.entity + '/list'}></Link>
        }
        
        return (
            <div>
                <div className="cf-page-header">
                    <div className="page-title">
                        <span className="page-title-text">{this.props.title}</span>
                        {search ? <span className="cf-badge">Search "{search}"</span> : null}
                        {count ? <span className="cf-badge">{count}</span> : null}
                        {comments ? <span className="cf-badge">{comments}</span> : null}
                    </div>
                    <div>
                        {this.iconViews(this.props.entity, this.props.cardinality, this.props.id, this.props.view, this.props.model, this.props.buttonCalls, this.props.customButtons ? this.props.customButtons : null, this.props.history, this.props.isCustomPage ? this.props.isCustomPage : false)}
                    </div>
                    {/* <Toolbar entity={this.props.entity} id={this.props.id} filterContainerStateHandler={this.filterContainerStateHandler} /> */}
                </div>
                {model ? (
                    <SearchFilter
                        entity={this.props.entity}
                        id={this.props.id}
                        model={model}
                        display={filterCSS}
                        searchDataHandler={this.props.searchDataHandler}
                    />
                    // <div></div>
                )
                    : (<div></div>)
                }
            </div>
        )
    }
}

Header.propTypes = {
    model: PropTypes.object.isRequired,
    view: PropTypes.string,
    count: PropTypes.string,
    comments: PropTypes.number,
}
Header.defaultProps = {
    view: null,
    count: null,
    comments: null,
}