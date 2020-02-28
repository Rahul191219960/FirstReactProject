import React from 'react'
import { Link } from 'react-router-dom'

import { i18n } from '../../../i18n/i18n'
import { dataTitle, fieldId2Field,fieldTypes as ft } from '../../../utils/dico'

import OneRead from './one-read'
import Alert from '../../widgets/Alert'
import Field from '../../field/Field'
import Panel from '../../widgets/Panel'
import List from '../many/List'
import Spinner from '../../shell/Spinner'
import Header from '../../shell/Header'

export default class Browse extends OneRead {

  viewId = 'browse'

  componentDidMount() {
    
    const formAction = this.props.match.url.split('/')[this.props.match.url.split('/').length - 2];
    if (formAction.toUpperCase() == "BROWSE") {
      this.setState({
        customButtons: ['edit']
      })
    } else if (formAction.toUpperCase() == "DELETE") {
      this.setState({
        customButtons: ['delete']
      })
    }
  }

  render() {
    const { id = 0, entity = null } = this.props.match.params
    const linkEdit = '/' + entity + '/edit/' + id,
      linkList = '/' + entity + '/list',
      m = this.model,
      data = this.state.data || {},
      title = dataTitle(m, data, false);

    function fnFieldReadOnly(f) {
      if (f) {
        const isLOV = f.type === 'lov';
        const attr = isLOV ? f.id + '_txt' : f.id
        return (
          <Field
            key={f.id}
            model={f}
            value={f.type.toLowerCase() === ft.autocomplete ? { value: data[f.id + 'Key'], label: data[f.id + 'Text'] } : data[attr]}
            valueId={isLOV ? data[f.id] : null}
            icon={isLOV ? data[f.id + '_icon'] : null}
            readOnly={true}
            entity={entity}
          />
        )
      }
      return null
    }

    if (!m || m === -2) {
      return <Alert title="Error" message={i18n.i18n_errors.badEntity.replace('{0}', entity)} />
    }
    else if (m === -1) {
      return (
        <div>
          return <Spinner></Spinner>
        </div>
      );
    }

    // if(!m){
    //   return <Alert title="Error" message={i18n.i18n_errors.badEntity.replace('{0}', entity)}/>
    // }else if(this.state.loading){
    //   return <Spinner></Spinner>
    // }
    else {
      document.title = title
      return (
        <div className="evolutility">
          <Header {...this.props.match.params} title={title}
            model={m}
            comments={data.nb_comments} count={null}
            cardinality='custom' view={this.viewId}
            history={this.props.history}
            customButtons={this.state.customButtons}
          />

          <div className="cf-one-edit">

            {this.state.error ? (
              <Alert title="Error" message={this.state.error.message} />
            ) : (
                <div className="cf-pnls">

                  {m.groups ? (
                    m.groups.map(function (g, idx) {
                      const groupFields = fieldId2Field(g.fields, m.fieldsH)
                      return (
                        <Panel key={g.id || ('g' + idx)}
                          title={g.label || g.title || ''}
                          header={g.header}
                          footer={g.footer}
                          width={g.width}>
                          <div className="cf-fset">
                            {groupFields.map(fnFieldReadOnly)}
                          </div>
                        </Panel>
                      )
                    })
                  ) : (
                      <Panel key="pOne" title={title}>
                        <div className="cf-fset">
                          {m.fields.map(fnFieldReadOnly)}
                        </div>
                      </Panel>
                    )}

                  {m.collections ? (
                    m.collections.map((c, idx) => {
                      return (
                        <Panel title={c.title} key={'collec_' + c.id} collapsible={true}
                          header={c.header}
                          footer={c.footer}>
                          <List key={'collec' + idx}
                            isNested={true}
                            match={this.props.match}
                            paramsCollec={c}
                            style={{ width: '100%' }}
                            location={this.props.location}
                          />
                        </Panel>
                      )
                    })
                  ) : null}

                  <Panel key="formButtons">
                    <div className="cf-buttons">
                      <Link className="btn btn-default" to={linkList}>
                        <i className="glyphicon glyphicon-remove"></i> {i18n.i18n_actions.cancel}
                      </Link>
                      <Link to={linkEdit} className="btn btn-primary">
                        <i className="glyphicon glyphicon-edit"></i> {i18n.i18n_actions.edit}
                      </Link>
                    </div>
                  </Panel>

                </div>
              )
            }
          </div>
        </div>
      )
    }
  }

}
