import config from '../config';

let data;

const data_en = {

    /************* Menu Items **************/
    Masters: 'Masters',
    Sample_1: 'Sample 1',
    Sample_2: 'Sample 2',
    Sample_3: 'Sample 3',
    Sample_4: 'Sample 4',
    User: 'User',
    'User Group': 'User Group',
    Country: 'Country',
    Currency: 'Currency',
    City: 'City',
    Airport: 'Airport',
    GDPR: 'GDPR',


    /********** Title and Headers **********/
    contact: 'Address Book',
    contact_name: 'contact',
    sample1: 'Sample 1',
    sample2: 'Sample 2',
    sample2_name: 'employee',
    user_name: 'Users',
    users: 'Users',

    /************ Panel Headers ************/

    //Contact
    Identity: 'Identity',
    'Contact Info': 'Contact Info',
    Address: 'Address',
    'Misc.': 'Misc.',

    //Sample 2
    Sample2_Panel_1: 'Sample 2 Panel Title',

    // Users
    'User Information': 'User Information',
    'Group Information': 'Group Information',


    /************ Field Labels ************/

    //Contact
    lastname: 'Last Name',
    firstname: 'First Name',
    jobtitle: 'Title',
    company: 'Company',
    email: 'Email',
    web: 'Website',
    category: 'Category',
    phone: 'Work Phone',
    phonehome: 'Home Phone',
    phonecell: 'Cell.',
    fax: 'Fax',
    address: 'Address',
    city: 'City',
    state: 'State',
    zip: 'Zip Code',
    country: 'County',
    notes: 'Notes',

    //Sample 2
    EmployeeID: 'Employee ID',
    EmployeeName: 'Employee Name',
    Designation: 'Designation',
    Gender: 'Gender',
    MultiControl: 'Multi Control',
    name1: 'name1',
    name2: 'name2',
    z1: 'AWB Number',
    z3: '',
    z2: '',

    //Sample 1
    alphanumeric: 'Alphanumeric',
    decimal1: 'Decimal',
    datetime1: 'Datetime',
    url: 'URL',
    checkBoxList: 'Checkbox',


    //Users
    //Users
    UserType: "User Type",
    EmployeeSNo: "Employee Name",
    AirlineSNo: "Airline",
    CitySNo: "City Name",
    OfficeSNo: 'Office Name',
    agent: 'Agent',
    AirportSNo: 'Airport Name',
    GroupSNo: 'Group Name',
    FirstName: 'First Name',
    LastName: 'Last Name',
    TerminalSNo: 'Terminal',
    UserName: 'User ID',
    EMailID: 'E-Mail',
    GroupEMailID: 'Group E-Mail',
    DesignationSNo: 'Designation',
    Mobile: 'Mobile',
    Address: 'Address',
    IsSpecialInvoice: 'Special Invoice',
    otherAirportAccess: 'Other Airport Access',
    OtherAirlineAccess: 'Other Airline Access',
    OtherAirlineAccess: 'Other Airline Access',
    otherProductAccess: 'Other Product Access',
    UserExpiryDate: 'User Expiry Date',
    IsActive: 'Active',
    OverrideAsAgreedonAWBPrint: 'Override As Agreed on AWBPrint',
    ViewRatewhileBooking: 'View Rate while Booking',
    EnableRateTabInReservation: 'Enable Rate Tab In Reservation',
    ShowBalanceCreditLimit: 'Show Balance Credit Limit',

    //User Group
    GroupName: 'Group Name',
    IsMultipleCity: 'Allow Multiple City',
    SimilarGroup: 'Similar Group',
    IsActive: 'Active',
    UserType: 'User Type',
    PenaltyType: 'Penalty Type',

    //Permission
    Name: "Name",
    Type: "Type",
    Group: "Group"
};

switch (config.locale) {
    case "en":
        data = data_en;
        break;
    default:
        data = data_en;
        break;
}

export const i18nApp = data;

/****************************************************************
Documentation:-

*_name = used for the title of page on new page

****************************************************************/