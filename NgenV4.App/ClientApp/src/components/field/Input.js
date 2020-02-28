import React from 'react'

export default class Input extends React.Component {
    static defaultProps = {
        value: "",
        change: function () { },
        fieldKeyPress: function () { },
        fieldOnBlur: function () { },
        focus: function () { },
        keyUp: function () { },
        keyDown: function () { }
    }
    // eslint-disable-next-line no-useless-constructor
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <input
                ref={this.props.id}
                type="text"
                autoComplete="off"
                id={this.props.id}
                value={this.props.value}
                className="form-control"
                data-touppercase={this.props.toUpperCase}
                data-texttype={this.props.type}
                style={this.props.style}
                readOnly={this.props.readOnly}
                onChange={this.props.change}
                onKeyPress={this.props.fieldKeyPress}
                onBlur={this.props.fieldOnBlur}
                onFocus={this.props.focus}
                onKeyUp={this.props.keyUp}
                onKeyDown={this.props.keyDown}
            />
        )
    }

    focus = () => {
        this.refs[this.props.id].focus();
    }
}




// import React from 'react'

// export default class Input extends React.Component {
//     static defaultProps = {
//         value: "",
//         change: function () { },
//         fieldKeyPress: function () { },
//         fieldOnBlur: function () { },
//         focus: function () { },
//         keyUp: function () { },
//         keyDown: function () { }
//     }
//     // eslint-disable-next-line no-useless-constructor
//     constructor(props) {
//         super(props);
//     }

//     render() {
//         return (
//             <input
//                 ref={this.props.id}
//                 type="text"
//                 autoComplete="off"
//                 id={this.props.id}
//                 value={this.props.value}
//                 className={`form-control ${this.props.invalid ? 'vip-invalid' : ''}`}
//                 data-touppercase={this.props.toUpperCase}
//                 data-texttype={this.props.type}
//                 style={this.props.style}
//                 readOnly={this.props.readOnly}
//                 onChange={this.props.change}
//                 onKeyPress={this.props.fieldKeyPress}
//                 onBlur={this.props.fieldOnBlur}
//                 onFocus={this.props.focus}
//                 onKeyUp={this.props.keyUp}
//                 onKeyDown={this.props.keyDown}
//             />
//         )
//     }

//     focus = () => {
//         this.refs[this.props.id].focus();
//     }
// }
