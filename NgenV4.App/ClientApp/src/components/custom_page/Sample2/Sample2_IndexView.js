import React, { Component } from 'react'
import List from '../../views/many/List'
import Many from '../../views/many/many'
import gridModel from './Sample_Model'

export default class Sample2_IndexView extends Component {
    render() {
        return (
            <div>
                <List isCustomPage={true} gridModel={gridModel}></List>
            </div>
        )
    }
}
