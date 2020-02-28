import React from 'react';
// import React, { Children } from 'react';
import { Route, Link } from "react-router-dom";
// import Icon from "react-crud-icons";
// import { i18n_nav } from '../../i18n/i18n';
import AppMenus from '../../AppMenus.js';
// import url from '../../utils/url.js'

// import models from '../../models/all_models'

import './Nav.scss';

export default class Nav extends React.Component {

    // constructor(props) {
    //     super(props);
    // }

    renderChild = (menuItem) => {
        if (menuItem.menus) {
            return (
                <li key={menuItem.id}>
                    <span>{menuItem.title}</span>
                    <ul>
                        {menuItem.menus.map(item => {
                            return this.renderChild(item)
                        })}
                    </ul>
                </li>
            );
        }
        else {
            return (
                <Route
                    path={'/' + menuItem.id}
                    exact={false}
                    children={({ match }) => (
                        <li className={match ? "active" : ""} >
                            <Link to={'/' + menuItem.id + '/' + (menuItem.defaultViewMany ? menuItem.defaultViewMany : 'list')}>{menuItem.title}</Link>
                            {/* {iconViews(menu.id, menu)} */}
                        </li>
                    )}
                />
            )
        }
    }

    render() {
        return (
            <nav className="Nav">
                <ul>
                    {AppMenus.map(item => this.renderChild(item))}
                </ul>
            </nav>
        );
    }
}



// let item2Group_Map = {}
// let sections = []
// let groupId

// AppMenus.forEach(menuGroup => {
//     groupId = menuGroup.id
//     sections.push(menuGroup)
//     menuGroup.menus.forEach(menuItem => {
//         item2Group_Map[menuItem.id] = groupId
//     })
// })

// const vwIcons = m => {
//     const mm = [
//         { id: '/edit/0', icon: 'add2' },
//         { id: '/list', icon: 'list' },
//         //{id: '/cards', icon:'th-large'},
//     ]
//     if (!m.noCharts) {
//         mm.push({ id: '/charts', icon: 'dashboard' })
//     }
//     return mm
// }

// const iconViews = (mid, f) => (
//     <div className="mIcons" >
//         {vwIcons(models[mid] || []).map(menu => f.url ? null :
//             <Link to={'/' + mid + menu.id} key={menu.id}>
//                 <Icon name={menu.icon} size="small" theme="none" />
//             </Link>)}
//     </div>
// )

// const MenuLink = ({ menu }) => {
//     return (
//         <Route
//             path={'/' + menu.id}
//             exact={false}
//             children={({ match }) => (
//                 <li className={match ? "active" : ""}>
//                     <Link to={'/' + menu.id + '/' + (menu.defaultViewMany ? menu.defaultViewMany : 'list')}>{menu.text}</Link>
//                     {iconViews(menu.id, menu)}
//                 </li>
//             )}
//         />
//     )
// }

// const MenuLinks = ({ menus }) => menus.map(menu => <MenuLink menu={menu} key={menu.id} />)

// export default class Nav extends React.Component {

//     render() {
//         let menus = []
//         sections.forEach(element => {
//             menus.push(element);
//         });

//         const Section = (section) => (
//             <li className={section.id === '1' ? 'active-li' : ''} key={section.id}>
//                 {section.title ? (
//                     <div>
//                         <img alt={section.title} src={'/svg/' + section.icon + '.svg'} className="cpnSvg" />
//                         {section.title}
//                     </div>
//                 ) : null}
//                 <ul className="nav-l2">
//                     <MenuLinks menus={section.menus} />
//                 </ul>
//             </li>
//         )

//         return (
//             <nav className="Nav">
//                 <ul>
//                     {menus.map(Section)}
//                 </ul>
//             </nav>
//         );
//     }
// }
