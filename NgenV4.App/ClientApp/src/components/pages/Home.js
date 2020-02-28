import React from 'react';
// import pkg from '../../../package.json';
import { modelIds, getModel } from '../../utils/moMa'
// import DemosList from './DemosList.js'
import {  Redirect } from 'react-router-dom'
// import { Link, Redirect } from 'react-router-dom'

import './Home.scss'

const orgIcons = []
const musicIcons = []

modelIds.forEach(mid => {
    const m = getModel(mid)
    if (m.active) {
        if (m.world === 'organizer' || m.world === 'music') {
            const menuItem = {
                id: m.id,
                oid: m.oid,
                world: m.world,
                icon: 'pix/' + m.icon,
                label: m.title || m.label,
            }
            if (m.world === 'organizer') {
                orgIcons.push(menuItem)
            } else if (m.world === 'music') {
                musicIcons.push(menuItem)
            }
        }
    }
})

export default class Home extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            loggedIn: false
        }
    }

    componentWillMount() {
        const token = localStorage.getItem("token");
        var status = true;
        if (token == null) {
            status = false;
        }
        this.setState({
            loggedIn: status
        });
    }

    componentDidMount() {
        document.title = 'CargoFlash';
        window.scrollTo(0, 0);
    }

    render() {

        if (this.state.loggedIn === false) {
            return <Redirect to="/login" />
        }
        else {
            return (
                <div className="cf-home">
                    <h2>Welcome user</h2>
                    <p>Click on an item on the navigation menu to see that particular page.</p>
                </div>
            );
        }
    }
}
