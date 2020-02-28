module.exports = {
    "id": "sample2",
    "title": "Employee",
    "name": "employee",
    "namePlural": "employees",
    "icon": "fas fa-book",
    "fields": [
        {
            "id": "EmployeeID",
            "label": "Employee ID",
            "maxLength": 5,
            "inMany": true,
            "width": 50,
            "type": "text",
            "minLength": 2,
            "toUpperCase": true
        },
        {
            "id": "EmployeeName",
            "label": "Employee Name",
            "maxLength": 5,
            "inMany": true,
            "width": 50,
            "type": "text",
            "minLength": 2,
            "toUpperCase": true
        },
        {
            "id": "Designation",
            "label": "Designation",
            "maxLength": 5,
            "inMany": true,
            "width": 50,
            "type": "text",
            "minLength": 2,
            "toUpperCase": true
        }
    ],
    "buttons": [

    ]
}