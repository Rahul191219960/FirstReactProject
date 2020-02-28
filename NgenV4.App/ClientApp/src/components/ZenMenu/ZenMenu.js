import React, { Component } from 'react'
import './ZenMenu.scss'
import './variables.scss'
import DoubleChevron from './DoubleChevron'
import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';
import { Link } from 'react-router-dom';
import { i18nApp } from '../../i18n/i18nApp'

export default class ZenMenu extends Component {

    constructor(props) {
        super(props);
        this.state = {
            partialSidebar: false,
            partialSidebarActive: false
        }

        this.zenMenuToggle = this.zenMenuToggle.bind(this);
        this.mouseOverOnPartialSidebar = this.mouseOverOnPartialSidebar.bind(this);
        this.mouseLeaveOnPartialSidebar = this.mouseLeaveOnPartialSidebar.bind(this);
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
        // const status = this.state.partialSidebar;
        const pageContent = document.getElementById("pageContent");
        // const pageContentWrapper = document.getElementById("pageContentWrapper");

        this.setState(prevState => {
            return {
                partialSidebar: !prevState.partialSidebar
            }
        });

        if (this.state.partialSidebarActive) {
            this.setState({
                partialSidebarActive: false,
                partialSidebar: false
            })
            //Partial sidebar is getting in-active so now shift the page content to right
            pageContent.classList.remove("partial-sidebar-active");
        }
        else {
            //Partial sidebar is getting active so now shift the page content to left
            pageContent.classList.add("partial-sidebar-active");
        }
    }

    mouseOverOnPartialSidebar = (e) => {
        this.setState({
            partialSidebar: false,
            partialSidebarActive: true
        });
    }

    mouseLeaveOnPartialSidebar = (e) => {
        this.setState({
            partialSidebar: true
        });
    }

    anchorOnClick = (e) => {

        //When menu is closed
        if (e.currentTarget.nextSibling.classList.contains("show-menu")) {
            let allArrows = e.currentTarget.parentElement.parentElement.getElementsByClassName("fa-chevron-right");
            for (let i = 0; i < allArrows.length; i++) {
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
            for (let i = 0; i < allArrows.length; i++) {
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
        if (item.appKey) {
            return (
                <li className="zen-category-content" key={item.listKey}>

                    {item.list ? (
                        <Link className="toggle" onClick={this.anchorOnClick} to="#">
                            <div className="zen-hoverable">
                                <div className="zen-menu-item">
                                    <div style={{ width: `${paddingValue}px` }}></div>
                                    <div className={`zen-menu-item-icon ${invisibleClass}`}>-</div>
                                    <div className={`zen-menu-item-label ${invisibleClass}`}>{i18nApp[item.appKey] ? i18nApp[item.appKey] : ''}</div>
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
                                        <div className={`zen-menu-item-label ${invisibleClass}`}>{i18nApp[item.appKey] ? i18nApp[item.appKey] : ''}</div>
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
        if (item.appKey) {
            return (
                <li className="zen-category-content" key={item.listKey}>
                    {item.list ? (
                        <Link className="toggle" onClick={this.anchorOnClick} to="#">
                            <div className="zen-hoverable">
                                <div className="zen-menu-item">
                                    <div className="zen-menu-item-icon"><i className={itemIcon}></i></div>
                                    <div className={`zen-menu-item-label ${invisibleClass}`}>{i18nApp[item.appKey] ? i18nApp[item.appKey] : ''}</div>
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
                                        <div className={`zen-menu-item-label ${invisibleClass}`}>{i18nApp[item.appKey] ? i18nApp[item.appKey] : ''}</div>
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
                    <div className="zen-category-header">{status ? <div className="zen-menu-header-icon"><i className="fas fa-ellipsis-h"></i></div> : <span>{i18nApp[item.categoryHeader] ? i18nApp[item.categoryHeader] : ''}</span>}</div>
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
        if (status) {
            return (
                <div onMouseEnter={this.mouseOverOnPartialSidebar} onMouseLeave={this.mouseLeaveOnPartialSidebar} className={`zen-container ${containerClass}`}>
                    <div className="zen-menu-header">
                        <div className={`zen-brand ${hiddenClass}`}><span className="zen-menu-title">{this.props.appTitle}</span></div>
                        <div className={`zen-tools ${rotateClass}`} onClick={this.zenMenuToggle}><DoubleChevron /></div>
                    </div>

                    <div className="zen-navigation-container">
                        <ul>
                            {this.props.menuData.map(item => {
                                return this.createCategory(item, status, invisibleClass);
                            })}
                        </ul>
                    </div>
                </div>
            )
        } else {
            return (
                <div onMouseLeave={partialSidebarActive ? this.mouseLeaveOnPartialSidebar : () => { }} className={`zen-container ${containerClass}`}>
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
}