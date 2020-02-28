//Created By Shubham on 31-01-20

import React from 'react'

export default class FilterGenerator extends React.Component {

    createFilter = (field, operator, value, filters, logic) => {
        return {
            Field: field || undefined,
            Operator: operator || null,
            Value: value || null,
            Filters: filters || null,
            Logic: logic || null,
            Type: null
        }
    }

    createGroup = (logic, ...args) => {
        let filterArray = [];
        const Logic = logic;
        if (typeof Logic === 'string') {
            args.forEach((arg, index) => {
                if (typeof arg === 'object') {
                    filterArray.push(arg);
                }
            });
            return this.createFilter(null, null, null, filterArray, Logic);
        }
        else {
            return;
        }
    }

    setFilter = (filter, autocompleteName) => {
        if (typeof filter === 'object' && typeof autocompleteName === 'string') {
            filter.Type = autocompleteName;
            return filter;
        }
    }

    setParam = (params) => {
        let paramList = [];
        if (typeof params === 'object') {
            const keys = Object.keys(params);
            keys.forEach((key, index) => {
                paramList.push({
                    Key: key,
                    Value: params[key]
                });
            })
        }
        return paramList;
    }
}