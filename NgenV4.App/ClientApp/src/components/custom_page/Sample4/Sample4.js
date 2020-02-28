import React from 'react'
import PopUp from '../../field/PopUp';
import Panel from '../../widgets/Panel';
import Field from '../../field/Field';
export default class Sample4 extends React.Component {

    fieldChange = (e) => {
        
    }

    render() {
        return (
            <PopUp
                show={true}
                style={{
                    'min-width': '30%',
                    'min-height': '35%'
                }}
                id={"samplePopUp"}
            >
                <Panel
                    key={"sample4"}
                    title={"Static Pop Up"}
                    width={100}
                >
                    <div className="cf-fset">
                        <Field
                            ref={"country"}
                            model={{
                                "id": "country",
                                "type": "autocomplete",
                                "label": "Country",
                                "width": 100,
                                "name": "country",
                                "serverSide": true,
                                "required": true,
                                "autocompleteName": "todo_country"
                            }}
                            // value={{ label: 'India', value: '1' }}
                            callbacks={{ change: this.fieldChange }}
                        />
                    </div>
                </Panel>
            </PopUp>
        );
    }
}