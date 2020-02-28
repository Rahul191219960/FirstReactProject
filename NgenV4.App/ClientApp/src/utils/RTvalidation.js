import _ from 'underscore'
import { fieldTypes, fieldIsNumber, fieldIsNumeric, fieldIsDecimal, fieldIsAlphanumeric, fieldIsAlpha, fieldIsMoney, fieldIsEmail, fieldIsUrl, fieldIsPhone } from './dico'
import { i18n } from '../i18n/i18n'
import { AsYouType, parsePhoneNumberFromString } from 'libphonenumber-js'
import { cc as countryCode } from './countryCodes'
// import { de } from 'date-fns/locale';

function validateField(f, v, vbp) {
    // var isNumberField = fieldIsNumber(f);
    // var ft = fieldTypes

    function formatMsg(fLabel, msg, r2, r3) {
        return msg.replace('{0}', fLabel)
            .replace('{1}', r2)
            .replace('{2}', r3);
    }
    function fieldLabel(f) {
        return f.label || f.labelShort;
    }

    if (!f.readOnly) {
        // Added By shubham
        if (!_.isUndefined(v)) {
            // Check regexp
            var rg = new RegExp('[]');
            var preDefrg = new RegExp();
            if (f.regExp) {
                rg = new RegExp(f.regExp);
            }
            if (fieldIsNumeric(f)) {
                preDefrg = new RegExp(this.valRegEx.numeric);
            }
            else if (fieldIsAlphanumeric(f)) {
                preDefrg = new RegExp(this.valRegEx.alphaNumeric);
            }
            else if (fieldIsAlpha(f)) {
                preDefrg = new RegExp(this.valRegEx.alpha);
            }
            else if (fieldIsDecimal(f) || fieldIsMoney(f)) {
                preDefrg = new RegExp(/[0-9.]/);
                if (vbp.includes(".") && v === ".") {
                    return formatMsg(fieldLabel(f), f.regExpErrorMsg || i18n.i18n_validation.decimal, fieldLabel(f));
                }
            }
            if (!v.match(rg) && !v.match(preDefrg)) {
                return formatMsg(fieldLabel(f), f.regExpErrorMsg || i18n.i18n_validation.regExp, fieldLabel(f));
            }
        }
        // Check custom validation
        if (f.fnValidate) {
            var fValid = f.fnValidate(f, v);
            if (fValid !== '') {
                return formatMsg(fieldLabel(f), fValid);
            }
        }
        // Check maxLength
        if (_.isString(v)) {
            var len = v.length + vbp.length,
                badMax = f.maxLength ? len > f.maxLength : false
            if (badMax) {
                if (f.maxLength) {
                    return formatMsg(fieldLabel(f), i18n.i18n_validation.maxLength, f.maxLength);
                }
            }
        }
    }

    return '';
}
// convert to Uppercase
function convertToUppercase(data) {
    if (_.isString(data)) {
        return data.toUpperCase()
    }
}
// Added By Shubham on 17-01-2020
//format phoneno. on the basis of country code
function addDashes(v) {
    if (v.CC !== undefined) {
        const code = countryCode[v.CC];
        if (v.value === '') {
            v.value = code;
        }
    }
    return new AsYouType(v.CC).input(v.value);
}

function validateOnBlur(f, v) {
    var isNumberField = fieldIsNumber(f);
    function formatMsg(fLabel, msg, r2, r3) {
        return msg.replace('{0}', fLabel)
            .replace('{1}', r2)
            .replace('{2}', r3);
    }
    function fieldLabel(f) {
        return f.label || f.labelShort;
    }
    // Added By shubham
    // Check minlength on blur 
    if (_.isString(v) && !isNumberField) {
        var len = v.length,
            badMin = f.minLength ? len < f.minLength : false
        if (badMin) {
            if (f.minLength) {
                return formatMsg(fieldLabel(f), i18n.i18n_validation.minLength, f.minLength);
            }
        }
    }
    ///////////////////////////////////////////////////// Added By shubham
    // Check regex for decimal type
    if (fieldIsDecimal(f) || fieldIsMoney(f)) {
        var preDefrg = new RegExp(f.precision ? this.valRegEx.decimal.toString().replace("max", f.precision) : this.valRegEx.defaultDecimal);
        if (!v.match(preDefrg)) {
            if (v.split(".")[1] !== undefined && v.split(".")[1].length > f.precision ? f.precision : 3) {
                return formatMsg(fieldLabel(f), f.regExpErrorMsg || i18n.i18n_validation.decimalMaxPrecision, f.precision ? f.precision : 3);
            }
            return formatMsg(fieldLabel(f), f.regExpErrorMsg || i18n.i18n_validation.decimal, fieldLabel(f));
        }
    }
    else if (fieldIsEmail(f) && !this.valRegEx.email.test(v)) {
        return formatMsg(fieldLabel(f), i18n.i18n_validation.email);
    }
    else if (fieldIsUrl(f) && !this.valRegEx.url.test(v)) {
        return formatMsg(fieldLabel(f), i18n.i18n_validation.url);
    }
    else if (fieldIsPhone(f)) {
        
        let isValid = parsePhoneNumberFromString(v) ? parsePhoneNumberFromString(v).isValid() : false;
        if (!isValid) {
            return formatMsg(fieldLabel(f), i18n.i18n_validation.phone);
        }
    }
    ///////////////////////////////////////////////////////////////////////////
    /*
        Added by Rahul
        check for min or max value
    */
    if (fieldIsNumeric(f) || fieldIsDecimal(f) || fieldIsMoney(f)) {
        let maxValueExists = f.maxValue ? f.maxValue : false
        let minValueExists = f.maxValue ? f.minValue : false
        if (maxValueExists && f.maxValue && parseFloat(v) > f.maxValue) {
            return formatMsg(fieldLabel(f), f.maxErrorMsg || i18n.i18n_validation.max, f.maxValue);
        }
        if (minValueExists && f.minValue && parseFloat(v) < f.minValue) {
            return formatMsg(fieldLabel(f), f.minErrorMsg || i18n.i18n_validation.min, f.minValue);
        }
    }
}
export default {

    valRegEx: {
        email: /^[\w.-]+@[\w.-]+\.[\w.-]+$/,
        url: /^((https|ftp|smtp|http):\/\/)(www.)[a-z0-9]+\.[a-z]+(\/[a-zA-Z0-9#]+\/?)*$/,
        numeric: /^\d*$/,
        defaultDecimal: '^\\d+((\\.)(\\d{1,3}))?$',
        decimal: '^\\d+((\\.)(\\d{1,max}))?$',
        alpha: /^[a-zA-Z ]*$/,
        alphaNumeric: /^[a-zA-Z0-9 ]*$/,
        integer: /^[-+]?\d+$/,
    },

    validateField: validateField,
    convertToUppercase: convertToUppercase,
    validateOnBlur: validateOnBlur,
    addDashes: addDashes
}