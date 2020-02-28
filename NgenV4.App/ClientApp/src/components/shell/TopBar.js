
import React from 'react'
import { Link } from 'react-router-dom'

import Icon from "react-crud-icons";
import logo from './rmsLogo.png'
import { i18n } from '../../i18n/i18n'

import { getModel } from '../../utils/moMa'

import './TopBar.scss'

const views = {
    new: { id: 'edit/0', label: i18n.i18n_actions.new, icon: 'add', n: 'x', marginLeft: 10, readonly: false },
    list: { id: 'list', label: i18n.i18n_actions.list, icon: 'list', n: 'n' },
    cards: { id: 'cards', label: i18n.i18n_actions.cards, icon: 'cards', n: 'n' },
    charts: { id: 'charts', label: i18n.i18n_actions.charts, icon: 'dashboard', n: 'n' },
    //stats: {id:'stats', label: i18n.i18n_actions.stats, icon:'equalizer', n:'n'},
}
const getViewsList = model => model.noCharts ? {
    list: views.list,
    cards: views.cards,
} : views;

const newEntity = m => i18n.i18n_actions.newEntity.replace('{0}', m.name)

// TODO: use Portal to nest toolbar
export default class TopBar extends React.Component {

    constructor(props) {
        super(props);
        this.showMenu = this.showMenu.bind(this);
    }

    showMenu = (e) => {
        const menu = document.getElementById("zenMenuMobile");
        menu.classList.add("MobileShow")
        menu.classList.remove("MobileHide")
    }

    render() {
        const path = window.location.pathname.split('/')
        if (path.length > 1) {
            if (path[0] === '') {
                path.splice(0, 1)
            }
        }
        const model = getModel(path[0])
        const e = '/' + path[0] + '/'
        return (
            <div>
                <header className="TopBar TopBar-Hidden" role="banner" id="TopBar" ref={(topbar) => this.topBar = topbar}>
                    <Link to='/'><img src={logo} className="tbLogo" alt="logo" /></Link>
                    <div className="user-icon">
                        <i className="fas fa-user-circle"></i>
                        <div className="settings-menu">
                            <Link to="#" className="user-info">
                                <div className="user-img"><i className="fas fa-user-circle"></i></div>
                                <div className="user-name">Vipin Sharma</div>
                            </Link>
                            <Link to="#" className="user-action-item">
                                <div className="user-action-item-icon"><i className="fas fa-user-circle"></i></div>
                                <div className="user-action-item-label">My profile</div>
                            </Link>
                            <Link to="#" className="user-action-item">
                                <div className="user-action-item-icon"><i className="fas fa-shield-alt"></i></div>
                                <div className="user-action-item-label">Security</div>
                            </Link>
                            <Link to="#" className="user-action-item">
                                <div className="user-action-item-icon"><i className="fas fa-sign-out-alt"></i></div>
                                <div className="user-action-item-label">Sign out</div>
                            </Link>
                            <Link className="user-action-item" to="/permission">
                                <div className="user-action-item-icon"><i className="fas fa-key"></i></div>
                                <div className="user-action-item-label">Permission</div>
                            </Link>
                        </div>
                    </div>
                </header>
                <header className="TopBar TopBarMobile-Hidden" role="banner" id="TopBar" ref={(topbar) => this.topBar = topbar}>
                    <div onClick={this.showMenu} className="topbar-menu-btn"><i className="fas fa-bars"></i></div>
                    <Link to='/'><img src={logo} className="tbLogo" alt="logo" /></Link>
                    <div className="user-icon">
                        <i className="fas fa-user-circle"></i>
                        <div className="settings-menu">
                            <div className="user-info">
                                <div className="user-img"><i className="fas fa-user-circle"></i></div>
                                <div className="user-name">Vipin Sharma</div>
                            </div>
                            <a className="user-action-item">
                                <div className="user-action-item-icon"><i className="fas fa-user-circle"></i></div>
                                <div className="user-action-item-label">My profile</div>
                            </a>
                            <a className="user-action-item">
                                <div className="user-action-item-icon"><i className="fas fa-shield-alt"></i></div>
                                <div className="user-action-item-label">Security</div>
                            </a>
                            <a className="user-action-item">
                                <div className="user-action-item-icon"><i className="fas fa-sign-out-alt"></i></div>
                                <div className="user-action-item-label">Sign out</div>
                            </a>
                            <Link className="user-action-item" to="/permission">
                                <div className="user-action-item-icon"><i className="fas fa-key"></i></div>
                                <div className="user-action-item-label">Permission</div>
                            </Link>
                        </div>
                    </div>
                </header>
            </div>
        )
    }

}