import { fieldTypes } from '../../../utils/dico';
import { i18n } from '../../../i18n/i18n';

export const GridOperators = {
    [fieldTypes.text]: [
        i18n.i18n_CF_GridSearch.gridOperatorLabels.startsWith,
        i18n.i18n_CF_GridSearch.gridOperatorLabels.endsWith,
        i18n.i18n_CF_GridSearch.gridOperatorLabels.equals,
        i18n.i18n_CF_GridSearch.gridOperatorLabels.notEquals,
        i18n.i18n_CF_GridSearch.gridOperatorLabels.contains,
        i18n.i18n_CF_GridSearch.gridOperatorLabels.notContains,
        i18n.i18n_CF_GridSearch.gridOperatorLabels.empty,
        i18n.i18n_CF_GridSearch.gridOperatorLabels.notEmpty
    ],
    [fieldTypes.multicontrol]: [
        i18n.i18n_CF_GridSearch.gridOperatorLabels.startsWith,
        i18n.i18n_CF_GridSearch.gridOperatorLabels.endsWith,
        i18n.i18n_CF_GridSearch.gridOperatorLabels.equals,
        i18n.i18n_CF_GridSearch.gridOperatorLabels.notEquals,
        i18n.i18n_CF_GridSearch.gridOperatorLabels.contains,
        i18n.i18n_CF_GridSearch.gridOperatorLabels.notContains,
        i18n.i18n_CF_GridSearch.gridOperatorLabels.empty,
        i18n.i18n_CF_GridSearch.gridOperatorLabels.notEmpty
    ],
    [fieldTypes.textml]: [
        i18n.i18n_CF_GridSearch.gridOperatorLabels.startsWith,
        i18n.i18n_CF_GridSearch.gridOperatorLabels.endsWith,
        i18n.i18n_CF_GridSearch.gridOperatorLabels.equals,
        i18n.i18n_CF_GridSearch.gridOperatorLabels.notEquals,
        i18n.i18n_CF_GridSearch.gridOperatorLabels.contains,
        i18n.i18n_CF_GridSearch.gridOperatorLabels.notContains,
        i18n.i18n_CF_GridSearch.gridOperatorLabels.empty,
        i18n.i18n_CF_GridSearch.gridOperatorLabels.notEmpty
    ],
    [fieldTypes.bool]: [
        i18n.i18n_CF_GridSearch.gridOperatorLabels.equals,
        i18n.i18n_CF_GridSearch.gridOperatorLabels.notEquals,
        i18n.i18n_CF_GridSearch.gridOperatorLabels.empty,
        i18n.i18n_CF_GridSearch.gridOperatorLabels.notEmpty
    ],
    [fieldTypes.int]: [
        i18n.i18n_CF_GridSearch.gridOperatorLabels.equals,
        i18n.i18n_CF_GridSearch.gridOperatorLabels.notEquals,
        i18n.i18n_CF_GridSearch.gridOperatorLabels.gt,
        i18n.i18n_CF_GridSearch.gridOperatorLabels.gteq,
        i18n.i18n_CF_GridSearch.gridOperatorLabels.lt,
        i18n.i18n_CF_GridSearch.gridOperatorLabels.lteq,
        i18n.i18n_CF_GridSearch.gridOperatorLabels.empty,
        i18n.i18n_CF_GridSearch.gridOperatorLabels.notEmpty
    ],
    [fieldTypes.email]: [
        i18n.i18n_CF_GridSearch.gridOperatorLabels.startsWith,
        i18n.i18n_CF_GridSearch.gridOperatorLabels.endsWith,
        i18n.i18n_CF_GridSearch.gridOperatorLabels.equals,
        i18n.i18n_CF_GridSearch.gridOperatorLabels.notEquals,
        i18n.i18n_CF_GridSearch.gridOperatorLabels.contains,
        i18n.i18n_CF_GridSearch.gridOperatorLabels.notContains,
        i18n.i18n_CF_GridSearch.gridOperatorLabels.empty,
        i18n.i18n_CF_GridSearch.gridOperatorLabels.notEmpty
    ],
    [fieldTypes.lov]: [
        i18n.i18n_CF_GridSearch.gridOperatorLabels.startsWith,
        i18n.i18n_CF_GridSearch.gridOperatorLabels.endsWith,
        i18n.i18n_CF_GridSearch.gridOperatorLabels.equals,
        i18n.i18n_CF_GridSearch.gridOperatorLabels.notEquals,
        i18n.i18n_CF_GridSearch.gridOperatorLabels.contains,
        i18n.i18n_CF_GridSearch.gridOperatorLabels.notContains,
        i18n.i18n_CF_GridSearch.gridOperatorLabels.empty,
        i18n.i18n_CF_GridSearch.gridOperatorLabels.notEmpty
    ],
    [fieldTypes.radiobuttonlist]: [
        i18n.i18n_CF_GridSearch.gridOperatorLabels.equals,
        i18n.i18n_CF_GridSearch.gridOperatorLabels.notEquals
    ],
    [fieldTypes.dec]: [
        i18n.i18n_CF_GridSearch.gridOperatorLabels.equals,
        i18n.i18n_CF_GridSearch.gridOperatorLabels.notEquals,
        i18n.i18n_CF_GridSearch.gridOperatorLabels.gt,
        i18n.i18n_CF_GridSearch.gridOperatorLabels.gteq,
        i18n.i18n_CF_GridSearch.gridOperatorLabels.lt,
        i18n.i18n_CF_GridSearch.gridOperatorLabels.lteq,
        i18n.i18n_CF_GridSearch.gridOperatorLabels.empty,
        i18n.i18n_CF_GridSearch.gridOperatorLabels.notEmpty
    ],
    [fieldTypes.checkboxlist]: [
        i18n.i18n_CF_GridSearch.gridOperatorLabels.contains,
        i18n.i18n_CF_GridSearch.gridOperatorLabels.notContains
    ],
    [fieldTypes.alpha]: [
        i18n.i18n_CF_GridSearch.gridOperatorLabels.startsWith,
        i18n.i18n_CF_GridSearch.gridOperatorLabels.endsWith,
        i18n.i18n_CF_GridSearch.gridOperatorLabels.equals,
        i18n.i18n_CF_GridSearch.gridOperatorLabels.notEquals,
        i18n.i18n_CF_GridSearch.gridOperatorLabels.contains,
        i18n.i18n_CF_GridSearch.gridOperatorLabels.notContains,
        i18n.i18n_CF_GridSearch.gridOperatorLabels.empty,
        i18n.i18n_CF_GridSearch.gridOperatorLabels.notEmpty
    ],
    [fieldTypes.alphaNumeric]: [
        i18n.i18n_CF_GridSearch.gridOperatorLabels.startsWith,
        i18n.i18n_CF_GridSearch.gridOperatorLabels.endsWith,
        i18n.i18n_CF_GridSearch.gridOperatorLabels.equals,
        i18n.i18n_CF_GridSearch.gridOperatorLabels.notEquals,
        i18n.i18n_CF_GridSearch.gridOperatorLabels.contains,
        i18n.i18n_CF_GridSearch.gridOperatorLabels.notContains,
        i18n.i18n_CF_GridSearch.gridOperatorLabels.empty,
        i18n.i18n_CF_GridSearch.gridOperatorLabels.notEmpty
    ],
    [fieldTypes.numeric]: [
        i18n.i18n_CF_GridSearch.gridOperatorLabels.equals,
        i18n.i18n_CF_GridSearch.gridOperatorLabels.notEquals,
        i18n.i18n_CF_GridSearch.gridOperatorLabels.gt,
        i18n.i18n_CF_GridSearch.gridOperatorLabels.gteq,
        i18n.i18n_CF_GridSearch.gridOperatorLabels.lt,
        i18n.i18n_CF_GridSearch.gridOperatorLabels.lteq,
        i18n.i18n_CF_GridSearch.gridOperatorLabels.empty,
        i18n.i18n_CF_GridSearch.gridOperatorLabels.notEmpty
    ],
    [fieldTypes.money]: [
        i18n.i18n_CF_GridSearch.gridOperatorLabels.equals,
        i18n.i18n_CF_GridSearch.gridOperatorLabels.notEquals,
        i18n.i18n_CF_GridSearch.gridOperatorLabels.gt,
        i18n.i18n_CF_GridSearch.gridOperatorLabels.gteq,
        i18n.i18n_CF_GridSearch.gridOperatorLabels.lt,
        i18n.i18n_CF_GridSearch.gridOperatorLabels.lteq,
        i18n.i18n_CF_GridSearch.gridOperatorLabels.empty,
        i18n.i18n_CF_GridSearch.gridOperatorLabels.notEmpty
    ],
    [fieldTypes.date]: [
        i18n.i18n_CF_GridSearch.gridOperatorLabels.equals,
        i18n.i18n_CF_GridSearch.gridOperatorLabels.notEquals,
        i18n.i18n_CF_GridSearch.gridOperatorLabels.gt,
        i18n.i18n_CF_GridSearch.gridOperatorLabels.gteq,
        i18n.i18n_CF_GridSearch.gridOperatorLabels.lt,
        i18n.i18n_CF_GridSearch.gridOperatorLabels.lteq,
        i18n.i18n_CF_GridSearch.gridOperatorLabels.empty,
        i18n.i18n_CF_GridSearch.gridOperatorLabels.notEmpty
    ],
    [fieldTypes.datetime]: [
        i18n.i18n_CF_GridSearch.gridOperatorLabels.equals,
        i18n.i18n_CF_GridSearch.gridOperatorLabels.notEquals,
        i18n.i18n_CF_GridSearch.gridOperatorLabels.gt,
        i18n.i18n_CF_GridSearch.gridOperatorLabels.gteq,
        i18n.i18n_CF_GridSearch.gridOperatorLabels.lt,
        i18n.i18n_CF_GridSearch.gridOperatorLabels.lteq,
        i18n.i18n_CF_GridSearch.gridOperatorLabels.empty,
        i18n.i18n_CF_GridSearch.gridOperatorLabels.notEmpty
    ],
    [fieldTypes.time]: [
        i18n.i18n_CF_GridSearch.gridOperatorLabels.equals,
        i18n.i18n_CF_GridSearch.gridOperatorLabels.notEquals,
        i18n.i18n_CF_GridSearch.gridOperatorLabels.gt,
        i18n.i18n_CF_GridSearch.gridOperatorLabels.gteq,
        i18n.i18n_CF_GridSearch.gridOperatorLabels.lt,
        i18n.i18n_CF_GridSearch.gridOperatorLabels.lteq,
        i18n.i18n_CF_GridSearch.gridOperatorLabels.empty,
        i18n.i18n_CF_GridSearch.gridOperatorLabels.notEmpty
    ],
    [fieldTypes.list]: [
        i18n.i18n_CF_GridSearch.gridOperatorLabels.equals,
        i18n.i18n_CF_GridSearch.gridOperatorLabels.notEquals,
        i18n.i18n_CF_GridSearch.gridOperatorLabels.gt,
        i18n.i18n_CF_GridSearch.gridOperatorLabels.gteq,
        i18n.i18n_CF_GridSearch.gridOperatorLabels.lt,
        i18n.i18n_CF_GridSearch.gridOperatorLabels.lteq,
        i18n.i18n_CF_GridSearch.gridOperatorLabels.empty,
        i18n.i18n_CF_GridSearch.gridOperatorLabels.notEmpty
    ],
    [fieldTypes.html]: [
        i18n.i18n_CF_GridSearch.gridOperatorLabels.equals,
        i18n.i18n_CF_GridSearch.gridOperatorLabels.notEquals,
        i18n.i18n_CF_GridSearch.gridOperatorLabels.gt,
        i18n.i18n_CF_GridSearch.gridOperatorLabels.gteq,
        i18n.i18n_CF_GridSearch.gridOperatorLabels.lt,
        i18n.i18n_CF_GridSearch.gridOperatorLabels.lteq,
        i18n.i18n_CF_GridSearch.gridOperatorLabels.empty,
        i18n.i18n_CF_GridSearch.gridOperatorLabels.notEmpty
    ],
    [fieldTypes.formula]: [
        i18n.i18n_CF_GridSearch.gridOperatorLabels.equals,
        i18n.i18n_CF_GridSearch.gridOperatorLabels.notEquals,
        i18n.i18n_CF_GridSearch.gridOperatorLabels.gt,
        i18n.i18n_CF_GridSearch.gridOperatorLabels.gteq,
        i18n.i18n_CF_GridSearch.gridOperatorLabels.lt,
        i18n.i18n_CF_GridSearch.gridOperatorLabels.lteq,
        i18n.i18n_CF_GridSearch.gridOperatorLabels.empty,
        i18n.i18n_CF_GridSearch.gridOperatorLabels.notEmpty
    ],
    [fieldTypes.phone]: [
        i18n.i18n_CF_GridSearch.gridOperatorLabels.equals,
        i18n.i18n_CF_GridSearch.gridOperatorLabels.notEquals,
        i18n.i18n_CF_GridSearch.gridOperatorLabels.gt,
        i18n.i18n_CF_GridSearch.gridOperatorLabels.gteq,
        i18n.i18n_CF_GridSearch.gridOperatorLabels.lt,
        i18n.i18n_CF_GridSearch.gridOperatorLabels.lteq,
        i18n.i18n_CF_GridSearch.gridOperatorLabels.empty,
        i18n.i18n_CF_GridSearch.gridOperatorLabels.notEmpty
    ],
    [fieldTypes.image]: [
        i18n.i18n_CF_GridSearch.gridOperatorLabels.equals,
        i18n.i18n_CF_GridSearch.gridOperatorLabels.notEquals,
        i18n.i18n_CF_GridSearch.gridOperatorLabels.gt,
        i18n.i18n_CF_GridSearch.gridOperatorLabels.gteq,
        i18n.i18n_CF_GridSearch.gridOperatorLabels.lt,
        i18n.i18n_CF_GridSearch.gridOperatorLabels.lteq,
        i18n.i18n_CF_GridSearch.gridOperatorLabels.empty,
        i18n.i18n_CF_GridSearch.gridOperatorLabels.notEmpty
    ],
    [fieldTypes.url]: [
        i18n.i18n_CF_GridSearch.gridOperatorLabels.equals,
        i18n.i18n_CF_GridSearch.gridOperatorLabels.notEquals,
        i18n.i18n_CF_GridSearch.gridOperatorLabels.gt,
        i18n.i18n_CF_GridSearch.gridOperatorLabels.gteq,
        i18n.i18n_CF_GridSearch.gridOperatorLabels.lt,
        i18n.i18n_CF_GridSearch.gridOperatorLabels.lteq,
        i18n.i18n_CF_GridSearch.gridOperatorLabels.empty,
        i18n.i18n_CF_GridSearch.gridOperatorLabels.notEmpty
    ],
    [fieldTypes.color]: [
        i18n.i18n_CF_GridSearch.gridOperatorLabels.equals,
        i18n.i18n_CF_GridSearch.gridOperatorLabels.notEquals,
        i18n.i18n_CF_GridSearch.gridOperatorLabels.gt,
        i18n.i18n_CF_GridSearch.gridOperatorLabels.gteq,
        i18n.i18n_CF_GridSearch.gridOperatorLabels.lt,
        i18n.i18n_CF_GridSearch.gridOperatorLabels.lteq,
        i18n.i18n_CF_GridSearch.gridOperatorLabels.empty,
        i18n.i18n_CF_GridSearch.gridOperatorLabels.notEmpty
    ],
    [fieldTypes.hidden]: [
        i18n.i18n_CF_GridSearch.gridOperatorLabels.equals,
        i18n.i18n_CF_GridSearch.gridOperatorLabels.notEquals,
        i18n.i18n_CF_GridSearch.gridOperatorLabels.gt,
        i18n.i18n_CF_GridSearch.gridOperatorLabels.gteq,
        i18n.i18n_CF_GridSearch.gridOperatorLabels.lt,
        i18n.i18n_CF_GridSearch.gridOperatorLabels.lteq,
        i18n.i18n_CF_GridSearch.gridOperatorLabels.empty,
        i18n.i18n_CF_GridSearch.gridOperatorLabels.notEmpty
    ],
    [fieldTypes.json]: [
        i18n.i18n_CF_GridSearch.gridOperatorLabels.equals,
        i18n.i18n_CF_GridSearch.gridOperatorLabels.notEquals,
        i18n.i18n_CF_GridSearch.gridOperatorLabels.gt,
        i18n.i18n_CF_GridSearch.gridOperatorLabels.gteq,
        i18n.i18n_CF_GridSearch.gridOperatorLabels.lt,
        i18n.i18n_CF_GridSearch.gridOperatorLabels.lteq,
        i18n.i18n_CF_GridSearch.gridOperatorLabels.empty,
        i18n.i18n_CF_GridSearch.gridOperatorLabels.notEmpty
    ],
    [fieldTypes.doc]: [
        i18n.i18n_CF_GridSearch.gridOperatorLabels.equals,
        i18n.i18n_CF_GridSearch.gridOperatorLabels.notEquals,
        i18n.i18n_CF_GridSearch.gridOperatorLabels.gt,
        i18n.i18n_CF_GridSearch.gridOperatorLabels.gteq,
        i18n.i18n_CF_GridSearch.gridOperatorLabels.lt,
        i18n.i18n_CF_GridSearch.gridOperatorLabels.lteq,
        i18n.i18n_CF_GridSearch.gridOperatorLabels.empty,
        i18n.i18n_CF_GridSearch.gridOperatorLabels.notEmpty
    ],
    [fieldTypes.checkbox]: [
        i18n.i18n_CF_GridSearch.gridOperatorLabels.equals,
        i18n.i18n_CF_GridSearch.gridOperatorLabels.notEquals,
        i18n.i18n_CF_GridSearch.gridOperatorLabels.gt,
        i18n.i18n_CF_GridSearch.gridOperatorLabels.gteq,
        i18n.i18n_CF_GridSearch.gridOperatorLabels.lt,
        i18n.i18n_CF_GridSearch.gridOperatorLabels.lteq,
        i18n.i18n_CF_GridSearch.gridOperatorLabels.empty,
        i18n.i18n_CF_GridSearch.gridOperatorLabels.notEmpty
    ],
    [fieldTypes.autocomplete]: [
        i18n.i18n_CF_GridSearch.gridOperatorLabels.startsWith,
        i18n.i18n_CF_GridSearch.gridOperatorLabels.endsWith,
        i18n.i18n_CF_GridSearch.gridOperatorLabels.equals,
        i18n.i18n_CF_GridSearch.gridOperatorLabels.notEquals,
        i18n.i18n_CF_GridSearch.gridOperatorLabels.contains,
        i18n.i18n_CF_GridSearch.gridOperatorLabels.notContains,
        i18n.i18n_CF_GridSearch.gridOperatorLabels.empty,
        i18n.i18n_CF_GridSearch.gridOperatorLabels.notEmpty
    ]
}