import config from '../config';

let data;

const data_en = {
    id: 'en',    // ENGLISH
    name: 'English',

    i18n_nav: { //TODO: section to be a REST call
        //t_home: 'Home',
        //t_demos: 'Apps',
        //t_designer: 'Designer',
        //t_community: 'Community',
        /*
                comics: 'Comics',
                contact: 'Contacts',
                todo: 'Tasks',
                winecellar: 'Wine cellar',
                winetasting: 'Wine tasting',
        
                object: 'Objects',
                field: 'Fields',
        
                test: 'Test',
                test_ft: 'Field Types',
        */
        skip: 'Skip navigation',
    },

    // --- toolbar & buttons for actions ---
    i18n_actions: {
        browse: 'Browse',
        edit: 'Edit',
        // login: 'Login',
        new: 'New',
        newEntity: 'New {0}', //'New Item',
        //newUpload: 'New Upload',
        //search: 'Search',
        //newSearch: 'New Search',
        //searchRes: 'Search Result',
        //selection: 'Selection',
        //selections: 'Selections',
        export1: 'Export',
        //import: 'Import',
        //massUpdate: 'Mass Update',
        delete1: 'Delete',
        //bAll: 'All',
        list: 'List',
        cards: 'Cards',
        //bJSON: 'JSON',
        filter: 'Filter',
        //bScatter:'Scatter',
        charts: 'Dashboard', //'Charts',
        //refresh: 'Refresh',
        //print: 'Print',
        save: 'Save',
        //saveAdd: 'Save and Add Another',
        ok: 'OK',
        cancel: 'Back',

        // --- navigation/pagination ---
        prev: 'Previous',
        next: 'Next',

        dropFile: 'Drop the file here, or click to select the file to upload.',
        //dropFiles: 'Drop files here, or click to select files to upload.',
        remove_image: 'Remove current image',
        remove_document: 'Remove current document',

        deleted: '{0} deleted.',
        updated: '{0} updated.',
        added: 'New {0} added.',
        downloadingCSV: 'Downloading CSV export.',
    },

    // --- status ---
    i18n_msg: {
        nodata: 'No {0} found.', // 0=entities
        nodataSearch: 'No {0} found in search for "{1}".',
        addTheFirst: 'Add the first {0}',
        loading: 'Loading data...',
        confirmLeave: 'Your work is not saved! Are you sure you want to leave?',
        range: '{0} to {1} of {2} {3}',// 0=rangeBegin, 1=rangeEnd, 2=mSize, 3=entities'
        xinz: '{0} of {1} {2}',// 0=mSize, 1=totSize, 2=entities'
        //sgn_money: '$', // indicator for money
        //sgn_email: '@', // indicator for email
        added: 'New {0} "{1}" added.',
        updated: '{0} "{1}" updated.',
        deleted: '{0} "{1}" deleted.',
        rec_deleted: 'Record successfully deleted.',
        //error: 'Error',
        noUpdate: 'No update necessary.',
        deleteConfirmation: 'Do you really want to delete the selected {0}?',
        delete: 'Delete {0}?'
    },

    // --- validation ---
    i18n_validation: {
        //incomplete: 'Some information is missing or invalid.',
        incomplete: 'Missing information.',
        invalid: 'Invalid format.',
        //invalidList: '{0} values in "{1}" are invalid.',
        //invalidList1: '1 value in "{1}" is invalid.',
        //intro: 'You are not finished yet: ',
        empty: '"{0}" must have a value.',
        email: '"{0}" must be a valid email formatted like "name@domain.com".',
        url: '"{0}" must be a valid url formatted like "https://www.domain.com."',
        integer: '"{0}" must only use numbers.',
        decimal: '"{0}" must be a valid decimal number.',
        decimalMaxPrecision: '"{0}" must be maximum {1} precision long.',
        money: '"{0}" must be a valid number.',
        phone: 'Please enter the valid {0}.',
        date: '"{0}" must be a valid date, format must be "MM/DD/YYYY" like "12/24/2017".',
        datetime: '"{0}" must be a valid date/time, format must be "MM/DD/YYYY hh:mm AM/PM" like "12/24/2017 10:30 AM".',
        time: '"{0}" must be a valid date/time, format must be "hh:mm AM/PM" like "10:30 AM".',
        json: '"{0}" must be a valid JSON expression like "{"a": 1}".',
        max: '"{0}" must be smaller or equal to {1}.',
        min: '"{0}" must be greater or equal to {1}.',
        maxLength: '"{0}" must be {1} characters long maximum.',
        minLength: '"{0}" must be at least {1} characters long.',
        minMaxLength: '"{0}" must be between {1} and {2} characters long.',
        regExp: '"{0}" is not of the expected format.',
        checkboxlist: "Please check at least {0} {1}."
        //regExp: '"{0}" must match the regular  expression pattern for "{1}".'
    },

    // --- charts ---
    i18n_charts: {
        nocharts: 'No default charts, the object doesn\'t have numeric fields.',
        total: 'Total',
        noData: 'No data',
        emptyData: 'The query returned no results.',

        pie: 'Pie',
        bars: 'Bars',
        table: 'Table',
    },

    // --- comments ---
    i18n_comments: {
        comment: 'comment',
        comments: 'comments'
    },

    i18n_stats: {
        weekUpdates: ' records added or updated this week',
        lastUpdate: 'Last update',
        firstInsert: 'First insert',
        totalComments: 'Number of comments',
        total: 'Total',
        avg: 'Average',
        min: 'Min.',
        max: 'Max.',
        noFit: 'The data doesn\'t have any numeric fields necessary for stats.',
        noData: 'No data',
        emptyData: 'The query returned no results.',
    },

    i18n_errors: {
        badId: 'No data found for id="{0}".',
        badEntity: 'Invalid parameter: entity="{0}".',
        badChart: 'Couldn\'t retrieve charts data.',
        badUpload: 'Error uploading file.',
        badData: 'Couldn\'t retrieve data for id="{0}".',
        serverError: 'Server Error Occured. Please contact administrator!'
    },

    i18n_login: {
        title: 'Login',
        user: 'User',
        password: 'Password',
        btnLogin: 'Login',
        invalid: 'Invalid username/password combination.',
    },

    i18n_spinner: {
        loading: 'Loading...',
    },

    i18n_CF_GridSearch: {
        intersect: "Groups cannot intersect with each other.",
        checkbox_min_select: "Please select atleast 2 checkbox.",
        adjacent: "Group can be created for adjacent elements only.",
        exists: "Group with same clause already exists.",
        gridLabels: {
            delete: "Delete",
            field: "Field",
            operator: "Operator",
            value: "Value"
        },
        gridButtons: {
            addClause: "Add Clause",
            runQuery: "Run Query"
        },
        gridOperatorLabels: {
            startsWith: "starts with",
            endsWith: "ends with",
            equals: "equals",
            notEquals: "not equals",
            contains: "contains",
            notContains: "does not contains",
            empty: "is empty",
            notEmpty: "is not empty",
            gt: "greater than",
            gteq: "greater than equal to",
            lt: "less than",
            lteq: "less than equal to",

        }
    }
};

switch (config.locale) {
    case "en":
        data = data_en;
        break;
    default:
        data = data_en;
        break;
}

export const i18n = data;