import React, { Component } from 'react'
import Header from '../../shell/Header'
import Panel from '../../widgets/Panel';
import Field from '../../field/Field';

export default class Simualtion extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: {}
        }
    }

    fieldChange = (evt) => {
        let data = this.state.data;
        data[evt.target.id] = evt.target.value
        this.setState({
            data: data
        })
        console.log(this.state.data)
    }

    render() {

        const e = 'simulation';
        const title = 'Simulation';
        const cbs = {
            change: this.fieldChange
        }
        const data = this.state.data;

        return (
            <div>
                <Header
                    entity={e}
                    title={title}
                    model={{}}
                />

                <div className="cf-one-edit">
                    <div className="cf-pnls">
                        <Panel
                            key={"booking-characteristics"}
                            title={"Booking Characteristics"}>

                            <div className="cf-fset">

                                <Field
                                    key={"ServiceType"}
                                    ref={"ServiceType"}
                                    model={{
                                        "id": "ServiceType",
                                        "label": "Service Type",
                                        "defaultData": "Cargo",
                                        "maxLength": 10,
                                        "inMany": true,
                                        "width": 38,
                                        "type": "label",
                                        "value": 'Cargo',
                                        "minLength": 2,
                                        "toUpperCase": true
                                    }}
                                    callbacks={cbs}
                                    entity={e}
                                />

                                <Field
                                    key={"DemandType"}
                                    ref={"DemandType"}
                                    model={{
                                        "id": "DemandType",
                                        "type": "radiobuttonlist",
                                        "label": "Demand Type",
                                        "defaultValue": "0",
                                        "width": 38,
                                        "radioList": [
                                            { "value": "0", "display": "Free Sale" },
                                            { "value": "1", "display": "Allotment" }
                                        ],
                                    }}
                                    callbacks={cbs}
                                    entity={e}
                                />

                                <Field
                                    key={"OandDType"}
                                    ref={"OandDType"}
                                    model={{
                                        "id": "OandDType",
                                        "type": "radiobuttonlist",
                                        "label": "O&D Type",
                                        "defaultValue": "0",
                                        "width": 50,
                                        "radioList": [
                                            { "value": "0", "display": "All Route" },
                                            { "value": "1", "display": "Non-Stop" },
                                            { "value": "2", "display": "Multi-Leg" },
                                            { "value": "3", "display": "3-Segment" },
                                            { "value": "4", "display": "4+ Segment" }
                                        ],
                                    }}
                                    callbacks={cbs}
                                    entity={e}
                                />

                                <Field
                                    key={"ExcludeFlightNo"}
                                    ref={"ExcludeFlightNo"}
                                    model={{
                                        "id": "ExcludeFlightNo",
                                        "type": "multiselect",
                                        "label": "Exclude Flight No.",
                                        "width": 50,
                                        "name": "ExcludeFlightNo",
                                        "serverSide": false,
                                        "required": false,
                                        "autocompleteName": "contact_name",
                                        "defaultOptions": [{ "value": "1", "label": "Option 1" }, { "value": "2", "label": "Option 2" }]
                                    }}
                                    callbacks={cbs}
                                    entity={e}
                                />

                                <Field
                                    key={"OnlineOrigin"}
                                    ref={"OnlineOrigin"}
                                    model={{
                                        "id": "OnlineOrigin",
                                        "type": "autocomplete",
                                        "label": "Online Origin",
                                        "width": 25,
                                        "name": "OnlineOrigin",
                                        "serverSide": false,
                                        "required": false,
                                        "autocompleteName": "contact_name",
                                        "defaultOptions": [{ "value": "1", "label": "Option 1" }, { "value": "2", "label": "Option 2" }]
                                    }}
                                    callbacks={cbs}
                                    entity={e}
                                />

                                <Field
                                    key={"OnlineDestination"}
                                    ref={"OnlineDestination"}
                                    model={{
                                        "id": "OnlineDestination",
                                        "type": "autocomplete",
                                        "label": "Online Destination",
                                        "width": 25,
                                        "name": "OnlineDestination",
                                        "serverSide": false,
                                        "required": false,
                                        "autocompleteName": "contact_name",
                                        "defaultOptions": [{ "value": "1", "label": "Option 1" }, { "value": "2", "label": "Option 2" }]
                                    }}
                                    callbacks={cbs}
                                    entity={e}
                                />

                                <Field
                                    key={"Via"}
                                    ref={"Via"}
                                    model={{
                                        "id": "Via",
                                        "type": "autocomplete",
                                        "label": "Via",
                                        "width": 50,
                                        "name": "Via",
                                        "serverSide": false,
                                        "required": false,
                                        "autocompleteName": "contact_name",
                                        "defaultOptions": [{ "value": "1", "label": "Option 1" }, { "value": "2", "label": "Option 2" }]
                                    }}
                                    callbacks={cbs}
                                    entity={e}
                                />

                            </div>

                        </Panel>

                        <Panel
                            key={"product-characteristics"}
                            title={"Product Characteristics"}
                            width={50}>

                            <div className="cf-fset">

                                <Field
                                    key={"Pieces"}
                                    ref={"Pieces"}
                                    model={{
                                        "id": "Pieces",
                                        "label": "Pieces",
                                        "maxLength": 10,
                                        "inMany": true,
                                        "width": 50,
                                        "type": "text",
                                        "minLength": 2,
                                        "toUpperCase": true
                                    }}
                                    callbacks={cbs}
                                    entity={e}
                                    value={data["Pieces"]}
                                />

                                <Field
                                    key={"GrossWeight"}
                                    ref={"GrossWeight"}
                                    model={{
                                        "id": "GrossWeight",
                                        "label": "Gross Weight (KG)",
                                        "maxLength": 25,
                                        "inMany": true,
                                        "width": 50,
                                        "type": "text",
                                        "minLength": 2,
                                        "toUpperCase": true
                                    }}
                                    callbacks={cbs}
                                    entity={e}
                                    value={data["GrossWeight"]}
                                />

                                <Field
                                    key={"Volume"}
                                    ref={"Volume"}
                                    model={{
                                        "id": "Volume",
                                        "label": "Volume (m3)",
                                        "maxLength": 25,
                                        "inMany": true,
                                        "width": 33,
                                        "type": "text",
                                        "minLength": 2,
                                        "toUpperCase": true
                                    }}
                                    callbacks={cbs}
                                    entity={e}
                                    value={data["Volume"]}
                                />

                                <Field
                                    key={"VolumeWeight"}
                                    ref={"VolumeWeight"}
                                    model={{
                                        "id": "VolumeWeight",
                                        "label": "Volume Weight (KG)",
                                        "maxLength": 25,
                                        "inMany": true,
                                        "width": 33,
                                        "type": "text",
                                        "minLength": 2,
                                        "toUpperCase": true
                                    }}
                                    callbacks={cbs}
                                    entity={e}
                                    value={data["VolumeWeight"]}
                                />

                                <Field
                                    key={"ChargeableWeight"}
                                    ref={"ChargeableWeight"}
                                    model={{
                                        "id": "ChargeableWeight",
                                        "label": "Chargeable Weight (KG)",
                                        "maxLength": 25,
                                        "inMany": true,
                                        "width": 34,
                                        "type": "text",
                                        "minLength": 2,
                                        "toUpperCase": true
                                    }}
                                    callbacks={cbs}
                                    entity={e}
                                    value={data["ChargeableWeight"]}
                                />

                            </div>

                        </Panel>

                        <Panel
                            key={"demand-category-selection"}
                            title={"Demand Category Selection"}
                            width={50}>

                            <div className="cf-fset">

                                <Field
                                    key={"DemandCategory"}
                                    ref={"DemandCategory"}
                                    model={{
                                        "id": "DemandCategory",
                                        "type": "autocomplete",
                                        "label": "Demand Category",
                                        "width": 50,
                                        "name": "DemandCategory",
                                        "serverSide": false,
                                        "required": false,
                                        "autocompleteName": "contact_name",
                                        "defaultOptions": [{ "value": "1", "label": "Option 1" }, { "value": "2", "label": "Option 2" }]
                                    }}
                                    callbacks={cbs}
                                    entity={e}
                                />

                            </div>

                        </Panel>

                        <Panel
                            key={"simulation-period"}
                            title={"Simulation Period"} >

                            <div className="cf-fset">

                                <Field
                                    key={"BookingDate"}
                                    ref={"BookingDate"}
                                    model={{
                                        "id": "BookingDate",
                                        "label": "Booking Date",
                                        "type": "date",
                                        "maxLength": 7,
                                        "inMany": true,
                                        "DaysBack": 1,
                                        "DaysForward": 2,
                                        "width": 25,
                                        "required": true
                                    }}
                                    callbacks={cbs}
                                    entity={e}
                                    value={data["BookingDate"]}
                                />

                                <Field
                                    key={"SimulationDate"}
                                    ref={"SimulationDate"}
                                    model={{
                                        "id": "SimulationDate",
                                        "label": "Simulation Date",
                                        "type": "date",
                                        "maxLength": 7,
                                        "inMany": true,
                                        "DaysBack": 1,
                                        "DaysForward": 2,
                                        "width": 75,
                                        "required": true
                                    }}
                                    callbacks={cbs}
                                    entity={e}
                                    value={data["BookingDate"]}
                                />

                            </div>

                        </Panel>

                    </div>
                </div>
            </div>
        )
    }
}
