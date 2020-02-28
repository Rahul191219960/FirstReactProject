import React from 'react';
// import { Link } from 'react-router-dom'
// import DemosList from './DemosList.js'


export default class Demo extends React.PureComponent {

    componentDidMount() {
        document.title = 'Evolutility';
        window.scrollTo(0, 0);
    }

    render() {
        return (
            <div className="evo-demo">
                <h2>Welcome user</h2>
                <p>Click on an item on the navigation menu to see that particular page.</p>
            </div>
        )
    }
}
