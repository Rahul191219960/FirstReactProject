import React, { Component } from 'react'

export default class SearchFilterRow extends Component {

    constructor(props) {
        super(props);
        this.state = {
            renderedOnce: false
        }
        this.setValues = this.setValues.bind(this);
    }

    onDelete = () => {
        this.props.deleteRow(this.props.data.rowid);
    }

    setValues = (e) => {
        this.setState({
            [e.currentTarget.name]: e.currentTarget.value
        })
    }

    changeRenderState = () => {
        if (this.state.renderedOnce == false) {
            this.setState({
                renderedOnce: true
            })
        }
    }

    render() {
        const val = this.state.renderedOnce ? this.state.value : this.props.data.value;
        this.changeRenderState();
        const makeAndOrBox = !(this.props.data.andOr == undefined || this.props.data.andOr == null);
        return (
            <tr id={this.props.data.rowID}>
                <td><input ref={(val) => { this.groupChecked = val }} type="checkbox" name="groupChecked" onChange={this.setValues}></input></td>
                <td>
                    {makeAndOrBox ? (
                        <i className="fas fa-times red" onClick={this.onDelete}></i>
                    ) : (
                            <div></div>
                        )}
                </td>
                <td>
                    {makeAndOrBox ? (
                        <select ref={(val) => this.andOr = val} type="select" className="form-control" name="andOr" onChange={this.setValues} style={{ width: `70px` }}>
                            <option>And</option>
                            <option>Or</option>
                        </select>
                    ) : (
                            <div></div>
                        )}
                </td>
                <td>
                    <select type="select" className="form-control" name="field" onChange={this.setValues} style={{ width: `200px` }}>
                        <option value="First Name">First Name</option>
                        <option value="Last Name">Last Name</option>
                        <option value="Company">Company</option>
                        <option value="Email">Email</option>
                        <option value="Category">Category</option>
                    </select>
                </td>
                <td>
                    <select type="select" className="form-control" name="operator" onChange={this.setValues} style={{ width: `200px` }}>
                        <option>starts with</option>
                        <option>equals</option>
                        <option>not equals</option>
                        <option>contains</option>
                        <option>does not contains</option>
                        <option>ends with</option>
                        <option>is empty</option>
                        <option>is not empty</option>
                    </select>
                </td>
                <td><input type="select" className="form-control" name="value" onChange={this.setValues} style={{ width: `200px` }} value={val}></input></td>
            </tr>
        )
    }
}
