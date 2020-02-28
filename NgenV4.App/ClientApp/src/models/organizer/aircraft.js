/*
  Evolutility UI model for Address book
  https://github.com/evoluteur/evolutility-ui-react
*/

module.exports = {
	"id": "aircraft",
	"isMyJs": false,
	"oid": 2,
	"title": "Address book",
	"world": "organizer",
	"name": "contact",
	"namePlural": "contacts",
	"icon": "contact.gif",
	"active": true,
	"position": 10,
	"defaultViewMany": "list",
	"defaultViewOne": "browse",
	"titleField": "fistname",
	"fields": [
		{
			"id": "airlineName",
			"type": "lov",
			"label": "Airline",
			"list": [
				{
					"id": 1,
					"text": "Garuda Airline"
				},
				{
					"id": 2,
					"text": "Air-India"
				},
				{
					"id": 3,
					"text": "Work"
				},
				{
					"id": 4,
					"text": "Meditation"
				},
				{
					"id": 5,
					"text": "Travel"
				},
				{
					"id": 6,
					"text": "Business"
				},
				{
					"id": 7,
					"text": "Sport"
				},
				{
					"id": 8,
					"text": "Restaurants"
				},
				{
					"id": 9,
					"text": "Misc."
				}
			],
			"inMany": true,
			"required": true,
			"width": 38
		},
		{
			"id": "aircraftType",
			// "onBlur": "setTo",
			"label": "Aircraft Type",
			"required": true,
			"maxLength": 10,
			"inMany": true,
			"width": 38,
			//---added properties---
			"type": "text",
			// "regExp": "[]",
			"minLength": 2,
			"toUpperCase": true
			//------------------
		},
		{
			"id": "aircraftSeries",
			"label": "Aircraft Series",
			"required": true,
			"maxLength": 50,
			"inMany": true,
			"width": 38,
			//---added properties---
			"type": "text",
			"minLength": 2,
			"toUpperCase": true
			//------------------
		},
		{
			"id": "parentAircraftType",
			"label": "Parent Aircraft Type",
			"required": true,
			"inMany": true,
			"width": 38,
			//---added properties---
			"maxLength": 50,
			"type": "text",
			// "regExp": "[]",
			"minLength": 2,
			"toUpperCase": true
			//------------------
		},
		{
			"id": "cargoClassification",
			"type": "radiobuttonlist",
			"name": "Active",
			"label": "Cargo Classification",
			"defaultValue": "0",
			"radioList": [{ "value": "0", "display": "PAX" }, { "value": "1", "display": "Combi" }, { "value": "2", "display": "Frighter" }, { "value": "3", "display": "RFS" }],
			"inMany": true,
			"width": 38
		},
		{
			"id": "bodyType",
			"type": "radiobuttonlist",
			"label": "Body Type",
			"defaultValue": "0",
			"maxLength": 50,
			"inMany": true,
			"width": 38,
			"radioList": [{ "value": "0", "display": "Narrow" }, { "value": "1", "display": "Wide" }],
		},
		{
			"id": "grossUnit",
			"type": "radiobuttonlist",
			"precision": 2,
			"label": "Gross Unit",
			"defaultValue": "0",
			"maxLength": 7,
			"inMany": true,
			"width": 38,
			"radioList": [{ "value": "0", "display": "KG" }, { "value": "1", "display": "LBS" }],
		},
		{
			"id": "payloadCrago",
			"type": "decimal",
			"precision": 3,
			"label": "Payload Cargo & PAX",
			"maxLength": 7,
			"inMany": true,
			"width": 38,

		},
		{
			"id": "maxWeight",
			"type": "decimal",
			"precision": 2,
			"label": "Max. Weight/Piece Cargo",
			"maxLength": 7,
			"inMany": true,
			"width": 38,

		},
		{
			"id": "phone",
			"type": "phone",
			"label": "Phone",
			"maxLength": 20,
			"width": 38
		},
		{
			"id": "volume",
			"type": "decimal",
			"precision": 2,
			"label": "Volume " + '(m\xB3)',
			"maxLength": 7,
			"inMany": true,
			"width": 38
		},
		{
			"id": "fuelBurn",
			"type": "decimal",
			"precision": 2,
			"label": "Fuel Burn (AG/Hr)",
			"maxLength": 7,
			"inMany": true,
			"width": 38
		},
		{
			"id": "cover",
			"type": "image",
			"label": "Upload Image",
			"width": 100
		},
		{
			"type": "checkboxlist",
			"id": "Frequency",
			"name": "Frequency",
			"label": "Frequency",
			"defaultValue": "Sun,Mon",
			"checkBoxList": [
				{ "value": "Sun", "display": "Sunday" },
				{ "value": "Mon", "display": "Monday" },
				{ "value": "Tue", "display": "Tuesday" },
				{ "value": "Wed", "display": "Wednesday" },
				{ "value": "Thu", "display": "Thursday" },
				{ "value": "Fri", "display": "Friday" },
				{ "value": "Sat", "display": "Saturday" }
			],
			"allController": {
				"value": "All",
				"display": "All",
				"checked": true
			},
			"inMany": true,
			"width": 38,
			"minChecked": 3,
			"required": true
		},
		{
			"id": "from",
			"label": "From",
			"type": "time",
			"maxLength": 7,
			"inMany": true,
			// "DaysBack": 7,
			"width": 38
		},
		{
			"id": "to",
			"label": "To",
			"type": "date",
			"maxLength": 7,
			"inMany": true,
			"DaysBack": 1,
			"DaysForward" : 2,
			"width": 38,
			"required": true
		},

	],
	"groups": [
		{
			"type": "panel",
			"label": "Aircraft Information",
			"width": 100,
			"fields": [
				"airlineName",
				"aircraftType",
				"aircraftSeries",
				"parentAircraftType",
				"cargoClassification",
				"bodyType",
				"Frequency",
				"phone",
				"from",
				"to"
			]
		},
		{
			"type": "panel",
			"label": "Aircraft Configuration Information",
			"width": 100,
			"fields": [
				"grossUnit",
				"payloadCrago",
				"maxWeight",
				"volume",
				"fuelBurn",
				"active",
				"cover"
			]
		},
	],
	"collections": [],
	"noStats": true
}