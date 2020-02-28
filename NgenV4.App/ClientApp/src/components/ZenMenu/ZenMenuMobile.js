import React, { Component } from 'react'
import './ZenMenuMobile.scss';
import DoubleChevron from './DoubleChevron'
import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';
import { Link } from 'react-router-dom';

export default class ZenMenuMobile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sidebarActive: true
        }

        this.zenMenuToggle = this.zenMenuToggle.bind(this);
        this.anchorOnClick = this.anchorOnClick.bind(this);
    }

    componentDidMount() {
        this.closeAllMenu();
    }

    componentDidUpdate() {
        this.closeAllMenu();
    }

    closeAllMenu = () => {
        var innerLists = document.querySelectorAll("li .inner");
        for (var i = 0; i < innerLists.length; i++) {
            innerLists[i].classList.add("slideUp");
        }
    }

    zenMenuToggle = (e) => {
        const menu = document.getElementById("zenMenuMobile");
        menu.classList.remove("MobileShow")
        menu.classList.add("MobileHide")
    }

    anchorOnClick = (e) => {

        //When menu is closed
        if (e.currentTarget.nextSibling.classList.contains("show-menu")) {
            var allArrows = e.currentTarget.parentElement.parentElement.getElementsByClassName("fa-chevron-right");
            for (var i = 0; i < allArrows.length; i++) {
                allArrows[i].classList.add("rotate-0-deg");
                allArrows[i].classList.remove("rotate-90-deg");
            }

            try {
                var currentarrow = e.currentTarget.getElementsByClassName("rotate-0-deg").item(0);
                currentarrow.classList.add("rotate-0-deg");
                currentarrow.classList.remove("rotate-90-deg");
            } catch (exp) {
            }

            e.currentTarget.nextSibling.classList.remove("show-menu")
            let innerLists = e.currentTarget.parentElement.parentElement.querySelectorAll("li .inner");
            for (let i = 0; i < innerLists.length; i++) {
                innerLists[i].classList.remove("show-menu");
                innerLists[i].classList.add("slideUp");
            }
            e.currentTarget.nextSibling.classList.add("slideUp")
        }

        //When menu is opened
        else {
            // To Turn up all the arrows
            let allArrows = e.currentTarget.parentElement.parentElement.getElementsByClassName("fa-chevron-right");
            for (var i = 0; i < allArrows.length; i++) {
                allArrows[i].classList.add("rotate-0-deg");
                allArrows[i].classList.remove("rotate-90-deg");
            }

            try {
                var arrow = e.currentTarget.getElementsByClassName("rotate-0-deg").item(0);
                arrow.classList.add("rotate-90-deg");
                arrow.classList.remove("rotate-0-deg");
            } catch (exp) {
            }

            let innerLists = e.currentTarget.parentElement.parentElement.querySelectorAll("li .inner");
            for (let i = 0; i < innerLists.length; i++) {
                innerLists[i].classList.remove("show-menu");
                innerLists[i].classList.add("slideUp");
            }
            if (e.currentTarget.nextSibling.classList.contains("show-menu")) {
                e.currentTarget.nextSibling.classList.remove("show-menu")
            } else {
                e.currentTarget.nextSibling.classList.add("show-menu")
            }

            if (e.currentTarget.nextSibling.classList.contains("slideUp")) {
                e.currentTarget.nextSibling.classList.remove("slideUp")
            } else {
                e.currentTarget.nextSibling.classList.add("slideUp")
            }
        }
    }

    createChild = (item, paddingLevel, invisibleClass) => {
        const paddingValue = paddingLevel * 10;
        if (item.label) {
            return (
                <li className="zen-category-content" key={item.listKey}>

                    {item.list ? (
                        <Link className="toggle" onClick={this.anchorOnClick} to="#">
                            <div className="zen-hoverable">
                                <div className="zen-menu-item">
                                    <div style={{ width: `${paddingValue}px` }}></div>
                                    <div className={`zen-menu-item-icon ${invisibleClass}`}>-</div>
                                    <div className={`zen-menu-item-label ${invisibleClass}`}>{item.label}</div>
                                    {item.list ? (
                                        <div className={`zen-menu-item-arrow ${invisibleClass}`}><i className="fas fa-chevron-right"></i></div>
                                    ) : (
                                            <div></div>
                                        )}
                                </div>
                            </div>
                        </Link>
                    ) : (
                            <Link className="toggle" onClick={this.anchorOnClick} to={item.to}>
                                <div className="zen-hoverable">
                                    <div className="zen-menu-item">
                                        <div style={{ width: `${paddingValue}px` }}></div>
                                        <div className={`zen-menu-item-icon ${invisibleClass}`}>-</div>
                                        <div className={`zen-menu-item-label ${invisibleClass}`}>{item.label}</div>
                                        {item.list ? (
                                            <div className={`zen-menu-item-arrow ${invisibleClass}`}><i className="fas fa-chevron-right"></i></div>
                                        ) : (
                                                <div></div>
                                            )}
                                    </div>
                                </div>
                            </Link>
                        )
                    }

                    {
                        item.list ? (
                            <ul className="inner">
                                {item.list.map(child => {
                                    return this.createChild(child, paddingLevel + 1, invisibleClass);
                                })}
                            </ul>
                        ) : (
                                <div></div>
                            )
                    }
                </li >
            );
        } else {
            return null;
        }
    }

    createChildWithIcon = (item, invisibleClass) => {
        const defaultIcon = "fas fa-sitemap";
        const itemIcon = item.icon ? item.icon : defaultIcon;
        const paddingLevel = 1;
        if (item.label) {
            return (
                <li className="zen-category-content" key={item.listKey}>
                    {item.list ? (
                        <Link className="toggle" onClick={this.anchorOnClick} to="#">
                            <div className="zen-hoverable">
                                <div className="zen-menu-item">
                                    <div className="zen-menu-item-icon"><i className={itemIcon}></i></div>
                                    <div className={`zen-menu-item-label ${invisibleClass}`}>{item.label}</div>
                                    {item.list ? (
                                        <div className={`zen-menu-item-arrow ${invisibleClass}`}><i className="fas fa-chevron-right"></i></div>
                                    ) : (
                                            <div></div>
                                        )}
                                </div>
                            </div>
                        </Link>
                    ) : (
                            <Link className="toggle" onClick={this.anchorOnClick} to={item.to}>
                                <div className="zen-hoverable">
                                    <div className="zen-menu-item">
                                        <div className="zen-menu-item-icon"><i className={itemIcon}></i></div>
                                        <div className={`zen-menu-item-label ${invisibleClass}`}>{item.label}</div>
                                        {item.list ? (
                                            <div className={`zen-menu-item-arrow ${invisibleClass}`}><i className="fas fa-chevron-right"></i></div>
                                        ) : (
                                                <div></div>
                                            )}
                                    </div>
                                </div>
                            </Link>
                        )
                    }

                    {item.list ? (
                        <ul className="inner">
                            {item.list.map(child => {
                                return this.createChild(child, paddingLevel, invisibleClass);
                            })}
                        </ul>
                    ) : (
                            <div></div>
                        )}
                </li>
            );
        } else {
            return null;
        }
    }

    createCategory = (item, status, invisibleClass) => {
        if (item.categoryHeader != null) {
            return (
                <li className="zen-category" key={item.listKey}>
                    <div className="zen-category-header">{status ? <div className="zen-menu-header-icon"><i className="fas fa-ellipsis-h"></i></div> : <span>{item.categoryHeader}</span>}</div>
                    {item.list ?
                        (
                            <ul>
                                {item.list.map(child => {
                                    return this.createChildWithIcon(child, invisibleClass);
                                })}
                            </ul>
                        ) : (
                            <div></div>
                        )}
                </li>
            )
        } else {
            return null;
        }
    }

    render() {
        let status = this.state.partialSidebar;
        let containerClass = status ? 'partial-sidebar' : '';
        let hiddenClass = status ? 'hidden' : '';
        let invisibleClass = status ? 'invisible' : '';
        let rotateClass = status ? 'rotate-180' : '';
        let partialSidebarActive = this.state.partialSidebarActive;

        //Create scroll bar only in full layout
        return (
            <div id="zenMenuMobile" className={`MobileHide zen-container-mobile ${containerClass}`}>
                <SimpleBar style={{ maxHeight: `100%` }}>
                    <div className="zen-menu-header">
                        <div className={`zen-brand ${hiddenClass}`}><span className="zen-menu-title">{this.props.appTitle}</span></div>
                        <div className={`zen-tools ${rotateClass}`} onClick={this.zenMenuToggle}>
                            <DoubleChevron showPinIcon={partialSidebarActive} />
                        </div>
                    </div>

                    <div className="zen-navigation-container">
                        <ul>
                            {this.props.menuData.map(item => {
                                return this.createCategory(item, status, invisibleClass);
                            })}
                        </ul>
                    </div>
                </SimpleBar>
            </div>
        )
    }
}
