import React from 'react'
import Input from './Input'
import { cc as countryCode } from '../../utils/countryCodes'
import { parseNumber } from 'libphonenumber-js'
// import {dateFormat }from '../../config'

export default class Phone extends React.Component {

    static defaultProps = {
        id: "",
        value: "",
        countryCode: "",
        name: "",
        type: "phone",
        onChange: function (a, b) { }
    }
    constructor(props) {
        super(props);
        this.state = { countryCode: this.props.countryCode || parseNumber(this.props.value).country, number: this.props.value }
    }

    render() {
        const f = this.props;
        const opts = countryCode ? Object.keys(countryCode).map(item => createOption(item))
            : [createOption("loading...")]
        return (
            <div style={{ display: 'flex' }} className="input-group">
                <span style={{ flex: "2" }} className="input-group-addon icon-bold spntxt"><i className="fas fa-phone-alt"></i></span>
                <select onChange={(e) => this.setCC(e)}
                    id={f.id + 'CC'}
                    key={f.id + 'CC'}
                    className="form-control"
                    value={this.state.countryCode}
                    style={{ flex: '5', minWidth:'45px' }}
                >
                    <option />
                    {opts}
                </select>
                <Input ref={(input) => { this.nameInput = input; }} readOnly={this.state.countryCode ? false : true} style={{ flex: '18' }} {...this.props} change={(e) => this.setPhoneNo(e)} />
            </div>
        )
    }

    setCC = (e) => {
        this.setState({
            countryCode: e.target.value,
            number: ''
        });
        this.props.onChange({ CC: e.target.value, value: '' });
        this.nameInput.focus();
    }

    setPhoneNo = (e) => {
        this.setState({
            countryCode: this.state.countryCode,
            number: e.target.value
        });
        this.props.onChange({ CC: this.state.countryCode, value: e.target.value });
    }
}
function createOption(key) {
    return <option key={key} value={'' + key}>{key}</option>
}

