import React, { Component } from 'react'
import './DoubleChevron.scss';

export default class DoubleChevron extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const showPin = this.props.showPinIcon;
        if (showPin) {
            return (
                <div className="zen-double-chevron">
                    <i className="fas fa-thumbtack"></i>
                </div>
            )
        } else {
            return (
                <div className="zen-double-chevron">
                    <i className="fas fa-chevron-left first"></i>
                    <i className="fas fa-chevron-left second"></i>
                </div>
            )
        }
    }
}
