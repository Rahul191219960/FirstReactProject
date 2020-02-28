// Evolutility-UI-React :: /widget/Panel.js

// Panel to group fields in views Edit and Browse (styled w/ Bootstrap).

// https://github.com/evoluteur/evolutility-ui-react
// (c) 2018 Olivier Giulieri

import React from 'react'
import PropTypes from 'prop-types'

import './Panel.scss'

export default class Panel extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			opened: true
		}
	}

	clickToggle = () => {
		this.setState({ opened: !this.state.opened })
	}

	render() {
		const props = this.props
		const className = props.className ? props.className : ''
		const title = props.title ? (
			<div className="panel-heading">
				{props.collapsible ? (
					<i className={'evol-title-toggle glyphicon glyphicon-chevron-' + (this.state.opened ? 'up' : 'down')}
						onClick={this.clickToggle}></i>
				) : null}
				<h3 className="panel-title">
					{props.title}
				</h3>
			</div>
		) : null
		const footer = props.footer ? (
			<div className="panel-footer push-down">
				<div className="footer-container">
					{props.buttons ? (
						<div className="cf-buttons panel-button">
							{props.buttons}
						</div>
					) : null}
					{props.footer.text ? (
						<div className="footer-text">
							{props.footer.text}
						</div>
					) : null}
				</div>
			</div>
		) : null;
		return (
			<div className={`evol-pnl ${className}`} style={props.style} style={{ width: props.width + '%', minHeight: props.height + 'vh' }}>
				<div className="panel panel-default">
					{title}
					{props.header ? (
						<div className="panel-heading panel-header">{props.header}</div>
					) : null}
					<fieldset style={{ display: (this.state.opened ? 'block' : 'none') }}>
						{props.children}
					</fieldset>
					{footer}
				</div>
			</div>
		)
	}

}

Panel.propTypes = {
	title: PropTypes.string,
	width: PropTypes.number,
	collapsible: PropTypes.any
}

Panel.defaultProps = {
	collapsible: false,
	width: 100,
}