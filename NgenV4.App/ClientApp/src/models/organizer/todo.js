/*
  Evolutility UI model for To-Do List
  https://github.com/evoluteur/evolutility-ui-react
*/

module.exports = {
	"id": "todo",
	"isMyJs": true,
	"oid": 1,
	"title": "To-Do List",
	"world": "organizer",
	"name": "task",
	"namePlural": "tasks",
	"icon": "todo.gif",
	"active": true,
	"position": 20,
	"defaultViewMany": "list",
	"defaultViewOne": "browse",
	"titleField": "title",
	"fields": [
		{
			"id": "alphabetic",
			"type": "alpha",
			"label": "Alphabetic",
			"inMany": true,
			"width": 30,
			"regExp": "[]",
			"maxLength": 5,
			"minLength": 2,
			"required": true,
			"toUpperCase": true,
			"precision": 2,
			"minValue": 1,
			"maxValue": 5
		},
		{
			"id": "alphanumeric",
			"type": "alphanumeric",
			"label": "AlphaNumeric",
			"inMany": true,
			"width": 30,
			"regExp": "[]",
			"maxLength": 5,
			"minLength": 2,
			"required": true,
			"precision": 2,
			"minValue": 1,
			"maxValue": 5
		},
		{
			"id": "numeric",
			"type": "numeric",
			"label": "Numeric",
			"inMany": true,
			"width": 30,
			"regExp": "[]",
			"maxLength": 5,
			"minLength": 2,
			"required": true,
			"toUpperCase": true,
			"precision": 2,
			"minValue": 1,
			"maxValue": 5.3
		},
		{
			"id": "_decimal",
			"type": "decimal",
			"label": "Decimal",
			"inMany": true,
			"width": 30,
			"regExp": "[]",
			"maxLength": 5,
			"minLength": 2,
			"required": true,
			"toUpperCase": true,
			"precision": 2,
			"minValue": 1,
			"maxValue": 5
		},
		{
			"id": "price",
			"type": "money",
			"label": "Price",
			"inMany": true,
			"width": 30,
			"currencySymbol": "₹"
		},
		{
			"id": "email",
			"type": "email",
			"label": "email",
			"maxLength": 100,
			"inMany": true,
			"width": 30
		},
		{
			"id": "web",
			"type": "url",
			"label": "url",
			"maxLength": 255,
			"width": 30
		},
		{
			"id": "phone",
			"type": "phone",
			"label": "Phone",
			"maxLength": 20,
			"width": 30
		},
		{
			"id": "country",
			"type": "autocomplete",
			"label": "Country",
			"width": 50,
			"name": "country",
			"serverSide": true,
			"required": true,
			"autocompleteName": "todo_country",
			"dependents": { "city": "todo_city" }
			// "defaultOptions":[{"value":"1","label":"Option 1"},{"value":"2","label":"Option 2"}]
		},
		{
			"id": "city",
			"type": "multiselect",
			"label": "City",
			"width": 50,
			"name": "city",
			"required": true,
			"dependentOn": ["country"]
		}
	],
	"groups": [
		{
			"id": "p1",
			"type": "panel",
			"label": "Task 1",
			"width": 50,
			"fields": [
				"country",
				"city",
				"alphabetic",
				"alphanumeric",
				"numeric",
				"_decimal",
			],
			"footer": {
				"buttons": [
					{
						"id": "Task1Button",
						"onClick": "openPopUp",
						"label": "Open"
					}
				],
				// "text": "*Click on the button to open popup."
			},
			"header": "hi"
		},
		{
			"id": "p2",
			"type": "panel",
			"label": "Task 2",
			"width": 50,
			"fields": [
				"price",
				"email",
				"web",
				"phone"
			],
			"footer": {
				"buttons": [
					{
						"id": "saveTask1",
						"onClick": "openPopUp",
						"label": "Save"
					}
				],
				// "text": "Hello! My name is Shubham."
			},
			"header": "hi"
		}
	],
	"collections": [],
	"noStats": true,
	"buttons": [
		{
			"id": "open",
			"onClick": "openPopUp",
			"label": "openPopUp"
		},
		{
			"id": "hide",
			"onClick": "hidePopUp",
			"label": "hidePopUp"
		}
	],
	"popups": [
		{
			"id": "popup1",
			"title": "Pop-Up 1",
			"name": "task",
			"namePlural": "tasks",
			"icon": "todo.gif",
			"titleField": "title",
			"style": {
				"width": "70%"
			},
			"fields": [
				{
					"id": "popup_alphabetic",
					"type": "alpha",
					"label": "Alphabetic",
					"inMany": true,
					"width": 30,
					"regExp": "[]",
					"maxLength": 5,
					"minLength": 2,
					"required": true,
					"toUpperCase": true,
					"precision": 2,
					"minValue": 1,
					"maxValue": 5
				},
				{
					"id": "popup_alphanumeric",
					"type": "alphanumeric",
					"label": "AlphaNumeric",
					"inMany": true,
					"width": 30,
					"regExp": "[]",
					"maxLength": 5,
					"minLength": 2,
					"required": true,
					"toUpperCase": true,
					"precision": 2,
					"minValue": 1,
					"maxValue": 5
				},
				{
					"id": "popup_numeric",
					"type": "numeric",
					"label": "Numeric",
					"inMany": true,
					"width": 30,
					"regExp": "[]",
					"maxLength": 5,
					"minLength": 2,
					"required": true,
					"toUpperCase": true,
					"precision": 2,
					"minValue": 1,
					"maxValue": 5
				},
				{
					"id": "popup_decimal",
					"type": "decimal",
					"label": "Decimal",
					"inMany": true,
					"width": 30,
					"regExp": "[]",
					"maxLength": 5,
					"minLength": 2,
					"required": true,
					"toUpperCase": true,
					"precision": 2,
					"minValue": 1,
					"maxValue": 5
				},
				{
					"id": "popup_price",
					"type": "money",
					"label": "Price",
					"inMany": true,
					"width": 30,
					"currencySymbol": "₹"
				},
				{
					"id": "popup_email",
					"type": "email",
					"label": "email",
					"maxLength": 100,
					"inMany": true,
					"width": 30
				},
				{
					"id": "popup_web",
					"type": "url",
					"label": "url",
					"maxLength": 255,
					"width": 30
				},
				{
					"id": "popup_phone",
					"type": "phone",
					"label": "Phone",
					"maxLength": 20,
					"width": 30
				},
			],
			"groups": [
				{
					"id": "p1",
					"type": "panel",
					"label": "Task 1",
					"width": 50,
					"fields": [
						"popup_alphabetic",
						"popup_alphanumeric"
					],
					"footer": {
						"buttons": [
							{
								"id": "Task1Button",
								"onClick": "openPopUp",
								"label": "Open"
							}
						],
						// "text": "*Click on the button to open popup."
					}
				},
				{
					"id": "p2",
					"type": "panel",
					"label": "Task 2",
					"width": 50,
					"fields": [
						"popup_numeric",
						"popup_decimal"
					]
				},
				{
					"id": "p3",
					"type": "gif",
					"label": "Gif",
					"src": "https://media.giphy.com/media/3ohc0VJPdqwU0pbLoY/giphy.gif",
					"alt": "Money Gif",
					"width": 50,
					"height": 50
				},
				{
					"id": "p4",
					"type": "video",
					"label": "Video",
					"src": "https://archive.org/download/BigBuckBunny_124/Content/big_buck_bunny_720p_surround.mp4",
					"alt": "Money Gif",
					"width": 50,
					"height": 50

				},
				{
					"id": "p5",
					"type": "panel",
					"label": "Task 5",
					"width": 50,
					"fields": [
						"popup_web",
						"popup_phone"
					]
				}
			],
			"buttons": [
				{
					"id": "closePopUp",
					"label": "closePopUp"
				}
			]
		}
	]
}